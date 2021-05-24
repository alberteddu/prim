import { ISegment } from 'lib/url/ISegment';
import { IProperty } from 'lib/property/IProperty';

export interface IDynamicNode {
    getSegment(): ISegment;

    getProperties(): IProperty[];
}
