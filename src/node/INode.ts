import { IPath } from '../filesystem';
import { IPropertyHolder } from '../property/IPropertyHolder';
import { NodeType } from './NodeType';
import { IUrl } from '../url';
import { url } from 'inspector';

export interface INode extends IPropertyHolder {
  getUrl(): IUrl;
  getPath(): IPath;
  is(node: INode): boolean;
  getNodeType(): NodeType;
  isDynamic(): boolean;
}
