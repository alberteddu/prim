import { INode } from './INode';
import { IPost } from './IPost';

export interface IAttachment extends INode {
  getPost(): IPost;
  isAttachmentOf(post: IPost): boolean;
}
