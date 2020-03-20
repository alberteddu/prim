import { IProperty } from './IProperty';
import { PropertyObject } from './PropertyObject';

export interface IPropertyHolder {
  propertyExists(name: string): boolean;
  hasProperty(property: IProperty): boolean;
  getProperty(name: string, defaultValue: string | null): IProperty;
  setProperty(property: IProperty): void;
  getProperties(): IProperty[];
  toArray(): PropertyObject;
}
