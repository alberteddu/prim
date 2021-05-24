import { readFileSync } from 'fs';
import { basename, extname } from 'path';
import { inject, injectable } from 'inversify';
import { lookup } from 'mime-types';
import { IPost } from './IPost';
import { Post } from './Post';
import { INodeProvider } from './INodeProvider';
import { Attachment } from './Attachment';
import { IAttachment } from './IAttachment';
import { IPathValidator } from '../filesystem/IPathValidator';
import { IPath } from '../filesystem/IPath';
import { IUrl } from '../url/IUrl';
import { TYPES } from '../types';
import { INodeFinder } from '../finder/INodeFinder';
import { Property } from '../property/Property';

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

    provideAttachment(url: IUrl, location: IPath, dynamic: boolean, nodeFinder: INodeFinder): IAttachment {
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
