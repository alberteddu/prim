import { readFileSync } from 'fs';
import { basename, extname } from 'path';
import { inject, injectable } from 'inversify';
import { lookup } from 'mime-types';
import { INodeProvider } from 'lib/node/INodeProvider';
import { TYPES } from 'lib/types';
import { IPost } from 'lib/node/IPost';
import { IUrl } from 'lib/url/IUrl';
import { IPath } from 'lib/filesystem/IPath';
import { Post } from 'lib/node/Post';
import { IPathValidator } from 'lib/filesystem/IPathValidator';
import { Attachment } from 'lib/node/Attachment';
import { IAttachment } from 'lib/node/IAttachment';
import { INodeFinder } from 'lib/finder/INodeFinder';
import { Property } from 'lib/property/Property';

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
