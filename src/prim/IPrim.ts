import { IPluginHolder } from '../extend/IPluginHolder';
import { IPost } from '../node/IPost';
import { IPath } from '../filesystem/IPath';
import { IUrl } from '../url/IUrl';
import { IAttachment } from '../node/IAttachment';

export interface IPrim {
    getRootDirectory(): IPath;

    get(url: string | IUrl): IPost | IAttachment | null;

    getPluginHolder(): IPluginHolder;
}
