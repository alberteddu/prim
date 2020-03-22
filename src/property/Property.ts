import { IProperty } from './IProperty';

export class Property implements IProperty {
  constructor(private readonly name: string, private readonly value: string | null) {}

  getName(): string {
    return this.name;
  }

  getValue(): string | null {
    return this.value;
  }

  is(property: IProperty): boolean {
    return this.name === property.getName() && this.value === property.getValue();
  }
}
