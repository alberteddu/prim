import { IPropertyMatch } from './IPropertyMatch';
import { IProperty } from '../IProperty';

export class ValueMatchesRegex implements IPropertyMatch {
    constructor(private readonly name: string, private readonly regex: string | RegExp) {}

    match(property: IProperty): boolean {
        const value = property.getValue();

        if (typeof value !== 'string') {
            return false;
        }

        return property.getName() === this.name && value.match(this.regex) !== null;
    }
}
