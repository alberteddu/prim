import mock from 'mock-fs';
import { PluginHolder } from '../../extend/PluginHolder';
import { PathValidator } from '../../filesystem/PathValidator';
import { Attachment } from '../Attachment';
import { NodeProvider } from '../NodeProvider';
import { NodeFinder } from '../../finder/NodeFinder';
import { Property } from '../../property/Property';
import { Path } from '../../filesystem/Path';
import { Url } from '../../url/Url';

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
    const pluginHolder = new PluginHolder();
    const nodeFinder = new NodeFinder(rootDirectory, pathValidator, nodeProvider, pluginHolder);

    it('should create an attachment', () => {
        const attachmentWithoutProperty = new Attachment(
            new Url('folder/file'),
            new Path('root/folder/file'),
            false,
            [],
            nodeFinder,
        );
        const attachment = new Attachment(
            new Url('folder/file'),
            new Path('root/folder/file'),
            false,
            [new Property('extension', 'txt')],
            nodeFinder,
        );

        expect(attachmentWithoutProperty.getProperty('extension').getValue()).toBeNull();
        expect(attachment.getProperty('extension').getValue()).toBe('txt');
    });
});

afterAll(mock.restore);
