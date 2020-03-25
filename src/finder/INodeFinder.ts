import { IPath } from '../filesystem';
import { IPostList, IAttachmentList, IPost, IAttachment } from '../node';
import { IUrl } from '../url/IUrl';

export interface INodeFinder {
  findRootPost(): IPost;
  findPostsAt(post: IPost): IPostList;
  findPostAt(url: IUrl, path: IPath): IPost;
  findAttachmentsAt(post: IPost): IAttachmentList;
  findAttachmentAt(url: IUrl, path: IPath): IAttachment;
  findNodeAtUrl(url: IUrl): IPost | IAttachment | null;
  findPostAtUrl(url: IUrl): IPost | null;
  findAttachmentAtUrl(url: IUrl): IAttachment | null;
}
