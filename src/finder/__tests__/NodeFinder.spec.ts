import mock from 'mock-fs';
import { PathValidator } from '../../filesystem/PathValidator';
import { NodeProvider } from '../../node/NodeProvider';
import { NodeFinder } from '../NodeFinder';
import { PrivateNodes } from '../../extra/plugins/PrivateNodes';
import { Segment } from '../../url/Segment';
import { NumberedSegmentVoter } from '../../extra/plugins/NumberedSegmentVoter';
import { PluginHolder } from '../../extend/PluginHolder';
import { PluginScope } from '../../extend/scope/PluginScope';
import { IDynamicNodePlugin } from '../../extend/scope/IDynamicNodePlugin';
import { IdentitySegmentVoter } from '../../extra/plugins/IdentitySegmentVoter';
import { Path } from '../../filesystem/Path';
import { Url } from '../../url/Url';
import { DynamicAttachment } from '../../node/DynamicAttachment';
import { DynamicPost } from '../../node/DynamicPost';
import { Post } from '../../node/Post';

beforeAll(() => {
    mock({
        root: {
            emptyFolder: {},
            folderWithFile: {
                otherFile: 'some other contents',
                '1. folderWithNumber': {},
                _privateFile: 'some private contents',
                __privatePath: {
                    unreachable: 'unreachable file',
                },
                _privatePathWithReachableChild: {
                    reachable: 'reachable file',
                },
            },
            file: 'some contents',
        },
    });
});

class ExamplePlugin implements IDynamicNodePlugin {
    getId(): string {
        return 'example';
    }

    getChildrenOfPost(post: Post): DynamicPost[] {
        if (
            post
                .getUrl()
                .getLastSegment()
                ?.getSegment() === 'emptyFolder'
        ) {
            return [new DynamicPost(new Segment('this-is-dynamic'), [])];
        }

        if (
            post
                .getUrl()
                .getLastSegment()
                ?.getSegment() === 'this-is-dynamic'
        ) {
            return [new DynamicPost(new Segment('this-is-inside-dynamic'), [])];
        }

        return [];
    }

    getAttachmentsOfPost(post: Post): DynamicAttachment[] {
        if (
            post
                .getUrl()
                .getLastSegment()
                ?.getSegment() === 'this-is-dynamic'
        ) {
            return [new DynamicAttachment(new Segment('dynamic-attachment'), [])];
        }

        if (
            post
                .getUrl()
                .getLastSegment()
                ?.getSegment() === 'this-is-inside-dynamic'
        ) {
            return [new DynamicAttachment(new Segment('deep-dynamic-attachment'), [])];
        }

        return [];
    }

    hasScope(scope: PluginScope): boolean {
        return scope === PluginScope.DynamicNodePlugin;
    }
}

describe('NodeFinder', () => {
    const rootDirectory = new Path('root');
    const pathValidator = new PathValidator(rootDirectory);
    const nodeProvider = new NodeProvider(pathValidator);
    const pluginHolder = new PluginHolder();
    const nodeFinder = new NodeFinder(rootDirectory, pathValidator, nodeProvider, pluginHolder);

    pluginHolder.addPlugin(new ExamplePlugin());
    pluginHolder.addPlugin(new IdentitySegmentVoter());
    pluginHolder.addPlugin(new NumberedSegmentVoter());
    pluginHolder.addPlugin(new PrivateNodes());

    it('should find the root post', () => {
        expect(nodeFinder.findRootPost()?.getPath()).toEqual(rootDirectory);
    });

    it('should find the children of the root post', () => {
        const rootPost = nodeFinder.findRootPost();
        const posts = nodeFinder.findPostsAt(rootPost);

        expect(posts.count()).toBe(2);
        expect(posts.map(post => post.getPath())).toEqual([
            rootDirectory.appendSegment('emptyFolder'),
            rootDirectory.appendSegment('folderWithFile'),
        ]);
    });

    it('should find a single post', () => {
        const rootPost = nodeFinder.findRootPost();
        const child = nodeFinder.findPostAtUrl(new Url('emptyFolder'));

        expect(child !== null).toBeTruthy();

        if (child === null) {
            return;
        }

        expect(nodeFinder.findPostAtUrl(new Url('/'))).toEqual(rootPost);
        expect(rootPost?.getParent()).toBeNull();
        expect(child?.getParent()?.is(rootPost)).toBeTruthy();
        expect(rootPost?.isParentOf(child)).toBeTruthy();
        expect(rootPost?.isParentOf(rootPost)).toBeFalsy();
        expect(rootPost?.isChildOf(child)).toBeFalsy();
        expect(rootPost?.getSiblings().count()).toBe(0);
        expect(child?.isChildOf(rootPost)).toBeTruthy();
        expect(rootPost?.getChildren().contains(child)).toBeTruthy();
        expect(child?.getSiblings().count()).toBe(1);
        expect(rootPost?.getProtectedNames()).toEqual([]);
    });

    it('should find the attachments of a post', () => {
        const rootPost = nodeFinder.findRootPost();
        const attachments = nodeFinder.findAttachmentsAt(rootPost);

        expect(attachments.count()).toBe(1);
        expect(attachments.map(attachment => attachment.getPath())).toEqual([new Path('root/file')]);
        expect(rootPost?.getAttachments()).toEqual(attachments);

        const first = attachments.first();

        expect(first !== null).toBeTruthy();

        if (first !== null) {
            expect(rootPost.hasAttachment(first)).toBeTruthy();
        }
    });

    it('should find a single attachment', () => {
        const node = nodeFinder.findRootPost();
        const attachment = nodeFinder.findAttachmentAtUrl(new Url('file'));

        expect(attachment?.getPath()).toEqual(new Path('root/file'));
        expect(attachment?.getPost().is(node)).toBeTruthy();
        expect(attachment?.isAttachmentOf(node)).toBeTruthy();
    });

    it('should find a node using a URL', () => {
        const url = new Url('/');
        const otherUrl = new Url('folderWithFile/otherFile');
        const notFound = new Url('emptyFolder/not-found');

        const node = nodeFinder.findNodeAtUrl(url);
        const otherNode = nodeFinder.findNodeAtUrl(otherUrl);
        const notFoundNode = nodeFinder.findNodeAtUrl(notFound);

        expect(notFoundNode).toBeNull();
        expect(node === null).toBeFalsy();
        expect(otherNode === null).toBeFalsy();
    });

    it('should find a dynamic post', () => {
        const emptyFolder = nodeFinder.findPostAtUrl(new Url('emptyFolder'));

        expect(emptyFolder !== null).toBeTruthy();

        if (emptyFolder === null) {
            return;
        }

        const children = emptyFolder.getChildren();

        expect(children.count()).toBe(1);

        const child = children.first();

        expect(child !== null).toBeTruthy();

        if (child !== null) {
            expect(child.isDynamic()).toBeTruthy();
        }

        const dynamicPost = nodeFinder.findNodeAtUrl(new Url('emptyFolder/this-is-dynamic'));
        const deepDynamicPost = nodeFinder.findNodeAtUrl(new Url('emptyFolder/this-is-dynamic/this-is-inside-dynamic'));

        expect(deepDynamicPost !== null).toBeTruthy();
        expect(dynamicPost !== null).toBeTruthy();

        if (child !== null) {
            expect(dynamicPost?.is(child)).toBeTruthy();
        }

        if (
            dynamicPost !== null &&
            deepDynamicPost !== null &&
            Post.isPost(dynamicPost) &&
            Post.isPost(deepDynamicPost)
        ) {
            expect(deepDynamicPost.isChildOf(dynamicPost));
        }
    });

    it('should find a dynamic attachment', () => {
        const attachment = nodeFinder.findNodeAtUrl(new Url('emptyFolder/this-is-dynamic/dynamic-attachment'));
        const deepAttachment = nodeFinder.findNodeAtUrl(
            new Url('emptyFolder/this-is-dynamic/this-is-inside-dynamic/deep-dynamic-attachment'),
        );

        expect(attachment !== null).toBeTruthy();
        expect(deepAttachment !== null).toBeTruthy();
    });

    it('should ignore numbers in the beginning of the folder name', () => {
        const post = nodeFinder.findPostAtUrl(new Url('/folderWithFile/folderWithNumber'));

        expect(post !== null).toBeTruthy();
        expect(post?.getUrl().getUrl()).toBe('/folderWithFile/folderWithNumber');
        expect(post?.getPath().getPath()).toBe('root/folderWithFile/1. folderWithNumber');
    });

    it('should hide private nodes', () => {
        const privateAttachment = nodeFinder.findAttachmentAtUrl(new Url('/folderWithFile/_privateFile'));
        const privateDeepAttachment = nodeFinder.findAttachmentAtUrl(
            new Url('/folderWithFile/__privatePath/unreachable'),
        );
        const privatePost = nodeFinder.findPostAtUrl(new Url('/folderWithFile/__privatePath'));
        const otherPrivatePost = nodeFinder.findPostAtUrl(new Url('/folderWithFile/_privatePathWithReachableChild'));
        const publicAttachmentInPrivatePost = nodeFinder.findAttachmentAtUrl(
            new Url('/folderWithFile/_privatePathWithReachableChild/reachable'),
        );

        expect(privateAttachment).toBeNull();
        expect(privateDeepAttachment).toBeNull();
        expect(privatePost).toBeNull();
        expect(otherPrivatePost).toBeNull();
        expect(publicAttachmentInPrivatePost !== null).toBeTruthy();
    });
});

afterAll(mock.restore);
