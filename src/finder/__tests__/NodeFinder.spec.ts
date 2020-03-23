import mock from 'mock-fs';
import { NodeFinder } from '../../finder';
import { Path, PathValidator } from '../../filesystem';
import { NodeProvider, Post } from '../../node';
import { Url } from '../../url';

beforeAll(() => {
  mock({
    root: {
      emptyFolder: {},
      folderWithFile: {
        otherFile: 'some other contents',
      },
      file: 'some contents',
    },
  });
});

describe('NodeFinder', () => {
  const rootDirectory = new Path('root');
  const pathValidator = new PathValidator(rootDirectory);
  const nodeProvider = new NodeProvider(pathValidator);
  const nodeFinder = new NodeFinder(rootDirectory, pathValidator, nodeProvider);

  it('should find the root post', () => {
    expect(nodeFinder.findRootPost().getPath()).toEqual(rootDirectory);
  });

  it('should find the children of the root post', () => {
    const posts = nodeFinder.findPostsAt(nodeFinder.findRootPost());

    expect(posts.count()).toBe(2);
    expect(posts.map(post => post.getPath())).toEqual([
      rootDirectory.appendSegment('emptyFolder'),
      rootDirectory.appendSegment('folderWithFile'),
    ]);
  });

  it('should find a single post', () => {
    const rootPost = nodeFinder.findRootPost();
    const child = nodeFinder.findPostAt(new Path('root/emptyFolder'));

    expect(nodeFinder.findPostAt(rootDirectory)).toEqual(rootPost);
    expect(rootPost.getParent()).toBeNull();
    expect(child.getParent()?.is(rootPost)).toBeTruthy();
    expect(rootPost.isParentOf(child)).toBeTruthy();
    expect(rootPost.isParentOf(rootPost)).toBeFalsy();
    expect(rootPost.isChildOf(child)).toBeFalsy();
    expect(rootPost.getSiblings().count()).toBe(0);
    expect(child.isChildOf(rootPost)).toBeTruthy();
    expect(rootPost.getChildren().contains(child)).toBeTruthy();
    expect(child.getSiblings().count()).toBe(1);
    expect(rootPost.getProtectedNames()).toEqual([]);
  });

  it('should find the attachments of a post', () => {
    const rootPost = nodeFinder.findRootPost();
    const attachments = nodeFinder.findAttachmentsAt(rootPost);

    expect(attachments.count()).toBe(1);
    expect(attachments.map(attachment => attachment.getPath())).toEqual([new Path('root/file')]);
    expect(rootPost.getAttachments()).toEqual(attachments);

    const first = attachments.first();

    expect(first !== null).toBeTruthy();

    if (first !== null) {
      expect(rootPost.hasAttachment(first)).toBeTruthy();
    }
  });

  it('should find a single attachment', () => {
    const node = nodeFinder.findPostAt(new Path('root'));
    const attachment = nodeFinder.findAttachmentAt(new Path('root/file'));

    expect(attachment.getProtectedNames()).toEqual(['extension', 'type', 'size']);
    expect(attachment.getPath()).toEqual(new Path('root/file'));
    expect(attachment.getPost().is(node)).toBeTruthy();
    expect(attachment.isAttachmentOf(node)).toBeTruthy();
  });

  it('should find a node using a URL', () => {
    const url = new Url('/');
    const otherUrl = new Url('folderWithFile/otherFile');
    const notFound = new Url('emptyFolder/not-found');

    const node = nodeFinder.findNodeAt(url);
    const otherNode = nodeFinder.findNodeAt(otherUrl);
    const notFoundNode = nodeFinder.findNodeAt(notFound);

    expect(notFoundNode).toBeNull();
    expect(node === null).toBeFalsy();
    expect(otherNode === null).toBeFalsy();
  });
});

afterAll(mock.restore);
