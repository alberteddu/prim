import { IPath } from '@prim/filesystem';
import { IPostList, IAttachmentList, IPost, IAttachment } from '@prim/node';

export interface INodeFinder {
  findRootPost(): IPost;
  findPostsAt(post: IPost): IPostList;
  findPostAt(path: IPath): IPost;
  findAttachmentsAt(post: IPost): IAttachmentList;
  findAttachmentAt(path: IPath): IAttachment;
  findNodeAt(path: IPath): IPost | IAttachment | null;
}
