import { IPath } from 'lib/filesystem/IPath';
import { ISegment } from 'lib/url/ISegment';

export interface IUrl {
    getUrl(): string;

    getPath(rootDirectory: IPath): IPath;

    getSegments(): ISegment[];

    removeLastSegment(): IUrl;

    getLastSegment(): ISegment | null;

    hasParent(): boolean;

    appendSegment(segment: ISegment): IUrl;

    toString(): string;

    is(url: IUrl): boolean;
}
