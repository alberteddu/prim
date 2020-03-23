import { normalize } from 'path';
import { IUrl } from './IUrl';
import { IPath, Path } from '../filesystem';

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
}
