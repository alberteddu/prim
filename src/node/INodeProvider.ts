import { IPath } from 'lib/filesystem/IPath';
import { IPost } from 'lib/node/IPost';
import { IUrl } from 'lib/url/IUrl';
import { IAttachment } from 'lib/node/IAttachment';
import { INodeFinder } from 'lib/finder/INodeFinder';

export interface INodeProvider {
    providePost(url: IUrl, location: IPath, dynamic: boolean, nodeFinder: INodeFinder): IPost;

    provideAttachment(url: IUrl, location: IPath, dynamic: boolean, nodeFinder: INodeFinder): IAttachment;
}
