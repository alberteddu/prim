import { normalize } from 'path';
import { IUrl } from './IUrl';
import { ISegment } from './ISegment';
import { Segment } from './Segment';
import { IPath } from '../filesystem/IPath';
import { Path } from '../filesystem/Path';

export class Url implements IUrl {
    constructor(private readonly url: string) {
        this.url = normalize(url);

        if (this.url === '.') {
            this.url = '/';
        }

        if (this.url.length > 1 && this.url.slice(-1) === '/') {
            this.url = this.url.slice(0, -1);
        }

        if (this.url.length > 1 && this.url.slice(0, 1) !== '/') {
            this.url = `/${this.url}`;
        }
    }

    getUrl(): string {
        return this.url;
    }

    getPath(rootDirectory: IPath): IPath {
        return rootDirectory.join(new Path(this.getUrl()));
    }

    getSegments(): ISegment[] {
        return this.getUrl()
            .split('/')
            .map(urlSegment => new Segment(urlSegment))
            .filter(segment => segment.getSegment().length > 0);
    }

    removeLastSegment(): IUrl {
        return Url.fromSegments(...this.getSegments().slice(0, -1));
    }

    getLastSegment(): ISegment | null {
        const segments = this.getSegments();

        if (segments.length === 0) {
            return null;
        }

        return segments[segments.length - 1];
    }

    hasParent(): boolean {
        return this.getSegments().length > 0;
    }

    appendSegment(segment: ISegment): IUrl {
        return Url.fromSegments(...this.getSegments(), segment);
    }

    toString(): string {
        return this.getUrl();
    }

    is(url: IUrl): boolean {
        return this.getUrl() === url.getUrl();
    }

    static fromSegments(...segments: ISegment[]): IUrl {
        return new Url(segments.map(segment => segment.getSegment()).join('/'));
    }
}
