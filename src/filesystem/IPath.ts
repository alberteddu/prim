import { ISegment } from 'lib/url/ISegment';

export interface IPath {
    getPath(prefix?: IPath): string;

    appendSegment(segment: string): IPath;

    removeLastSegment(): IPath;

    join(path: IPath): IPath;

    getLastSegment(): ISegment | null;

    toString(): string;
}
