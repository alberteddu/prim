import { IPath } from '../filesystem';

export interface IUrl {
  getUrl(): string;
  getPath(rootDirectory: IPath): IPath;
}
