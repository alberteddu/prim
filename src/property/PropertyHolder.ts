import { IPropertyHolder } from './IPropertyHolder';
import { Property } from './Property';
import { IProperty } from './IProperty';
import { PropertyObject } from './PropertyObject';
import { IPropertyMatch, ValueMatchesRegex, PropertyIsEqual, PropertyPassesTest } from './match';
import { CannotModifyProtectedProperty } from '../error';
import { IPropertyHolderAwareMatch } from './match/IPropertyHolderAwareMatch';

const instanceOfPropertyHolderAwareMatch = (
  object: IPropertyMatch,
): object is IPropertyHolderAwareMatch => {
  return 'setPropertyHolder' in object;
};

export abstract class PropertyHolder implements IPropertyHolder {
  private readonly properties: PropertyObject = {};

  constructor(properties: IProperty[] = []) {
    properties.forEach(this.setProperty.bind(this));
  }

  propertyExists(name: string): boolean {
    return this.properties.hasOwnProperty(name);
  }

  hasProperty(property: IProperty): boolean {
    const name = property.getName();

    return this.propertyExists(name) && this.getProperty(name).is(property);
  }

  hasMatchingProperty(propertyMatch: IPropertyMatch): boolean {
    if (instanceOfPropertyHolderAwareMatch(propertyMatch)) {
      propertyMatch.setPropertyHolder(this);
    }

    return this.getProperties().some(eachProperty => propertyMatch.match(eachProperty));
  }

  matchNameAndValue(name: string, value: string): boolean {
    return this.hasMatchingProperty(new PropertyIsEqual(new Property(name, value)));
  }

  matchValue(value: string): boolean {
    return this.matchCallback(property => property.getValue() === value);
  }

  matchRegExp(regex: RegExp): boolean {
    return this.hasMatchingProperty(new ValueMatchesRegex(regex));
  }

  matchCallback(callback: (property: IProperty) => boolean): boolean {
    return this.hasMatchingProperty(new PropertyPassesTest(callback));
  }

  getProperty(name: string, defaultValue: string | null = null): IProperty {
    if (this.propertyExists(name)) {
      return this.properties[name];
    }

    return new Property(name, defaultValue);
  }

  setProperty(property: IProperty): void {
    this.protect(property.getName());

    this.properties[property.getName()] = property;
  }

  getProperties(): IProperty[] {
    return Object.values(this.properties);
  }

  removeProperty(name: string): void {
    this.protect(name);

    delete this.properties[name];
  }

  abstract getProtectedNames(): string[];

  private isProtected(name: string) {
    return this.getProtectedNames().indexOf(name) !== -1;
  }

  private protect(name: string) {
    if (this.propertyExists(name) && this.isProtected(name)) {
      throw new CannotModifyProtectedProperty(name);
    }
  }
}
