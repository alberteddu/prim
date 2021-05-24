import { IPost } from './IPost';
import { IPostList } from './IPostList';
import { NodeList } from './NodeList';

export class PostList extends NodeList<IPostList, IPost> implements IPostList {}
