import { IPropertyMatch } from './IPropertyMatch';
import { IProperty } from '../IProperty';

export class PropertyPassesTest implements IPropertyMatch {
  constructor(private readonly callback: (property: IProperty) => boolean) {}

  match(property: IProperty): boolean {
    return this.callback(property);
  }
}
