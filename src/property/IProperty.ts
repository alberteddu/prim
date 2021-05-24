export interface IProperty<T = any> {
    getName(): string;

    getValue(): T;

    is(property: IProperty): boolean;
}
