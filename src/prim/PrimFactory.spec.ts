import * as mock from 'mock-fs';
import { PrimFactory } from './PrimFactory';
import { InvalidPath } from '@prim/error';
import { Path } from '@prim/path';

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
      PrimFactory.create(invalidPath);
    };
    expect(instanceCreation).toThrowError(new InvalidPath(new Path(invalidPath)));
  });

  it('should create an instance for valid paths', () => {
    const prim = PrimFactory.create('empty');
    const otherPrim = PrimFactory.create('full');

    expect(prim.getRootDirectory().getPath()).toBe('empty');
    expect(otherPrim.getRootDirectory().getPath()).toBe('full');
  });
});

afterAll(() => {
  mock.restore();
});
