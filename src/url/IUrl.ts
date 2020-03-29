import { IPath } from '../filesystem';
import { ISegment } from './ISegment';

export interface IUrl {
  getUrl(): string;
  getPath(rootDirectory: IPath): IPath;
  getSegments(): ISegment[];
  removeLastSegment(): IUrl;
  getLastSegment(): ISegment | null;
  hasParent(): boolean;
  appendSegment(segment: ISegment): IUrl;
  toString(): string;
  is(url: IUrl): boolean;
}
