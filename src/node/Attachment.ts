import { Node } from './Node';
import { IAttachment } from './IAttachment';
import { NodeType } from './NodeType';
import { IPath } from '@prim/filesystem';
import { IProperty } from '@prim/property';
import { INodeFinder } from '@prim/finder';
import { IPost } from './IPost';

export class Attachment extends Node implements IAttachment {
  /* istanbul ignore next */
  constructor(path: IPath, properties: IProperty[], private readonly nodeFinder: INodeFinder) {
    super(path, properties);
  }

  getPost(): IPost {
    return this.nodeFinder.findPostAt(this.path.removeLastSegment());
  }

  isAttachmentOf(post: IPost): boolean {
    return post.getAttachments().contains(this);
  }

  getProtectedNames(): string[] {
    return ['extension', 'type', 'size'];
  }

  getNodeType(): NodeType.Attachment {
    return NodeType.Attachment;
  }
}
