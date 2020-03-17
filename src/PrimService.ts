import { injectable, inject } from 'inversify'
import { TYPES } from '@prim/types'
import { IDirectoryValidator } from '@prim/directory/IDirectoryValidator'
import { IPrim } from './IPrim'

@injectable()
export class PrimService implements IPrim {
  constructor(
    @inject(TYPES.Path) private readonly path: string,
    @inject(TYPES.DirectoryValidator) private readonly directoryValidator: IDirectoryValidator
  ) {
    this.directoryValidator.validate(path)
  }

  getPath(): string {
    return this.path
  }
}
