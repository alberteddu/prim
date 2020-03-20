import { NodeList } from './NodeList';
import { IPostList } from './IPostList';
import { IPost } from './IPost';

export class PostList extends NodeList<IPostList, IPost> implements IPostList {}
