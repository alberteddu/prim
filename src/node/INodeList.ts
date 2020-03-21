import { INode } from './INode';
import { IProperty } from '@prim/property';

export interface INodeList<L, T extends INode = INode> {
  count(): number;
  toArray(): T[];
  filter(callback: (node: T) => boolean): L;
  map(callback: (node: T) => void): any;
  except(node: T): L;
  where(property: IProperty): L;
  first(): T | null;
  contains(node: T): boolean;
}
