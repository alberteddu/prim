export interface ISegment {
  getSegment(): string;
  is(segment: ISegment): boolean;
  toString(): string;
}
