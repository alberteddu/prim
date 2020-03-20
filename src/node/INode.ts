import { IPath } from '@prim/path';
import { IPropertyHolder } from '@prim/property/IPropertyHolder';
import { NodeType } from './NodeType';

export interface INode extends IPropertyHolder {
  getPath(): IPath;
  is(node: INode): boolean;
  getNodeType(): NodeType;
}
