export interface IProperty {
  getName(): string;
  getValue(): any;
  is(property: IProperty): boolean;
}
