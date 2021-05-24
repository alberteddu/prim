import { IPropertyMatch } from './IPropertyMatch';
import { IProperty } from '../IProperty';

export class NegateMatch implements IPropertyMatch {
    constructor(private readonly propertyMatch: IPropertyMatch) {}

    match(property: IProperty): boolean {
        return !this.propertyMatch.match(property);
    }
}
