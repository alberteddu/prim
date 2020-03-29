import { join, normalize } from 'path';
import { IPath } from './IPath';
import { ISegment, Segment } from '../url';

export class Path implements IPath {
  constructor(private readonly path: string) {
    this.path = path.length === 0 ? '' : normalize(path);
  }

  getPath(prefix?: IPath): string {
    if (prefix === undefined) {
      return this.path;
    }

    return new Path(join(prefix.getPath(), this.path)).getPath();
  }

  appendSegment(segment: string): IPath {
    return new Path(join(this.path, segment));
  }

  removeLastSegment(): IPath {
    const newPathString = this.path
      .split('/')
      .slice(0, -1)
      .join('/');

    return new Path(newPathString);
  }

  join(path: IPath): IPath {
    return new Path(path.getPath(this));
  }

  getLastSegment(): ISegment | null {
    const segments = this.path.split('/').filter(part => part.length > 0);

    if (segments.length === 0) {
      return null;
    }

    return new Segment(segments[segments.length - 1]);
  }

  toString(): string {
    return this.path;
  }
}
