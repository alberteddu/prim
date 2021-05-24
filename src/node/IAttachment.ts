import { INode } from 'lib/node/INode';
import { IPost } from 'lib/node/IPost';

export interface IAttachment extends INode {
    getPost(): IPost;

    isAttachmentOf(post: IPost): boolean;
}
