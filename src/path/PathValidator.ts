import { injectable } from 'inversify';
import { existsSync, lstatSync } from 'fs';
import { IPathValidator } from './IPathValidator';
import { InvalidPath } from '@prim/error';
import { IPath } from './IPath';

@injectable()
export class PathValidator implements IPathValidator {
  // todo here we should check that paths are actually inside the root path
  validatePath(path: IPath): void {
    if (!this.isValid(path)) {
      throw new InvalidPath(path);
    }
  }

  validateDirectory(path: IPath): void {
    this.validatePath(path);

    if (!this.isDirectory(path)) {
      throw new InvalidPath(path);
    }
  }

  validateFile(path: IPath): void {
    this.validatePath(path);

    if (!this.isFile(path)) {
      throw new InvalidPath(path);
    }
  }

  isValid(path: IPath): boolean {
    return existsSync(path.getPath());
  }

  isDirectory(path: IPath): boolean {
    return lstatSync(path.getPath()).isDirectory();
  }

  isFile(path: IPath): boolean {
    return lstatSync(path.getPath()).isFile();
  }
}
