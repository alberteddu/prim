import { IPropertyMatch } from './IPropertyMatch';
import { IPropertyHolder } from '../IPropertyHolder';

export interface IPropertyHolderAwareMatch extends IPropertyMatch {
    setPropertyHolder(propertyHolder: IPropertyHolder): void;
}
