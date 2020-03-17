import { injectable } from 'inversify'
import { IDirectoryValidator } from './IDirectoryValidator'

@injectable()
export class DirectoryValidator implements IDirectoryValidator {
  validate(path: string): void {
    if (path === 'a') {
      throw new Error(`Path ${path} is not valid`)
    }
  }
}
