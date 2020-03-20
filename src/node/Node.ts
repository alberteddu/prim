import { PropertyHolder, PropertyObject } from '@prim/property';
import { INode } from './INode';
import { IPath } from '@prim/path';
import { NodeType } from './NodeType';

export abstract class Node extends PropertyHolder implements INode {
  constructor(protected readonly path: IPath, properties: PropertyObject = {}) {
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
