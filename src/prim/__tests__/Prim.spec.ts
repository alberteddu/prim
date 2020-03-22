import * as mock from 'mock-fs';
import { Prim } from '@prim/prim';
import { Path, PathValidator } from '@prim/filesystem';
import { NodeFinder } from '@prim/finder';
import { NodeProvider } from '@prim/node';

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
  const nodeFinder = new NodeFinder(rootDirectory, pathValidator, nodeProvider);

  it('should create a prim instance', () => {
    const prim = new Prim(rootDirectory, pathValidator, nodeFinder);
    expect(prim.getRootDirectory()).toEqual(rootDirectory);
  });
});

afterAll(mock.restore);
