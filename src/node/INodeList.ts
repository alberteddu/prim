import { INode } from './INode';
import { IProperty } from '@prim/property';
import { IPropertyMatch } from '@prim/property/match/IPropertyMatch';

export interface INodeList<L, T extends INode = INode> {
  count(): number;
  toArray(): T[];
  filter(callback: (node: T) => boolean): L;
  map(callback: (node: T) => void): any;
  except(node: T): L;
  where(propertyMatch: IPropertyMatch): L;
  first(): T | null;
  contains(node: T): boolean;
}
