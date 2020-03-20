import { IPath } from './IPath';

export interface IPathValidator {
  validatePath(path: IPath): void;
  validateDirectory(path: IPath): void;
  validateFile(path: IPath): void;
  isValid(path: IPath): boolean;
  isDirectory(path: IPath): boolean;
  isFile(path: IPath): boolean;
}
