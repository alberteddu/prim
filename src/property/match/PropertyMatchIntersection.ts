import { IPropertyMatch } from './IPropertyMatch';
import { IProperty } from '../IProperty';

export class PropertyMatchIntersection implements IPropertyMatch {
  constructor(private readonly left: IPropertyMatch, private readonly right: IPropertyMatch) {}

  match(property: IProperty): boolean {
    return this.left.match(property) && this.right.match(property);
  }
}
