export interface IProperty {
  getName(): string;
  getValue(): string | null;
  is(property: IProperty): boolean;
}
