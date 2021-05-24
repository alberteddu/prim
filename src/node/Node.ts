import { INode } from './INode';
import { IPost } from './IPost';
import { NodeType } from './NodeType';
import { IAttachment } from './IAttachment';
import { PropertyHolder } from '../property/PropertyHolder';
import { IUrl } from '../url/IUrl';
import { IPath } from '../filesystem/IPath';
import { IProperty } from '../property/IProperty';

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
