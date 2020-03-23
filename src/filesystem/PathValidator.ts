import { injectable, inject } from 'inversify';
import { existsSync, lstatSync } from 'fs';
import { relative, isAbsolute } from 'path';
import { TYPES } from '../types';
import { IPathValidator } from './IPathValidator';
import { InvalidPath } from '../error';
import { IPath } from './IPath';

@injectable()
export class PathValidator implements IPathValidator {
  constructor(@inject(TYPES.RootDirectory) private readonly rootDirectory: IPath) {}

  validatePath(path: IPath): void {
    if (!this.isValid(path)) {
      this.failPath(path);
    }
  }

  validateDirectory(path: IPath): void {
    this.validatePath(path);

    if (!this.isDirectory(path)) {
      this.failPath(path);
    }
  }

  validateFile(path: IPath): void {
    this.validatePath(path);

    if (!this.isFile(path)) {
      this.failPath(path);
    }
  }

  isValid(path: IPath): boolean {
    return existsSync(path.getPath()) && this.isPathUnderRootDirectory(path.getPath());
  }

  isDirectory(path: IPath): boolean {
    return lstatSync(path.getPath()).isDirectory();
  }

  isFile(path: IPath): boolean {
    return lstatSync(path.getPath()).isFile();
  }

  private isPathUnderRootDirectory(path: string): boolean {
    if (path === this.rootDirectory.getPath()) {
      return true;
    }

    const relativePath = relative(this.rootDirectory.getPath(), path);

    return relativePath.length > 0 && !relativePath.startsWith('..') && !isAbsolute(relativePath);
  }

  private failPath(path: IPath): void {
    throw new InvalidPath(path);
  }
}
