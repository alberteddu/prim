import { IPath } from '@prim/filesystem';
import { IPost, IAttachment } from '@prim/node';

export interface IPrim {
  getRootDirectory(): IPath;
  get(url: string): IPost | IAttachment | null;
}
