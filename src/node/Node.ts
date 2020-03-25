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
    protected readonly url: IUrl,
    protected readonly path: IPath,
    private readonly dynamic: boolean,
    properties: IProperty[] = [],
  ) {
    super(properties);
  }

  getUrl(): IUrl {
    return this.url;
  }

  getPath(): IPath {
    return this.path;
  }

  is(node: INode): boolean {
    return this.path.getPath() === node.getPath().getPath();
  }

  isDynamic(): boolean {
    return this.dynamic;
  }

  abstract getNodeType(): NodeType;

  static isPost(node: INode): node is IPost {
    return node.getNodeType() === NodeType.Post;
  }

  static isAttachment(node: INode): node is IAttachment {
    return node.getNodeType() === NodeType.Attachment;
  }
}
