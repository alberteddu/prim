import { IUrl } from 'lib/url/IUrl';
import { IPost } from 'lib/node/IPost';
import { IPath } from 'lib/filesystem/IPath';
import { IProperty } from 'lib/property/IProperty';
import { NodeType } from 'lib/node/NodeType';
import { IAttachment } from 'lib/node/IAttachment';
import { INodeFinder } from 'lib/finder/INodeFinder';
import { Node } from 'lib/node/Node';

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
