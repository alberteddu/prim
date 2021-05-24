import { IPost } from '../node/IPost';
import { IUrl } from '../url/IUrl';
import { IAttachmentList } from '../node/IAttachmentList';
import { IAttachment } from '../node/IAttachment';
import { IPostList } from '../node/IPostList';

export interface INodeFinder {
    findRootPost(): IPost;

    findPostsAt(post: IPost): IPostList;

    findAttachmentsAt(post: IPost): IAttachmentList;

    findNodeAtUrl(url: IUrl): IPost | IAttachment | null;

    findPostAtUrl(url: IUrl): IPost | null;

    findAttachmentAtUrl(url: IUrl): IAttachment | null;
}
