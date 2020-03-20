import { IPath } from '@prim/path';
import { IPost, IAttachment } from '@prim/node';

export interface IPrim {
  getRootDirectory(): IPath;
  get(url: string): IPost | IAttachment | null;
}
