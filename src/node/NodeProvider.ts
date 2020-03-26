import { extname, basename } from 'path';
import { readFileSync } from 'fs';
import { injectable, inject } from 'inversify';
import { lookup } from 'mime-types';
import { TYPES } from '../types';
import { INodeProvider } from './INodeProvider';
import { IPath, IPathValidator } from '../filesystem';
import { INodeFinder } from '../finder';
import { Post } from './Post';
import { Attachment } from './Attachment';
import { IPost } from './IPost';
import { IAttachment } from './IAttachment';
import { IUrl } from '../url';
import { Property, IProperty } from '../property';

@injectable()
export class NodeProvider implements INodeProvider {
  constructor(@inject(TYPES.PathValidator) private readonly pathValidator: IPathValidator) {}

  // todo: here and in provideAttachment, location can be derived from url
  providePost(url: IUrl, location: IPath, dynamic: boolean, nodeFinder: INodeFinder): IPost {
    if (!dynamic) {
      this.pathValidator.validateDirectory(location);
    }

    // todo here it would be a good place to call plugins for params
    return new Post(url, location, dynamic, [], nodeFinder);
  }

  provideAttachment(
    url: IUrl,
    location: IPath,
    dynamic: boolean,
    nodeFinder: INodeFinder,
  ): IAttachment {
    if (!dynamic) {
      this.pathValidator.validateFile(location);
    }

    const path = location.getPath();

    const extension = extname(path).slice(1);
    const mimeType = lookup(path) || 'text/plain';
    const filename = basename(path, `.${extension}`);
    const nodeBasename = basename(path);

    // todo here it would be a good place to call plugins for params
    return new Attachment(
      url,
      location,
      dynamic,
      [
        new Property('filename', filename),
        new Property('basename', nodeBasename),
        new Property('extension', extension),
        new Property('type', mimeType),
        ...(dynamic ? [] : [new Property('contents', readFileSync(path))]),
      ],
      nodeFinder,
    );
  }
}
