import { IPropertyMatch } from 'lib/property/match/IPropertyMatch';
import { IProperty } from 'lib/property/IProperty';

export class PropertyIsEqual implements IPropertyMatch {
    constructor(private readonly property: IProperty) {}

    match(property: IProperty): boolean {
        return property.is(this.property);
    }
}
