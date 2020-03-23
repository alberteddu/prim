import { join, normalize } from 'path';
import { IPath } from './IPath';

export class Path implements IPath {
  constructor(private readonly path: string) {
    this.path = path.length === 0 ? '' : normalize(path);

    if (this.path.slice(0, 1) === '/') {
      this.path = this.path.slice(1);
    }
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
}