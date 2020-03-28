import mock from 'mock-fs';
import { PrimFactory } from '../../../prim';
import { MarkdownPosts } from '../MarkdownPosts';

describe('MarkdownPosts', () => {
  mock({
    root: {
      post: {
        'index.md': 'Normal *contents*.',
      },
      'index.md': `
+++
title = "Some title"
date = 2020-01-25

post.category = "blog"
post.published = false
+++
Some markdown *content*.
`,
    },
  });

  const prim = PrimFactory.createFromPath('root');
  prim.getPluginHolder().addPlugin(new MarkdownPosts());
  const root = prim.get('/');
  const post = prim.get('/post');

  it('should handle files with frontmatter', () => {
    expect(root?.getProperty('title', '').getValue()).toBe('Some title');
    expect(root?.getProperty('date', null).getValue()).toEqual(new Date('2020-01-25'));
    expect(root?.getProperty('markdown', '').getValue()).toBe('Some markdown _content_.');
    expect(root?.getProperty('post', {}).getValue()).toEqual({
      category: 'blog',
      published: false,
    });
  });

  it('should handle files without frontmatter', () => {
    expect(post?.getProperty('title', '').getValue()).toBe('');
    expect(post?.getProperty('markdown', '').getValue()).toBe('Normal _contents_.');
  });
});

afterAll(mock.restore);
