import { inject, injectable } from 'inversify';
import { IPrim } from './IPrim';
import { TYPES } from '../types';
import { IPluginHolder } from '../extend/IPluginHolder';
import { IPost } from '../node/IPost';
import { IPath } from '../filesystem/IPath';
import { IUrl } from '../url/IUrl';
import { IPathValidator } from '../filesystem/IPathValidator';
import { IAttachment } from '../node/IAttachment';
import { INodeFinder } from '../finder/INodeFinder';
import { IdentitySegmentVoter } from '../extra/plugins/IdentitySegmentVoter';
import { Url } from '../url/Url';

@injectable()
export class Prim implements IPrim {
    constructor(
        @inject(TYPES.RootDirectory) private readonly rootDirectory: IPath,
        @inject(TYPES.PathValidator) private readonly pathValidator: IPathValidator,
        @inject(TYPES.NodeFinder) private readonly nodeFinder: INodeFinder,
        @inject(TYPES.PluginHolder) private readonly pluginHolder: IPluginHolder,
    ) {
        this.pathValidator.validateDirectory(this.getRootDirectory());

        this.pluginHolder.addPlugin(new IdentitySegmentVoter());
    }

    getRootDirectory(): IPath {
        return this.rootDirectory;
    }

    get(url: string | IUrl): IPost | IAttachment | null {
        let nodeUrl;

        if (typeof url === 'string') {
            nodeUrl = new Url(url);
        } else {
            nodeUrl = url;
        }

        return this.nodeFinder.findNodeAtUrl(nodeUrl);
    }

    getPluginHolder(): IPluginHolder {
        return this.pluginHolder;
    }
}
