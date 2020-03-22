import { IPropertyHolder } from '../IPropertyHolder';
import { IPropertyMatch } from './IPropertyMatch';

export interface IPropertyHolderAwareMatch extends IPropertyMatch {
  setPropertyHolder(propertyHolder: IPropertyHolder): void;
}
