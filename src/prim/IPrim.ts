import { IPath } from '../filesystem';
import { IPost, IAttachment } from '../node';
import { IUrl } from '../url';

export interface IPrim {
  getRootDirectory(): IPath;
  get(url: string | IUrl): IPost | IAttachment | null;
}
