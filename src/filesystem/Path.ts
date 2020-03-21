import { join } from 'path';
import { IPath } from './IPath';

export class Path implements IPath {
  constructor(private readonly path: string) {}

  getPath(): string {
    return this.path;
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
}
