import { INodeList } from './INodeList';
import { IPost } from './IPost';

export interface IPostList extends INodeList<IPostList, IPost> {}
