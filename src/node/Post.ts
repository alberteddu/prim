import { IPath } from '../filesystem';
import { IPost } from './IPost';
import { Node } from './Node';
import { IAttachmentList } from './IAttachmentList';
import { IAttachment } from './IAttachment';
import { IPostList } from './IPostList';
import { NodeType } from './NodeType';
import { IProperty } from '../property';
import { PostList } from './PostList';
import { INodeFinder } from '../finder';
import { IUrl } from '../url';

export class Post extends Node implements IPost {
  constructor(
    url: IUrl,
    path: IPath,
    dynamic: boolean,
    properties: IProperty[],
    private readonly nodeFinder: INodeFinder,
  ) {
    super(url, path, dynamic, properties);
  }

  getAttachments(): IAttachmentList {
    return this.nodeFinder.findAttachmentsAt(this);
  }

  get attachments(): IAttachment[] {
    return this.getAttachments().toArray();
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

  get children(): IPost[] {
    return this.getChildren().toArray();
  }

  getSiblings(): IPostList {
    return (
      this.getParent()
        ?.getChildren()
        .except(this) ?? new PostList([])
    );
  }

  get siblings(): IPost[] {
    return this.getSiblings().toArray();
  }

  getParent(): IPost | null {
    if (this.isRoot()) {
      return null;
    }

    return this.nodeFinder.findPostAtUrl(this.getUrl().removeLastSegment());
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
