import 'reflect-metadata'
import { Container } from 'inversify'
import { PrimService } from './PrimService'
import { IDirectoryValidator } from './directory/IDirectoryValidator'
import { TYPES } from './types'
import { DirectoryValidator } from './directory/DirectoryValidator'
import { IPrim } from './IPrim'

export class Prim {
  static create(path: string): IPrim {
    const container = new Container()
    container.bind<string>(TYPES.Path).toConstantValue(path)
    container
      .bind<IPrim>(TYPES.Prim)
      .to(PrimService)
      .inSingletonScope()
    container.bind<IDirectoryValidator>(TYPES.DirectoryValidator).to(DirectoryValidator)

    return container.get<IPrim>(TYPES.Prim)
  }
}
