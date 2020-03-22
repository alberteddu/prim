import { IPath } from '@prim/filesystem';

export class InvalidPath extends Error {
  /* istanbul ignore next */
  constructor(path: IPath) {
    super(`Path "${path.getPath()}" is not valid.`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
