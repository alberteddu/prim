import { IPropertyMatch } from './match/IPropertyMatch';
import { IProperty } from './IProperty';

export interface IPropertyHolder {
    propertyExists(name: string): boolean;

    hasProperty(property: IProperty): boolean;

    match(propertyMatch: IPropertyMatch): boolean;

    matchNameAndValue(name: string, value: any): boolean;

    matchValue(value: any): boolean;

    matchRegExp(name: string, regex: RegExp): boolean;

    matchCallback(callback: (property: IProperty) => boolean): boolean;

    getProperty<T>(name: string, defaultValue?: T): IProperty<T>;

    setProperty(property: IProperty): void;

    getProperties(): IProperty[];

    removeProperty(name: string): void;

    getProtectedNames(): string[];

    prop<T = any>(name: string, defaultValue: T): T;
}
