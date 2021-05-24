import { INode } from 'lib/node/INode';
import { IPropertyMatch } from 'lib/property/match/IPropertyMatch';

export interface INodeList<L, T extends INode = INode> {
    count(): number;

    toArray(): T[];

    find(callback: (node: T) => boolean): T | undefined;

    filter(callback: (node: T) => boolean): L;

    map(callback: (node: T) => void): any;

    except(node: T): L;

    where(expression: string): L;

    whereProperty(propertyMatch: IPropertyMatch): L;

    first(): T | null;

    contains(node: T): boolean;
}
