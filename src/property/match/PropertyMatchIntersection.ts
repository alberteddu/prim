import { IPropertyMatch } from './IPropertyMatch';
import { IProperty } from '../IProperty';

export class PropertyMatchIntersection implements IPropertyMatch {
    private operands: IPropertyMatch[];

    constructor(...operands: IPropertyMatch[]) {
        this.operands = operands;
    }

    match(property: IProperty): boolean {
        return this.operands.every(operand => operand.match(property));
    }
}
