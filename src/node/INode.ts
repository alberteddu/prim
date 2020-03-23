import { IPath } from '../filesystem';
import { IPropertyHolder } from '../property/IPropertyHolder';
import { NodeType } from './NodeType';

export interface INode extends IPropertyHolder {
  getPath(): IPath;
  is(node: INode): boolean;
  getNodeType(): NodeType;
}
