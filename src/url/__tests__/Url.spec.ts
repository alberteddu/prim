import { Url } from '../Url';

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
});
