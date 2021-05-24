import { Container } from 'inversify';
import { TYPES } from 'lib/types';
import { Prim } from 'lib/prim/Prim';
import { IPluginHolder } from 'lib/extend/IPluginHolder';
import { PluginHolder } from 'lib/extend/PluginHolder';
import { IPath } from 'lib/filesystem/IPath';
import { IPrim } from 'lib/prim/IPrim';
import { IPathValidator } from 'lib/filesystem/IPathValidator';
import { PathValidator } from 'lib/filesystem/PathValidator';
import { INodeProvider } from 'lib/node/INodeProvider';
import { NodeProvider } from 'lib/node/NodeProvider';
import { INodeFinder } from 'lib/finder/INodeFinder';
import { NodeFinder } from 'lib/finder/NodeFinder';
import { Path } from 'lib/filesystem/Path';

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
