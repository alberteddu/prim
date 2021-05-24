import { PropertyHolder } from 'lib/property/PropertyHolder';
import { INode } from 'lib/node/INode';
import { IPost } from 'lib/node/IPost';
import { IUrl } from 'lib/url/IUrl';
import { IPath } from 'lib/filesystem/IPath';
import { IProperty } from 'lib/property/IProperty';
import { NodeType } from 'lib/node/NodeType';
import { IAttachment } from 'lib/node/IAttachment';

export abstract class Node extends PropertyHolder implements INode {
    /* istanbul ignore next */
    constructor(
        protected readonly _url: IUrl,
        protected readonly _path: IPath,
        private readonly _dynamic: boolean,
        properties: IProperty[] = [],
    ) {
        super(properties);
    }

    getUrl(): IUrl {
        return this._url;
    }

    get url(): string {
        return this._url.toString();
    }

    getPath(): IPath {
        return this._path;
    }

    get path(): string {
        return this._path.toString();
    }

    is(node: INode): boolean {
        return this.getPath().getPath() === node.getPath().getPath();
    }

    isDynamic(): boolean {
        return this._dynamic;
    }

    abstract getNodeType(): NodeType;

    static isPost(node: INode): node is IPost {
        return node.getNodeType() === NodeType.Post;
    }

    static isAttachment(node: INode): node is IAttachment {
        return node.getNodeType() === NodeType.Attachment;
    }
}
