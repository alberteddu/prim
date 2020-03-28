import mock from 'mock-fs';
import { Prim } from '../../prim';
import { Path, PathValidator } from '../../filesystem';
import { NodeFinder } from '../../finder';
import { NodeProvider } from '../../node';
import { PluginHolder } from '../../extend';

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
