import { ISegment } from '../../url';
import { IProperty } from '../../property';

export interface IDynamicNode {
  getSegment(): ISegment;
  getProperties(): IProperty[];
}
