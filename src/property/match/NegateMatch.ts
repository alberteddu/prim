import { IPropertyMatch } from 'lib/property/match/IPropertyMatch';
import { IProperty } from 'lib/property/IProperty';

export class NegateMatch implements IPropertyMatch {
    constructor(private readonly propertyMatch: IPropertyMatch) {}

    match(property: IProperty): boolean {
        return !this.propertyMatch.match(property);
    }
}
