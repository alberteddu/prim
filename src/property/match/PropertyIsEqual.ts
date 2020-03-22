import { IPropertyMatch } from './IPropertyMatch';
import { IProperty } from '../IProperty';

export class PropertyIsEqual implements IPropertyMatch {
  constructor(private readonly property: IProperty) {}

  match(property: IProperty): boolean {
    return property.is(this.property);
  }
}
