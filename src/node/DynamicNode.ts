import { IDynamicNode } from '../plugin';
import { IProperty } from '../property';
import { ISegment } from '../url';

export abstract class DynamicNode implements IDynamicNode {
  constructor(protected readonly segment: ISegment, protected readonly properties: IProperty[]) {}

  getSegment(): ISegment {
    return this.segment;
  }

  getProperties(): IProperty[] {
    return this.properties;
  }
}
