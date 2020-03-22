import { Property } from '../Property';

describe('Property', () => {
  const property = new Property('name', 'value');
  const otherEqualProperty = new Property('name', 'value');
  const sameNameDifferentValue = new Property('name', 'differentValue');
  const differentProperty = new Property('otherName', 'otherValue');

  it('should match an equal property', () => {
    expect(property.is(otherEqualProperty)).toBeTruthy();
  });

  it('should not match a different property', () => {
    expect(property.is(sameNameDifferentValue)).toBeFalsy();
    expect(property.is(differentProperty)).toBeFalsy();
  });
});
