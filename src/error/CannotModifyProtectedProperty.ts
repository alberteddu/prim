export class CannotModifyProtectedProperty extends Error {
  constructor(name: string) {
    super(`Cannot modify protected property "${name}"`);
  }
}
