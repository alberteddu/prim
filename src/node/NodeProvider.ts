import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { INodeProvider } from './INodeProvider';
import { IPath, IPathValidator } from '../filesystem';
import { INodeFinder } from '../finder';
import { Post } from './Post';
import { Attachment } from './Attachment';
import { IPost } from './IPost';
import { IAttachment } from './IAttachment';

@injectable()
export class NodeProvider implements INodeProvider {
  constructor(@inject(TYPES.PathValidator) private readonly pathValidator: IPathValidator) {}

  providePost(location: IPath, nodeFinder: INodeFinder): IPost {
    this.pathValidator.validateDirectory(location);

    // todo here it would be a good place to call plugins for params
    return new Post(location, [], nodeFinder);
  }

  provideAttachment(location: IPath, nodeFinder: INodeFinder): IAttachment {
    this.pathValidator.validateFile(location);

    // todo here it would be a good place to call plugins for params
    return new Attachment(location, [], nodeFinder);
  }
}