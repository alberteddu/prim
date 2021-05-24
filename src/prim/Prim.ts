import { inject, injectable } from 'inversify';
import { IPrim } from 'lib/prim/IPrim';
import { TYPES } from 'lib/types';
import { IPluginHolder } from 'lib/extend/IPluginHolder';
import { IPost } from 'lib/node/IPost';
import { IPath } from 'lib/filesystem/IPath';
import { IUrl } from 'lib/url/IUrl';
import { IPathValidator } from 'lib/filesystem/IPathValidator';
import { IAttachment } from 'lib/node/IAttachment';
import { INodeFinder } from 'lib/finder/INodeFinder';
import { IdentitySegmentVoter } from 'lib/extra/plugins/IdentitySegmentVoter';
import { Url } from 'lib/url/Url';

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
