import { ISegment } from '../../url/ISegment';
import { IProperty } from '../../property/IProperty';

export interface IDynamicNode {
    getSegment(): ISegment;

    getProperties(): IProperty[];
}
