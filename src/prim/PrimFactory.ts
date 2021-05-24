import { Container } from 'inversify';
import { Prim } from './Prim';
import { IPrim } from './IPrim';
import { IPluginHolder } from '../extend/IPluginHolder';
import { IPath } from '../filesystem/IPath';
import { IPathValidator } from '../filesystem/IPathValidator';
import { PathValidator } from '../filesystem/PathValidator';
import { INodeProvider } from '../node/INodeProvider';
import { NodeProvider } from '../node/NodeProvider';
import { INodeFinder } from '../finder/INodeFinder';
import { NodeFinder } from '../finder/NodeFinder';
import { TYPES } from '../types';
import { PluginHolder } from '../extend/PluginHolder';
import { Path } from '../filesystem/Path';

export class PrimFactory {
    static createFromPath(path: string): IPrim {
        const container = new Container();
        container.bind<string>(TYPES.Path).toConstantValue(path);
        container.bind<IPath>(TYPES.RootDirectory).toConstantValue(new Path(path));
        container
            .bind<IPluginHolder>(TYPES.PluginHolder)
            .to(PluginHolder)
            .inSingletonScope();
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
