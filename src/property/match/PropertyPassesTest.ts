import { IPropertyMatch } from 'lib/property/match/IPropertyMatch';
import { IProperty } from 'lib/property/IProperty';

export class PropertyPassesTest implements IPropertyMatch {
    constructor(private readonly callback: (property: IProperty) => boolean) {}

    match(property: IProperty): boolean {
        return this.callback(property);
    }
}
