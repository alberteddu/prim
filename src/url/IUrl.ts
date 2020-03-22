import { IPath } from '@prim/filesystem';

export interface IUrl {
  getUrl(): string;
  getPath(rootDirectory: IPath): IPath;
}
