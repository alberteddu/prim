import { NodeList } from 'lib/node/NodeList';
import { IPostList } from 'lib/node/IPostList';
import { IPost } from 'lib/node/IPost';

export class PostList extends NodeList<IPostList, IPost> implements IPostList {}
