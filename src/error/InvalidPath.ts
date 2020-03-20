import { IPath } from '@prim/path';

export class InvalidPath extends Error {
  constructor(path: IPath) {
    super(`Path "${path.getPath()}" is not valid.`);
  }
}
