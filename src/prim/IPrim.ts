import { IPath } from '../filesystem';
import { IPost, IAttachment } from '../node';
import { IUrl } from '../url';
import { IPluginHolder } from '../plugin';

export interface IPrim {
  getRootDirectory(): IPath;
  get(url: string | IUrl): IPost | IAttachment | null;
  getPluginHolder(): IPluginHolder;
}
