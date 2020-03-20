import { PathType } from './PathType';

export interface IPath {
  getPath(): string;
  appendSegment(segment: string): IPath;
  removeLastSegment(): IPath;
}
