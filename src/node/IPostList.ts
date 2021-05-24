import { INodeList } from 'lib/node/INodeList';
import { IPost } from 'lib/node/IPost';

export interface IPostList extends INodeList<IPostList, IPost> {}
