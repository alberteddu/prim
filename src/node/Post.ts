import { IPost } from 'lib/node/IPost';
import { IUrl } from 'lib/url/IUrl';
import { IPath } from 'lib/filesystem/IPath';
import { IProperty } from 'lib/property/IProperty';
import { IAttachmentList } from 'lib/node/IAttachmentList';
import { NodeType } from 'lib/node/NodeType';
import { PostList } from 'lib/node/PostList';
import { IAttachment } from 'lib/node/IAttachment';
import { INodeFinder } from 'lib/finder/INodeFinder';
import { IPostList } from 'lib/node/IPostList';
import { Node } from 'lib/node/Node';

export class Post extends Node implements IPost {
    constructor(
        url: IUrl,
        path: IPath,
        dynamic: boolean,
        properties: IProperty[],
        private readonly nodeFinder: INodeFinder,
    ) {
        super(url, path, dynamic, properties);
    }

    getAttachments(): IAttachmentList {
        return this.nodeFinder.findAttachmentsAt(this);
    }

    get attachments(): IAttachment[] {
        return this.getAttachments().toArray();
    }

    hasAttachment(attachment: IAttachment): boolean {
        return attachment.getPost().is(this);
    }

    isParentOf(node: IPost): boolean {
        return node.getParent()?.is(this) ?? false;
    }

    isChildOf(node: IPost): boolean {
        return this.getParent()?.is(node) ?? false;
    }

    getChildren(): IPostList {
        return this.nodeFinder.findPostsAt(this);
    }

    get children(): IPost[] {
        return this.getChildren().toArray();
    }

    getSiblings(): IPostList {
        return (
            this.getParent()
                ?.getChildren()
                .except(this) ?? new PostList([])
        );
    }

    get siblings(): IPost[] {
        return this.getSiblings().toArray();
    }

    getParent(): IPost | null {
        if (this.isRoot()) {
            return null;
        }

        return this.nodeFinder.findPostAtUrl(this.getUrl().removeLastSegment());
    }

    isRoot(): boolean {
        const rootPost = this.nodeFinder.findRootPost();

        return this.is(rootPost);
    }

    getProtectedNames(): string[] {
        return [];
    }

    getNodeType(): NodeType.Post {
        return NodeType.Post;
    }
}
