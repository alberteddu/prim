import { ISegment } from '../url';

export interface IPath {
  getPath(prefix?: IPath): string;
  appendSegment(segment: string): IPath;
  removeLastSegment(): IPath;
  join(path: IPath): IPath;
  getLastSegment(): ISegment | null;
}
