import { IPath } from 'lib/filesystem/IPath';
import { IPluginHolder } from 'lib/extend/IPluginHolder';
import { IPost } from 'lib/node/IPost';
import { IUrl } from 'lib/url/IUrl';
import { IAttachment } from 'lib/node/IAttachment';

export interface IPrim {
    getRootDirectory(): IPath;

    get(url: string | IUrl): IPost | IAttachment | null;

    getPluginHolder(): IPluginHolder;
}
