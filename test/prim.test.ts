import { Prim } from '../src/Prim'

describe('Prim', () => {
  const prim = Prim.create('hello')

  it('should do stuff', () => {
    expect(prim.getPath()).toBe('hello')
  })
})
