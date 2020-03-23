import {
  PropertyHolder,
  IProperty,
  Property,
  PropertyIsEqual,
  ValueMatchesRegex,
  IPropertyHolderAwareMatch,
  PropertyMatchUnion,
  PropertyMatchIntersection,
  NegateMatch,
} from '../../property';
import { CannotModifyProtectedProperty } from '../../error';
import { IPropertyHolder } from '../IPropertyHolder';

class ConcretePropertyHolder extends PropertyHolder {
  constructor(properties: IProperty[] = []) {
    super(properties);
  }

  getProtectedNames(): string[] {
    return ['example'];
  }
}

class PropertyHolderAwareMatch extends PropertyIsEqual implements IPropertyHolderAwareMatch {
  propertyHolder: IPropertyHolder | null = null;
  setPropertyHolder(propertyHolder: IPropertyHolder) {
    this.propertyHolder = propertyHolder;
  }
}

describe('PropertyHolder', () => {
  const exampleProperty = new Property('example', 'someValue');
  const otherProperty = new Property('otherExample', 'someOtherValue');
  const propertyHolder = new ConcretePropertyHolder();

  it('should set a protected property once', () => {
    propertyHolder.setProperty(exampleProperty);
  });

  it('should a return value for non existing properties', () => {
    const nonExistingWithoutDefault = propertyHolder.getProperty('non-existing');
    expect(nonExistingWithoutDefault.getValue()).toBeNull();
    const nonExistingWithDefault = propertyHolder.getProperty('non-existing', 'something');
    expect(nonExistingWithDefault.getValue()).toBe('something');
  });

  it('should have already a property set', () => {
    expect(
      propertyHolder.hasMatchingProperty(new PropertyHolderAwareMatch(exampleProperty)),
    ).toBeTruthy();
    expect(propertyHolder.propertyExists('example')).toBeTruthy();
    expect(propertyHolder.hasProperty(exampleProperty)).toBeTruthy();
    expect(propertyHolder.getProperty('example').is(exampleProperty));
  });

  it('should match equal properties', () => {
    expect(propertyHolder.matchNameAndValue('example', 'someValue')).toBeTruthy();
    expect(propertyHolder.matchNameAndValue('example', 'otherValue')).toBeFalsy();
    expect(propertyHolder.matchValue('someValue')).toBeTruthy();
  });

  it('should match negated properties', () => {
    expect(
      propertyHolder.hasMatchingProperty(new NegateMatch(new PropertyIsEqual(exampleProperty))),
    ).toBeFalsy();
  });

  it('should match regex properties', () => {
    expect(propertyHolder.matchRegExp(/some*/)).toBeTruthy();
    expect(propertyHolder.matchRegExp(/nonMatching*/)).toBeFalsy();
  });

  it('should match callback properties', () => {
    expect(
      propertyHolder.matchCallback(property => property.getValue() === 'someValue'),
    ).toBeTruthy();
  });

  it('should set a new property', () => {
    expect(propertyHolder.hasProperty(otherProperty)).toBeFalsy();
    propertyHolder.setProperty(otherProperty);
    expect(propertyHolder.hasProperty(otherProperty)).toBeTruthy();
  });

  it('should remove an unprotected property', () => {
    propertyHolder.setProperty(otherProperty);
    expect(propertyHolder.hasProperty(otherProperty)).toBeTruthy();
    propertyHolder.removeProperty(otherProperty.getName());
    expect(propertyHolder.hasProperty(otherProperty)).toBeFalsy();
  });

  it('cannot set a protected property again', () => {
    expect(() => {
      propertyHolder.setProperty(exampleProperty);
    }).toThrowError(new CannotModifyProtectedProperty(exampleProperty.getName()));
  });

  it('should match a property match union', () => {
    const matchingUnion = new PropertyMatchUnion(
      new ValueMatchesRegex(/some/),
      new ValueMatchesRegex(/wrongValue/),
    );
    const nonMatchingUnion = new PropertyMatchUnion(
      new ValueMatchesRegex(/wrongValue/),
      new ValueMatchesRegex(/otherWrongValue/),
    );

    expect(propertyHolder.hasMatchingProperty(matchingUnion)).toBeTruthy();
    expect(propertyHolder.hasMatchingProperty(nonMatchingUnion)).toBeFalsy();
  });

  it('should match a property match intersection', () => {
    const matchingIntersection = new PropertyMatchIntersection(
      new ValueMatchesRegex(/some/),
      new ValueMatchesRegex(/Value/),
    );
    const nonMatchingIntersection = new PropertyMatchIntersection(
      new ValueMatchesRegex(/some/),
      new ValueMatchesRegex(/otherWrongValue/),
    );

    expect(propertyHolder.hasMatchingProperty(matchingIntersection)).toBeTruthy();
    expect(propertyHolder.hasMatchingProperty(nonMatchingIntersection)).toBeFalsy();
  });

  it('should not match regex when property is null', () => {
    const property = new Property('null-property', null);
    const match = new ValueMatchesRegex(/someRegex/);

    expect(match.match(property)).toBeFalsy();
  });
});
