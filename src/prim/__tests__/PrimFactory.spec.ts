import mock from 'mock-fs';
import { PrimFactory } from '../PrimFactory';
import { NodeType } from '../../node/NodeType';
import { InvalidPath } from '../../error/InvalidPath';
import { Path } from '../../filesystem/Path';
import { Url } from '../../url/Url';

const invalidPath = 'hello';

describe('PrimFactory::create', () => {
    mock({
        empty: {},
        full: {
            'some-file': 'Some contents',
        },
    });

    const prim = PrimFactory.createFromPath('empty');
    const otherPrim = PrimFactory.createFromPath('full');

    it('should throw on invalid paths', () => {
        const instanceCreation = () => {
            PrimFactory.createFromPath(invalidPath);
        };
        expect(instanceCreation).toThrowError(new InvalidPath(new Path(invalidPath)));
    });

    it('should create an instance for valid paths', () => {
        expect(prim.getRootDirectory().getPath()).toBe('empty');
        expect(otherPrim.getRootDirectory().getPath()).toBe('full');
    });

    it('should get nodes', () => {
        const post = prim.get('/');
        const notFound = prim.get(new Url('/nothing'));
        const file = otherPrim.get('/some-file');

        expect(post === null).toBeFalsy();
        expect(post?.getNodeType()).toBe(NodeType.Post);
        expect(notFound).toBeNull();
        expect(file?.getNodeType()).toBe(NodeType.Attachment);
    });
});

afterAll(mock.restore);
