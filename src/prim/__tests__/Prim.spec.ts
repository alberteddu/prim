import mock from 'mock-fs';
import { Path } from 'lib/filesystem/Path';
import { Prim } from 'lib/prim/Prim';
import { PluginHolder } from 'lib/extend/PluginHolder';
import { PathValidator } from 'lib/filesystem/PathValidator';
import { NodeProvider } from 'lib/node/NodeProvider';
import { NodeFinder } from 'lib/finder/NodeFinder';

describe('Prim', () => {
    mock({
        root: {
            child: {
                filename: 'contents',
            },
        },
    });

    const rootDirectory = new Path('root');
    const pathValidator = new PathValidator(rootDirectory);
    const nodeProvider = new NodeProvider(pathValidator);
    const pluginHolder = new PluginHolder();
    const nodeFinder = new NodeFinder(rootDirectory, pathValidator, nodeProvider, pluginHolder);

    it('should create a prim instance', () => {
        const prim = new Prim(rootDirectory, pathValidator, nodeFinder, pluginHolder);
        expect(prim.getRootDirectory()).toEqual(rootDirectory);
    });
});

afterAll(mock.restore);
