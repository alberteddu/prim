import { Node } from './Node';
import { IAttachment } from './IAttachment';
import { NodeType } from './NodeType';
import { IPath } from '@prim/path';
import { PropertyObject } from '@prim/property';
import { INodeFinder } from '@prim/finder';
import { IPost } from './IPost';

export class Attachment extends Node implements IAttachment {
  constructor(path: IPath, properties: PropertyObject, private readonly nodeFinder: INodeFinder) {
    super(path, properties);
  }

  getPost(): IPost {
    return this.nodeFinder.findPostAt(this.path.removeLastSegment());
  }

  isAttachmentOf(post: IPost): boolean {
    return post.getAttachments().contains(this);
  }

  getNodeType(): NodeType.Attachment {
    return NodeType.Attachment;
  }
}
