import { Node } from './Node';
import { IAttachment } from './IAttachment';
import { NodeType } from './NodeType';
import { IPath } from '../filesystem';
import { IProperty } from '../property';
import { INodeFinder } from '../finder';
import { IPost } from './IPost';
import { IUrl } from '../url';

export class Attachment extends Node implements IAttachment {
  /* istanbul ignore next */
  constructor(
    url: IUrl,
    path: IPath,
    dynamic: boolean,
    properties: IProperty[],
    private readonly nodeFinder: INodeFinder,
  ) {
    super(url, path, dynamic, properties);
  }

  getPost(): IPost {
    return this.nodeFinder.findPostAtUrl(this.url.removeLastSegment()) as IPost;
  }

  isAttachmentOf(post: IPost): boolean {
    return post.getAttachments().contains(this);
  }

  getProtectedNames(): string[] {
    return ['filename', 'basename', 'contents', 'extension', 'type'];
  }

  getNodeType(): NodeType.Attachment {
    return NodeType.Attachment;
  }
}
