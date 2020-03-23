import * as mock from 'mock-fs';
import { PathValidator, Path } from '../../filesystem';
import { InvalidPath } from '../../error';

beforeAll(() => {
  mock({
    real: {
      path: {
        directory: {
          file: 'contents',
        },
      },
    },
  });
});

describe('PathValidator', () => {
  const rootPath = new Path('real/path');
  const pathValidator = new PathValidator(rootPath);
  const badPath = new Path('other/path');
  const directory = new Path('real/path/directory');
  const file = new Path('real/path/directory/file');

  it('should only allow paths inside the root directory', () => {
    expect(pathValidator.isValid(directory)).toBeTruthy();
    expect(pathValidator.isValid(new Path('real/path/directory'))).toBeTruthy();
    expect(pathValidator.isValid(new Path('/'))).toBeFalsy();
    expect(pathValidator.isValid(badPath)).toBeFalsy();

    expect(() => {
      pathValidator.validatePath(badPath);
    }).toThrowError(new InvalidPath(badPath));
  });

  it('should only allow existing paths', () => {
    expect(pathValidator.isValid(new Path('real/path/directory/file'))).toBeTruthy();
    expect(pathValidator.isValid(new Path('real/path/directory/not-found'))).toBeFalsy();
  });

  it('should validate files', () => {
    expect(pathValidator.isFile(file)).toBeTruthy();
    expect(() => {
      pathValidator.validateFile(directory);
    }).toThrowError(new InvalidPath(directory));
  });

  it('should validate directories', () => {
    expect(pathValidator.isDirectory(directory)).toBeTruthy();
    expect(() => {
      pathValidator.validateDirectory(file);
    }).toThrowError(new InvalidPath(file));
  });
});

afterAll(mock.restore);
