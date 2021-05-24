import { IProperty } from 'lib/property/IProperty';

export interface IPropertyMatch {
    match(property: IProperty): boolean;
}
