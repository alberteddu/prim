import { IPath } from '../filesystem';
import { IPost } from './IPost';
import { IAttachment } from './IAttachment';
import { INodeFinder } from '../finder';
import { IUrl } from '../url';

export interface INodeProvider {
  providePost(url: IUrl, location: IPath, dynamic: boolean, nodeFinder: INodeFinder): IPost;
  provideAttachment(
    url: IUrl,
    location: IPath,
    dynamic: boolean,
    nodeFinder: INodeFinder,
  ): IAttachment;
}
