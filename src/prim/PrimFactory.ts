import { Container } from 'inversify';
import { TYPES } from '@prim/types';
import { IPrim } from './IPrim';
import { Prim } from './Prim';
import { Path, PathValidator, IPath, IPathValidator } from '@prim/filesystem';
import { INodeFinder, NodeFinder } from '@prim/finder';
import { INodeProvider, NodeProvider } from '@prim/node';

export class PrimFactory {
  static createFromPath(path: string): IPrim {
    const container = new Container();
    container.bind<string>(TYPES.Path).toConstantValue(path);
    container.bind<IPath>(TYPES.RootDirectory).toConstantValue(new Path(path));
    container
      .bind<IPrim>(TYPES.Prim)
      .to(Prim)
      .inSingletonScope();
    container.bind<IPathValidator>(TYPES.PathValidator).to(PathValidator);
    container.bind<INodeFinder>(TYPES.NodeFinder).to(NodeFinder);
    container.bind<INodeProvider>(TYPES.NodeProvider).to(NodeProvider);

    return container.get<IPrim>(TYPES.Prim);
  }
}
