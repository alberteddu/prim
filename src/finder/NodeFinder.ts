import { injectable, inject } from 'inversify';
import { readdirSync } from 'fs';
import { TYPES } from '@prim/types';
import { INodeFinder } from './INodeFinder';
import { IPath, IPathValidator, Path } from '@prim/filesystem';
import {
  IPost,
  IPostList,
  IAttachmentList,
  INodeProvider,
  AttachmentList,
  IAttachment,
} from '@prim/node';
import { PostList } from '@prim/node/PostList';

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
      this.pathValidator.isDirectory,
    );

    return new PostList(directories.map(this.findPostAt));
  }

  findPostAt(path: IPath): IPost {
    this.pathValidator.validateDirectory(path);

    return this.nodeProvider.providePost(path, this);
  }

  findAttachmentsAt(post: IPost): IAttachmentList {
    const files = this.findFilesAndDirectoriesAt(post.getPath()).filter(this.pathValidator.isFile);

    return new AttachmentList(files.map(this.findAttachmentAt));
  }

  findAttachmentAt(path: IPath): IAttachment {
    this.pathValidator.validateFile(path);

    return this.nodeProvider.provideAttachment(path, this);
  }

  findNodeAt(path: IPath): IPost | IAttachment | null {
    try {
      this.pathValidator.validatePath(path);

      if (this.pathValidator.isFile(path)) {
        return this.findPostAt(path);
      }

      if (this.pathValidator.isDirectory(path)) {
        return this.findAttachmentAt(path);
      }
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
      .map(pathString => new Path(pathString));
  }
}
