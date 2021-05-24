import { IPost } from './IPost';
import { IAttachment } from './IAttachment';
import { IUrl } from '../url/IUrl';
import { IPath } from '../filesystem/IPath';
import { INodeFinder } from '../finder/INodeFinder';

export interface INodeProvider {
    providePost(url: IUrl, location: IPath, dynamic: boolean, nodeFinder: INodeFinder): IPost;

    provideAttachment(url: IUrl, location: IPath, dynamic: boolean, nodeFinder: INodeFinder): IAttachment;
}
