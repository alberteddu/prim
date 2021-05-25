import { container } from 'tsyringe';
import { Prim } from './Prim';
import { TYPES } from '../types';
import { Path } from '../filesystem/Path';
import { NodeFinder } from '../finder/NodeFinder';
import { NodeProvider } from '../node/NodeProvider';
import { PathValidator } from '../filesystem/PathValidator';
import { PluginHolder } from '../extend/PluginHolder';

export class PrimFactory {
    static createFromPath(path: string): Prim {
        const newContainer = container.createChildContainer();
        newContainer.register<Path>(TYPES.RootDirectory, { useValue: new Path(path) });
        newContainer.register<NodeFinder>(NodeFinder, { useClass: NodeFinder });
        newContainer.register<NodeProvider>(NodeProvider, { useClass: NodeProvider });
        newContainer.register<PathValidator>(PathValidator, { useClass: PathValidator });
        newContainer.registerSingleton<PluginHolder>(PluginHolder);
        newContainer.registerSingleton<Prim>(Prim);

        return newContainer.resolve(Prim);
    }
}
