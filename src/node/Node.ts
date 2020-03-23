import { PropertyHolder, IProperty } from '../property';
import { INode } from './INode';
import { IPath } from '../filesystem';
import { NodeType } from './NodeType';

export abstract class Node extends PropertyHolder implements INode {
  /* istanbul ignore next */
  constructor(protected readonly path: IPath, properties: IProperty[] = []) {
    super(properties);
  }

  getPath(): IPath {
    return this.path;
  }

  is(node: INode): boolean {
    return this.path.getPath() === node.getPath().getPath();
  }

  abstract getNodeType(): NodeType;
}
