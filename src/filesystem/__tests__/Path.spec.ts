import { Path } from '../Path';

describe('Path', () => {
  const path = new Path('some/path');

  it('should get the path with a prefix', () => {
    expect(path.getPath(new Path('prefix'))).toBe('prefix/some/path');
  });

  it('should append a segment', () => {
    expect(path.appendSegment('segment').getPath()).toBe('some/path/segment');
  });

  it('should remove last segment', () => {
    expect(path.removeLastSegment().getPath()).toBe('some');
  });
});
