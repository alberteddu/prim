import { INode } from 'lib/node/INode';
import { IAttachmentList } from 'lib/node/IAttachmentList';
import { IAttachment } from 'lib/node/IAttachment';
import { IPostList } from 'lib/node/IPostList';

export interface IPost extends INode {
    getAttachments(): IAttachmentList;

    hasAttachment(attachment: IAttachment): boolean;

    isParentOf(node: IPost): boolean;

    isChildOf(node: IPost): boolean;

    getChildren(): IPostList;

    getSiblings(): IPostList;

    getParent(): IPost | null;

    isRoot(): boolean;
}
