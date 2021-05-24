import { readdirSync } from 'fs';
import { inject, injectable } from 'inversify';
import { INodeFinder } from 'lib/finder/INodeFinder';
import { ResolutionState } from 'lib/finder/resolution/ResolutionState';
import { IPluginHolder } from 'lib/extend/IPluginHolder';
import { IDynamicNodePlugin, isDynamicNodePlugin } from 'lib/extend/scope/IDynamicNodePlugin';
import { INode } from 'lib/node/INode';
import { IUrl } from 'lib/url/IUrl';
import { IAttachmentEnhancement } from 'lib/extend/scope/IAttachmentEnhancement';
import { IAttachmentList } from 'lib/node/IAttachmentList';
import { AttachmentEnhancement } from 'lib/extend/scope/AttachmentEnhancement';
import { PostList } from 'lib/node/PostList';
import { IAttachment } from 'lib/node/IAttachment';
import { Segment } from 'lib/url/Segment';
import { TYPES } from 'lib/types';
import { IDynamicPost } from 'lib/extend/scope/IDynamicPost';
import { ISegmentVoterPlugin, isSegmentVoterPlugin } from 'lib/extend/scope/ISegmentVoterPlugin';
import { IPost } from 'lib/node/IPost';
import { IPostEnhancement } from 'lib/extend/scope/IPostEnhancement';
import { IPath } from 'lib/filesystem/IPath';
import { IAttachmentEnhancerPlugin, isAttachmentEnhancerPlugin } from 'lib/extend/scope/IAttachmentEnhancerPlugin';
import { IDynamicAttachment } from 'lib/extend/scope/IDynamicAttachment';
import { Post } from 'lib/node/Post';
import { IPathValidator } from 'lib/filesystem/IPathValidator';
import { INodeProvider } from 'lib/node/INodeProvider';
import { PostEnhancement } from 'lib/extend/scope/PostEnhancement';
import { IPostEnhancerPlugin, isPostEnhancerPlugin } from 'lib/extend/scope/IPostEnhancerPlugin';
import { ISegment } from 'lib/url/ISegment';
import { AttachmentList } from 'lib/node/AttachmentList';
import { IPostList } from 'lib/node/IPostList';
import { Resolution } from 'lib/finder/resolution/Resolution';
import { Url } from 'lib/url/Url';
import { Node } from 'lib/node/Node';
import { Path } from 'lib/filesystem/Path';

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
        const allChildren = [...realChildren, ...dynamicChildren].filter(child => {
            const enhancement = this.enhancePost(child);
            const state = enhancement.resolve().getState();

            return [ResolutionState.Found, ResolutionState.NotFoundSelf].includes(state);
        });

        return new PostList(allChildren);
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

            return this.nodeProvider.providePost(post.getUrl().appendSegment(newSegment), directory, false, this);
        });
    }

    private findDynamicPostsAt(post: IPost): IPost[] {
        const dynamicNodeProviders = this.pluginHolder.getPlugins<IDynamicNodePlugin>(isDynamicNodePlugin);
        const dynamicPosts = dynamicNodeProviders.reduce((previous: IDynamicPost[], current: IDynamicNodePlugin) => {
            return [...previous, ...current.getChildrenOfPost(post)];
        }, [] as IDynamicPost[]);

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
        const allAttachments = [...realAttachments, ...dynamicAttachments].filter(attachment => {
            const enhancement = this.enhanceAttachment(attachment);
            const state = enhancement.resolve().getState();

            return state === ResolutionState.Found;
        });

        return new AttachmentList(allAttachments);
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

            return this.nodeProvider.provideAttachment(post.getUrl().appendSegment(newSegment), file, false, this);
        });
    }

    private findDynamicAttachmentsAt(post: IPost): IAttachment[] {
        const dynamicNodeProviders = this.pluginHolder.getPlugins<IDynamicNodePlugin>(isDynamicNodePlugin);
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
            const newEnhancement = this.enhancePost(node);
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
            const newEnhancement = this.enhanceAttachment(node);
            const currentState = newEnhancement.resolve().getState();

            if (currentState !== ResolutionState.Found) {
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

    private enhancePost(post: IPost): IPostEnhancement {
        const defaultPostEnhancement = new PostEnhancement(new Resolution(ResolutionState.Found));
        const postEnhancers = this.pluginHolder.getPlugins<IPostEnhancerPlugin>(isPostEnhancerPlugin);

        return postEnhancers.reduce<IPostEnhancement>(
            (previousEnhancement, currentPlugin) => currentPlugin.enhance(post, previousEnhancement),
            defaultPostEnhancement,
        );
    }

    private enhanceAttachment(attachment: IAttachment): IAttachmentEnhancement {
        const defaultAttachmentEnhancement = new AttachmentEnhancement(new Resolution(ResolutionState.Found));
        const attachmentEnhancers = this.pluginHolder.getPlugins<IAttachmentEnhancerPlugin>(isAttachmentEnhancerPlugin);

        return attachmentEnhancers.reduce<IAttachmentEnhancement>(
            (previousEnhancement, currentPlugin) => currentPlugin.enhance(attachment, previousEnhancement),
            defaultAttachmentEnhancement,
        );
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
