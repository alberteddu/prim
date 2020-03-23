import { IPath } from '../filesystem';
import { IPostList, IAttachmentList, IPost, IAttachment } from '../node';
import { IUrl } from '../url/IUrl';

export interface INodeFinder {
  findRootPost(): IPost;
  findPostsAt(post: IPost): IPostList;
  findPostAt(path: IPath): IPost;
  findAttachmentsAt(post: IPost): IAttachmentList;
  findAttachmentAt(path: IPath): IAttachment;
  findNodeAt(url: IUrl): IPost | IAttachment | null;
}
