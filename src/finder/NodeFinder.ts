import { injectable, inject } from 'inversify';
import { readdirSync } from 'fs';
import { TYPES } from '../types';
import { INodeFinder } from './INodeFinder';
import { IPath, IPathValidator, Path } from '../filesystem';
import {
  IPost,
  IPostList,
  IAttachmentList,
  INodeProvider,
  AttachmentList,
  IAttachment,
  NodeType,
  Node,
  Post,
  INode,
} from '../node';
import { PostList } from '../node/PostList';
import { IUrl } from '../url/IUrl';
import {
  IPluginHolder,
  isDynamicNodePlugin,
  IDynamicNodePlugin,
  IDynamicPost,
  IDynamicAttachment,
  ISegmentVoterPlugin,
  isSegmentVoterPlugin,
  IPostEnhancerPlugin,
  isPostEnhancerPlugin,
  PostEnhancement,
  IAttachmentEnhancerPlugin,
  isAttachmentEnhancerPlugin,
  AttachmentEnhancement,
  IAttachmentEnhancement,
  IPostEnhancement,
} from '../plugin';
import { Url, ISegment, Segment } from '../url';
import { Resolution, ResolutionState } from './resolution';

@injectable()
export class NodeFinder implements INodeFinder {
  constructor(
    @inject(TYPES.RootDirectory) private readonly rootDirectory: IPath,
    @inject(TYPES.PathValidator) private readonly pathValidator: IPathValidator,
    @inject(TYPES.NodeProvider) private readonly nodeProvider: INodeProvider,
    @inject(TYPES.PluginHolder) private readonly pluginHolder: IPluginHolder,
  ) {}

  findRootPost(): IPost {
    return this.findPostAtUrl(new Url('/')) as IPost;
  }

  findPostsAt(post: IPost): IPostList {
    const realChildren = this.findRealPostsAt(post);
    const dynamicChildren = this.findDynamicPostsAt(post);

    return new PostList([...realChildren, ...dynamicChildren]);
  }

  private findRealPostsAt(post: IPost): IPost[] {
    if (post.isDynamic()) {
      return [];
    }

    const directories = this.findFilesAndDirectoriesAt(post.getPath()).filter(
      this.pathValidator.isDirectory.bind(this.pathValidator),
    );

    return directories.map(directory => {
      const lastSegment = directory.getLastSegment();
      const newSegment = lastSegment === null ? new Segment('') : this.processSegment(lastSegment);

      return this.nodeProvider.providePost(
        post.getUrl().appendSegment(newSegment),
        directory,
        false,
        this,
      );
    });
  }

  private findDynamicPostsAt(post: IPost): IPost[] {
    const dynamicNodeProviders = this.pluginHolder.getPlugins<IDynamicNodePlugin>(
      isDynamicNodePlugin,
    );
    const dynamicPosts = dynamicNodeProviders.reduce(
      (previous: IDynamicPost[], current: IDynamicNodePlugin) => {
        return [...previous, ...current.getChildrenOfPost(post)];
      },
      [] as IDynamicPost[],
    );

    return dynamicPosts.map(dynamicPost =>
      this.nodeProvider.providePost(
        post.getUrl().appendSegment(this.processSegment(dynamicPost.getSegment())),
        post.getPath().appendSegment(dynamicPost.getSegment().getSegment()), // todo: change appendSegment so that it can accept ISegment
        true,
        this,
      ),
    );
  }

  findAttachmentsAt(post: IPost): IAttachmentList {
    const dynamicAttachments = this.findDynamicAttachmentsAt(post);
    const realAttachments = this.findRealAttachmentsAt(post);

    return new AttachmentList([...realAttachments, ...dynamicAttachments]);
  }

  private findRealAttachmentsAt(post: IPost): IAttachment[] {
    if (post.isDynamic()) {
      return [];
    }

    const files = this.findFilesAndDirectoriesAt(post.getPath()).filter(
      this.pathValidator.isFile.bind(this.pathValidator),
    );

    return files.map(file => {
      const lastSegment = file.getLastSegment();
      const newSegment = lastSegment === null ? new Segment('') : this.processSegment(lastSegment);

      return this.nodeProvider.provideAttachment(
        post.getUrl().appendSegment(newSegment),
        file,
        false,
        this,
      );
    });
  }

  private findDynamicAttachmentsAt(post: IPost): IAttachment[] {
    const dynamicNodeProviders = this.pluginHolder.getPlugins<IDynamicNodePlugin>(
      isDynamicNodePlugin,
    );
    const dynamicAttachments = dynamicNodeProviders.reduce(
      (previous: IDynamicAttachment[], current: IDynamicNodePlugin) => {
        return [...previous, ...current.getAttachmentsOfPost(post)];
      },
      [] as IDynamicAttachment[],
    );

    return dynamicAttachments.map(dynamicAttachment =>
      this.nodeProvider.provideAttachment(
        post.getUrl().appendSegment(this.processSegment(dynamicAttachment.getSegment())),
        post.getPath().appendSegment(dynamicAttachment.getSegment().getSegment()), // todo: change appendSegment so that it can accept ISegment
        true,
        this,
      ),
    );
  }

  private recursivelyFindNodeAtUrl(url: IUrl, isLeaf: boolean): IPost | IAttachment | null {
    let node: INode | undefined;

    if (!url.hasParent()) {
      node = this.nodeProvider.providePost(new Url('/'), this.rootDirectory, false, this);
    } else {
      const parent = this.recursivelyFindNodeAtUrl(url.removeLastSegment(), false);

      if (parent === null) {
        return null;
      }

      if (!Post.isPost(parent)) {
        return null;
      }

      const children = parent.getChildren();
      const attachments = parent.getAttachments();
      const nodes = [...children.toArray(), ...attachments.toArray()];
      node = nodes.find(node => {
        const lastSegment = node.getUrl().getLastSegment();

        if (lastSegment === null) {
          return false;
        }

        return url.getLastSegment()?.is(lastSegment) ?? false;
      });
    }

    if (typeof node === 'undefined') {
      return null;
    }

    if (Node.isPost(node)) {
      const post = node;
      const defaultPostEnhancement = new PostEnhancement(new Resolution(ResolutionState.Found));
      const postEnhancers = this.pluginHolder.getPlugins<IPostEnhancerPlugin>(isPostEnhancerPlugin);

      const newEnhancement = postEnhancers.reduce<IPostEnhancement>(
        (previousEnhancement, currentPlugin) => currentPlugin.enhance(post, previousEnhancement),
        defaultPostEnhancement,
      );

      const currentState = newEnhancement.resolve().getState();

      if (currentState === ResolutionState.NotFound) {
        return null;
      }

      if (currentState === ResolutionState.NotFoundSelf && isLeaf) {
        return null;
      }

      return node;
    }

    if (Node.isAttachment(node)) {
      const attachment = node;
      const defaultAttachmentEnhancement = new AttachmentEnhancement(
        new Resolution(ResolutionState.Found),
      );
      const attachmentEnhancers = this.pluginHolder.getPlugins<IAttachmentEnhancerPlugin>(
        isAttachmentEnhancerPlugin,
      );

      const newEnhancement = attachmentEnhancers.reduce<IAttachmentEnhancement>(
        (previousEnhancement, currentPlugin) =>
          currentPlugin.enhance(attachment, previousEnhancement),
        defaultAttachmentEnhancement,
      );

      const currentState = newEnhancement.resolve().getState();

      if (
        currentState === ResolutionState.NotFound ||
        currentState === ResolutionState.NotFoundSelf
      ) {
        return null;
      }

      return node;
    }

    return null;
  }

  findNodeAtUrl(url: IUrl): IPost | IAttachment | null {
    return this.recursivelyFindNodeAtUrl(url, true);
  }

  findPostAtUrl(url: IUrl): IPost | null {
    const node = this.findNodeAtUrl(url);

    if (node === null || !Node.isPost(node)) {
      return null;
    }

    return node;
  }

  findAttachmentAtUrl(url: IUrl): IAttachment | null {
    const node = this.findNodeAtUrl(url);

    if (node === null || !Node.isAttachment(node)) {
      return null;
    }

    return node;
  }

  private findFilesAndDirectoriesAt(path: IPath): IPath[] {
    return readdirSync(path.getPath())
      .filter(pathString => {
        return pathString.slice(0, 1) !== '.';
      })
      .map(pathString => path.join(new Path(pathString)));
  }

  private processSegment(segment: ISegment): ISegment {
    const segmentVoters = this.pluginHolder.getPlugins<ISegmentVoterPlugin>(isSegmentVoterPlugin);

    return segmentVoters.reduce((previous, current) => current.vote(previous), segment);
  }
}
