import { IPath } from '../filesystem';
import { IPost } from './IPost';
import { IAttachment } from './IAttachment';
import { INodeFinder } from '../finder';

export interface INodeProvider {
  providePost(location: IPath, nodeFinder: INodeFinder): IPost;
  provideAttachment(location: IPath, nodeFinder: INodeFinder): IAttachment;
}
