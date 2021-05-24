import { existsSync, lstatSync } from 'fs';
import { isAbsolute, relative } from 'path';
import { inject, injectable } from 'inversify';
import { IPathValidator } from 'lib/filesystem/IPathValidator';
import { TYPES } from 'lib/types';
import { IPath } from 'lib/filesystem/IPath';
import { InvalidPath } from 'lib/error/InvalidPath';

@injectable()
export class PathValidator implements IPathValidator {
    constructor(@inject(TYPES.RootDirectory) private readonly rootDirectory: IPath) {}

    validatePath(path: IPath): void {
        if (!this.isValid(path)) {
            this.failPath(path);
        }
    }

    validateDirectory(path: IPath): void {
        this.validatePath(path);

        if (!this.isDirectory(path)) {
            this.failPath(path);
        }
    }

    validateFile(path: IPath): void {
        this.validatePath(path);

        if (!this.isFile(path)) {
            this.failPath(path);
        }
    }

    isValid(path: IPath): boolean {
        return existsSync(path.getPath()) && this.isPathUnderRootDirectory(path.getPath());
    }

    isDirectory(path: IPath): boolean {
        return lstatSync(path.getPath()).isDirectory();
    }

    isFile(path: IPath): boolean {
        return lstatSync(path.getPath()).isFile();
    }

    private isPathUnderRootDirectory(path: string): boolean {
        if (path === this.rootDirectory.getPath()) {
            return true;
        }

        const relativePath = relative(this.rootDirectory.getPath(), path);

        return relativePath.length > 0 && !relativePath.startsWith('..') && !isAbsolute(relativePath);
    }

    private failPath(path: IPath): void {
        throw new InvalidPath(path);
    }
}
