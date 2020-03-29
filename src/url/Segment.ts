import { ISegment } from './ISegment';

export class Segment implements ISegment {
  constructor(private readonly segment: string) {}

  getSegment(): string {
    return this.segment;
  }

  is(segment: ISegment): boolean {
    return segment.getSegment() === this.getSegment();
  }

  toString(): string {
    return this.getSegment();
  }
}
