import { IPropertyMatch } from './IPropertyMatch';
import { IProperty } from '../IProperty';

export class ValueMatchesRegex implements IPropertyMatch {
  constructor(private readonly regex: string | RegExp) {}

  match(property: IProperty): boolean {
    const value = property.getValue();

    if (value === null) {
      return false;
    }

    return value.match(this.regex) !== null;
  }
}