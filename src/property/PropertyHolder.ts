import { IPropertyHolder } from './IPropertyHolder';
import { Property } from './Property';
import { IProperty } from './IProperty';
import { PropertyObject } from './PropertyObject';

export abstract class PropertyHolder implements IPropertyHolder {
  constructor(protected readonly properties: PropertyObject = {}) {}

  propertyExists(name: string): boolean {
    return typeof this.properties[name] !== 'undefined';
  }

  hasProperty(property: IProperty): boolean {
    const name = property.getName();

    return this.propertyExists(name) && this.getProperty(name).is(property);
  }

  getProperty(name: string, defaultValue: string | null = null): IProperty {
    const value = this.propertyExists(name) ? this.properties[name] : defaultValue;

    return new Property(name, value);
  }

  setProperty(property: IProperty): void {
    this.properties[property.getName()] = property.getValue();
  }

  getProperties(): IProperty[] {
    return Object.keys(this.properties).map(name => new Property(name, this.properties[name]));
  }

  toArray(): PropertyObject {
    return this.properties;
  }
}
