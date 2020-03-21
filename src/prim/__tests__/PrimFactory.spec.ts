import * as mock from 'mock-fs';
import { PrimFactory } from '@prim/prim/PrimFactory';
import { InvalidPath } from '@prim/error';
import { Path } from '@prim/filesystem';

const invalidPath = 'hello';
const validEmptyPath = 'empty';
const validPath = 'full';

beforeAll(() => {
  mock({
    [validEmptyPath]: {},
    [validPath]: {
      'some-file': 'Some contents',
    },
  });
});

describe('PrimFactory::create', () => {
  it('should throw on invalid paths', () => {
    const instanceCreation = () => {
      PrimFactory.createFromPath(invalidPath);
    };
    expect(instanceCreation).toThrowError(new InvalidPath(new Path(invalidPath)));
  });

  it('should create an instance for valid paths', () => {
    const prim = PrimFactory.createFromPath('empty');
    const otherPrim = PrimFactory.createFromPath('full');

    expect(prim.getRootDirectory().getPath()).toBe('empty');
    expect(otherPrim.getRootDirectory().getPath()).toBe('full');
  });
});

afterAll(() => {
  mock.restore();
});
