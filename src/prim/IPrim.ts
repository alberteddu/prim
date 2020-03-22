import { IPath } from '@prim/filesystem';
import { IPost, IAttachment } from '@prim/node';
import { IUrl } from '@prim/url';

export interface IPrim {
  getRootDirectory(): IPath;
  get(url: string | IUrl): IPost | IAttachment | null;
}
