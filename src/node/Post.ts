import { IPath } from '@prim/filesystem';
import { IPost } from './IPost';
import { Node } from './Node';
import { IAttachmentList } from './IAttachmentList';
import { IAttachment } from './IAttachment';
import { IPostList } from './IPostList';
import { NodeType } from './NodeType';
import { IProperty } from '@prim/property';
import { PostList } from './PostList';
import { INodeFinder } from '@prim/finder';

export class Post extends Node implements IPost {
  constructor(path: IPath, properties: IProperty[], private readonly nodeFinder: INodeFinder) {
    super(path, properties);
  }

  getAttachments(): IAttachmentList {
    return this.nodeFinder.findAttachmentsAt(this);
  }

  hasAttachment(attachment: IAttachment): boolean {
    return attachment.getPost().is(this);
  }

  isParentOf(node: IPost): boolean {
    return node.getParent()?.is(this) ?? false;
  }

  isChildOf(node: IPost): boolean {
    return this.getParent()?.is(node) ?? false;
  }

  getChildren(): IPostList {
    return this.nodeFinder.findPostsAt(this);
  }

  getSiblings(): IPostList {
    return (
      this.getParent()
        ?.getChildren()
        .except(this) ?? new PostList([])
    );
  }

  getParent(): IPost | null {
    if (this.isRoot()) {
      return null;
    }

    return this.nodeFinder.findPostAt(this.path.removeLastSegment());
  }

  isRoot(): boolean {
    const rootPost = this.nodeFinder.findRootPost();

    return this.is(rootPost);
  }

  getProtectedNames(): string[] {
    return [];
  }

  getNodeType(): NodeType.Post {
    return NodeType.Post;
  }
}
