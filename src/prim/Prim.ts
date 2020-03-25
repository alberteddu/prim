import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { IPrim } from './IPrim';
import { IPath, IPathValidator } from '../filesystem';
import { INodeFinder } from '../finder';
import { IUrl, Url } from '../url';
import { IPost, IAttachment } from '../node';
import { IPluginHolder } from '../plugin';
import { IdentitySegmentVoter, NumberedSegmentVoter } from '../plugin/plugins';

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
    this.pluginHolder.addPlugin(new NumberedSegmentVoter());
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
