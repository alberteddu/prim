import { IPath } from '../filesystem';
import { IPostList, IAttachmentList, IPost, IAttachment } from '../node';
import { IUrl } from '../url/IUrl';

export interface INodeFinder {
  findRootPost(): IPost;
  findPostsAt(post: IPost): IPostList;
  findAttachmentsAt(post: IPost): IAttachmentList;
  findNodeAtUrl(url: IUrl): IPost | IAttachment | null;
  findPostAtUrl(url: IUrl): IPost | null;
  findAttachmentAtUrl(url: IUrl): IAttachment | null;
}
