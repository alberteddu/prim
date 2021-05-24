import { IAttachment } from './IAttachment';
import { IPost } from './IPost';
import { NodeType } from './NodeType';
import { Node } from './Node';
import { IUrl } from '../url/IUrl';
import { IPath } from '../filesystem/IPath';
import { IProperty } from '../property/IProperty';
import { INodeFinder } from '../finder/INodeFinder';

export class Attachment extends Node implements IAttachment {
    /* istanbul ignore next */
    constructor(
        url: IUrl,
        path: IPath,
        dynamic: boolean,
        properties: IProperty[],
        private readonly nodeFinder: INodeFinder,
    ) {
        super(url, path, dynamic, properties);
    }

    getPost(): IPost {
        return this.nodeFinder.findPostAtUrl(this.getUrl().removeLastSegment()) as IPost;
    }

    isAttachmentOf(post: IPost): boolean {
        return post.getAttachments().contains(this);
    }

    getProtectedNames(): string[] {
        return ['filename', 'basename', 'contents', 'extension', 'type'];
    }

    getNodeType(): NodeType.Attachment {
        return NodeType.Attachment;
    }
}
