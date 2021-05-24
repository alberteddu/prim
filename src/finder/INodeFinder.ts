import { IAttachmentList } from 'lib/node/IAttachmentList';
import { IPost } from 'lib/node/IPost';
import { IUrl } from 'lib/url/IUrl';
import { IAttachment } from 'lib/node/IAttachment';
import { IPostList } from 'lib/node/IPostList';

export interface INodeFinder {
    findRootPost(): IPost;

    findPostsAt(post: IPost): IPostList;

    findAttachmentsAt(post: IPost): IAttachmentList;

    findNodeAtUrl(url: IUrl): IPost | IAttachment | null;

    findPostAtUrl(url: IUrl): IPost | null;

    findAttachmentAtUrl(url: IUrl): IAttachment | null;
}
