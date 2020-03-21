import { injectable, inject } from 'inversify';
import { TYPES } from '@prim/types';
import { IPrim } from './IPrim';
import { IPath, IPathValidator, Path } from '@prim/filesystem';
import { IPost, IAttachment } from '@prim/node';
import { INodeFinder } from '@prim/finder';

@injectable()
export class Prim implements IPrim {
  constructor(
    @inject(TYPES.RootDirectory) private readonly rootDirectory: IPath,
    @inject(TYPES.PathValidator) private readonly pathValidator: IPathValidator,
    @inject(TYPES.NodeFinder) private readonly nodeFinder: INodeFinder,
  ) {
    this.pathValidator.validateDirectory(rootDirectory);
  }

  getRootDirectory(): IPath {
    return this.rootDirectory;
  }

  get(url: string): IPost | IAttachment | null {
    return this.nodeFinder.findNodeAt(new Path(url));
  }
}
