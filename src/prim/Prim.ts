import { injectable, inject } from 'inversify';
import { TYPES } from '@prim/types';
import { IPrim } from './IPrim';
import { IPath, IPathValidator } from '@prim/filesystem';
import { INodeFinder } from '@prim/finder';
import { IUrl, Url } from '@prim/url';
import { IPost, IAttachment } from '@prim/node';

@injectable()
export class Prim implements IPrim {
  constructor(
    @inject(TYPES.RootDirectory) private readonly rootDirectory: IPath,
    @inject(TYPES.PathValidator) private readonly pathValidator: IPathValidator,
    @inject(TYPES.NodeFinder) private readonly nodeFinder: INodeFinder,
  ) {
    this.pathValidator.validateDirectory(this.getRootDirectory());
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

    return this.nodeFinder.findNodeAt(nodeUrl);
  }
}
