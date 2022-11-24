import { Url } from '../Url';
import { Path } from '../../filesystem/Path';

describe('Url', () => {
    it('should normalize the url correctly', () => {
        const mapping: { [inputUrl: string]: string } = {
            '': '/',
            '/': '/',
            'some/url': '/some/url',
            '/some/url': '/some/url',
            'some/url/': '/some/url',
        };

        Object.keys(mapping).forEach(inputUrl => {
            const expectedUrl = mapping[inputUrl];
            const url = new Url(inputUrl);

            expect(url.getUrl()).toBe(expectedUrl);
        });
    });

    it('should make a path', () => {
        const url = new Url('some-url');

        expect(url.getPath(new Path('/test')).getPath()).toBe('/test/some-url');
    });
});
