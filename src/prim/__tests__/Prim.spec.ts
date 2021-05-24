import mock from 'mock-fs';
import { Prim } from '../Prim';
import { PluginHolder } from '../../extend/PluginHolder';
import { PathValidator } from '../../filesystem/PathValidator';
import { NodeProvider } from '../../node/NodeProvider';
import { NodeFinder } from '../../finder/NodeFinder';
import { Path } from '../../filesystem/Path';

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
