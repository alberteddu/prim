import { IProperty } from '../IProperty';

export interface IPropertyMatch {
  match(property: IProperty): boolean;
}
