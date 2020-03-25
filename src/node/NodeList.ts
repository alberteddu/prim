import { INodeList } from './INodeList';
import { INode } from './INode';
import { NegateMatch } from '../property';
import { IPropertyMatch } from '../property/match/IPropertyMatch';

export abstract class NodeList<L extends INodeList<any>, T extends INode = INode>
  implements INodeList<L, T> {
  constructor(private readonly nodes: T[]) {}

  count() {
    return this.nodes.length;
  }

  toArray(): T[] {
    return this.nodes;
  }

  filter(callback: (node: T) => boolean): L {
    return new (this.constructor as { new (nodes: T[]): L })(this.nodes.filter(callback));
  }

  map(callback: (node: T) => void): any {
    return this.nodes.map(callback);
  }

  where(propertyMatch: IPropertyMatch): L {
    return this.filter(eachNode => eachNode.match(propertyMatch));
  }

  whereNot(propertyMatch: IPropertyMatch): L {
    return this.where(new NegateMatch(propertyMatch));
  }

  except(node: T): L {
    return this.filter(eachNode => !eachNode.is(node));
  }

  first(): T | null {
    if (this.count() === 0) {
      return null;
    }

    return this.nodes[0];
  }

  contains(node: T): boolean {
    return this.filter(eachNode => eachNode.is(node)).count() === 1;
  }
}
