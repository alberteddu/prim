import equal from 'deep-equal';
import { IProperty } from 'lib/property/IProperty';

export class Property<T = any> implements IProperty<T> {
    constructor(private readonly name: string, private readonly value: T) {}

    getName(): string {
        return this.name;
    }

    getValue(): T {
        return this.value;
    }

    is(property: IProperty): boolean {
        return this.name === property.getName() && Property.valueEquals(this.value, property.getValue());
    }

    static valueEquals(left: any, right: any) {
        return equal(left, right);
    }
}
