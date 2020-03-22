import * as mock from 'mock-fs';
import { NodeFinder } from '@prim/finder';
import { Path, PathValidator } from '@prim/filesystem';
import { NodeProvider, Attachment } from '@prim/node';
import { Property } from '@prim/property';

beforeAll(() => {
  mock({
    root: {
      folder: {
        file: 'contents.txt',
      },
    },
  });
});

describe('Attachment', () => {
  const rootDirectory = new Path('root');
  const pathValidator = new PathValidator(rootDirectory);
  const nodeProvider = new NodeProvider(pathValidator);
  const nodeFinder = new NodeFinder(rootDirectory, pathValidator, nodeProvider);

  it('should create an attachment', () => {
    const attachmentWithoutProperty = new Attachment(new Path('root/folder/file'), [], nodeFinder);
    const attachment = new Attachment(
      new Path('root/folder/file'),
      [new Property('extension', 'txt')],
      nodeFinder,
    );

    expect(attachmentWithoutProperty.getProperty('extension').getValue()).toBeNull();
    expect(attachment.getProperty('extension').getValue()).toBe('txt');
  });
});

afterAll(mock.restore);
