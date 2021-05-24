import { IDynamicNode } from 'lib/extend/scope/IDynamicNode';
import { IProperty } from 'lib/property/IProperty';
import { ISegment } from 'lib/url/ISegment';

export abstract class DynamicNode implements IDynamicNode {
    constructor(protected readonly segment: ISegment, protected readonly properties: IProperty[]) {}

    getSegment(): ISegment {
        return this.segment;
    }

    getProperties(): IProperty[] {
        return this.properties;
    }
}
