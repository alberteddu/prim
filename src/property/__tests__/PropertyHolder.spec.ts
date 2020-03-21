import { PropertyHolder } from '../PropertyHolder';
import { PropertyObject } from '../PropertyObject';
import { IProperty } from '../IProperty';
import { Property } from '../Property';

class ConcretePropertyHolder extends PropertyHolder {
  constructor(properties: IProperty[] = []) {
    super(properties);
  }

  getProtectedNames(): string[] {
    return ['example', 'otherExample'];
  }
}

describe('PropertyHolder', () => {
  const exampleProperty = new Property('example', 'someValue');
  const otherExampleProperty = new Property('otherExample', 'otherValue');
  const propertyHolder = new ConcretePropertyHolder([exampleProperty]);

  it('should have already a property set', () => {
    expect(propertyHolder.getProperty('example').is(exampleProperty));
  });
});
