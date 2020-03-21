import { IProperty } from './IProperty';
import { PropertyObject } from './PropertyObject';
import { IPropertyMatch } from './match/IPropertyMatch';

export interface IPropertyHolder {
  propertyExists(name: string): boolean;
  hasProperty(property: IProperty): boolean;
  hasMatchingProperty(propertyMatch: IPropertyMatch): boolean;
  getProperty(name: string, defaultValue: string | null): IProperty;
  setProperty(property: IProperty): void;
  getProperties(): IProperty[];
  removeProperty(name: string): void;
  getProtectedNames(): string[];
}
