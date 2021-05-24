import { IPropertyMatch } from 'lib/property/match/IPropertyMatch';
import { IPropertyHolder } from 'lib/property/IPropertyHolder';

export interface IPropertyHolderAwareMatch extends IPropertyMatch {
    setPropertyHolder(propertyHolder: IPropertyHolder): void;
}
