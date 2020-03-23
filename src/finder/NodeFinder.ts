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
} from '../node';
import { PostList } from '../node/PostList';
import { IUrl } from '../url/IUrl';

@injectable()
export class NodeFinder implements INodeFinder {
  constructor(
    @inject(TYPES.RootDirectory) private readonly rootDirectory: IPath,
    @inject(TYPES.PathValidator) private readonly pathValidator: IPathValidator,
    @inject(TYPES.NodeProvider) private readonly nodeProvider: INodeProvider,
  ) {}

  findRootPost(): IPost {
    return this.findPostAt(this.rootDirectory);
  }

  findPostsAt(post: IPost): IPostList {
    const directories = this.findFilesAndDirectoriesAt(post.getPath()).filter(
      this.pathValidator.isDirectory.bind(this.pathValidator),
    );

    return new PostList(directories.map(this.findPostAt.bind(this)));
  }

  findPostAt(path: IPath): IPost {
    this.pathValidator.validateDirectory(path);

    return this.nodeProvider.providePost(path, this);
  }

  findAttachmentsAt(post: IPost): IAttachmentList {
    const files = this.findFilesAndDirectoriesAt(post.getPath()).filter(
      this.pathValidator.isFile.bind(this.pathValidator),
    );

    return new AttachmentList(files.map(this.findAttachmentAt.bind(this)));
  }

  findAttachmentAt(path: IPath): IAttachment {
    this.pathValidator.validateFile(path);

    return this.nodeProvider.provideAttachment(path, this);
  }

  findNodeAt(url: IUrl): IPost | IAttachment | null {
    const urlPath = url.getPath(this.rootDirectory);

    try {
      this.pathValidator.validatePath(urlPath);

      if (this.pathValidator.isDirectory(urlPath)) {
        return this.findPostAt(urlPath);
      }

      return this.findAttachmentAt(urlPath);
    } catch {
      return null;
    }

    return null;
  }

  private findFilesAndDirectoriesAt(path: IPath): IPath[] {
    return readdirSync(path.getPath())
      .filter(pathString => {
        // Another place to use plugins in
        return pathString.slice(0, 1) !== '.';
      })
      .map(pathString => this.rootDirectory.join(new Path(pathString)));
  }
}
