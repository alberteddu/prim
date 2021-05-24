import { IPropertyMatch } from './IPropertyMatch';
import { IProperty } from '../IProperty';

export class PropertyMatchUnion implements IPropertyMatch {
    private operands: IPropertyMatch[];

    constructor(...operands: IPropertyMatch[]) {
        this.operands = operands;
    }

    match(property: IProperty): boolean {
        return this.operands.some(operand => operand.match(property));
    }
}
