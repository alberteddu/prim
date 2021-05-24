import { IProperty } from '../property/IProperty';
import { ISegment } from '../url/ISegment';
import { IDynamicNode } from '../extend/scope/IDynamicNode';

export abstract class DynamicNode implements IDynamicNode {
    constructor(protected readonly segment: ISegment, protected readonly properties: IProperty[]) {}

    getSegment(): ISegment {
        return this.segment;
    }

    getProperties(): IProperty[] {
        return this.properties;
    }
}
