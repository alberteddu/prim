import { IPropertyMatch } from 'lib/property/match/IPropertyMatch';
import { IProperty } from 'lib/property/IProperty';

export class PropertyMatchUnion implements IPropertyMatch {
    private operands: IPropertyMatch[];

    constructor(...operands: IPropertyMatch[]) {
        this.operands = operands;
    }

    match(property: IProperty): boolean {
        return this.operands.some(operand => operand.match(property));
    }
}
