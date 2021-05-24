import { INode } from './INode';
import { IAttachmentList } from './IAttachmentList';
import { IAttachment } from './IAttachment';
import { IPostList } from './IPostList';

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
