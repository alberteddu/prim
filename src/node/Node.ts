import { PropertyHolder, IProperty } from '../property';
import { INode } from './INode';
import { IPath } from '../filesystem';
import { NodeType } from './NodeType';
import { IPost } from './IPost';
import { IAttachment } from './IAttachment';
import { IUrl } from '../url';

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
