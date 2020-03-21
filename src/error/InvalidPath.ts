import { IPath } from '@prim/filesystem';

export class InvalidPath extends Error {
  constructor(path: IPath) {
    super(`Path "${path.getPath()}" is not valid.`);
  }
}
