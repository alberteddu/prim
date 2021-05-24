import { IPropertyMatch } from 'lib/property/match/IPropertyMatch';
import { CannotModifyProtectedProperty } from 'lib/error/CannotModifyProtectedProperty';
import { PropertyPassesTest } from 'lib/property/match/PropertyPassesTest';
import { IProperty } from 'lib/property/IProperty';
import { IPropertyHolderAwareMatch } from 'lib/property/match/IPropertyHolderAwareMatch';
import { PropertyIsEqual } from 'lib/property/match/PropertyIsEqual';
import { PropertyObject } from 'lib/property/PropertyObject';
import { ValueMatchesRegex } from 'lib/property/match/ValueMatchesRegex';
import { IPropertyHolder } from 'lib/property/IPropertyHolder';
import { Property } from 'lib/property/Property';

const instanceOfPropertyHolderAwareMatch = (object: IPropertyMatch): object is IPropertyHolderAwareMatch => {
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

    match(propertyMatch: IPropertyMatch): boolean {
        if (instanceOfPropertyHolderAwareMatch(propertyMatch)) {
            propertyMatch.setPropertyHolder(this);
        }

        return this.getProperties().some(eachProperty => propertyMatch.match(eachProperty));
    }

    matchNameAndValue(name: string, value: any): boolean {
        return this.match(new PropertyIsEqual(new Property(name, value)));
    }

    matchValue(value: any): boolean {
        return this.matchCallback(property => Property.valueEquals(property.getValue(), value));
    }

    matchRegExp(name: string, regex: RegExp): boolean {
        return this.match(new ValueMatchesRegex(name, regex));
    }

    matchCallback(callback: (property: IProperty) => boolean): boolean {
        return this.match(new PropertyPassesTest(callback));
    }

    getProperty<T = any>(name: string, defaultValue: T = null as any): IProperty {
        if (this.propertyExists(name)) {
            return this.properties[name];
        }

        return new Property<T>(name, defaultValue);
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

    prop<T = any>(name: string, defaultValue: T = null as any): T {
        return this.getProperty(name, defaultValue).getValue();
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
