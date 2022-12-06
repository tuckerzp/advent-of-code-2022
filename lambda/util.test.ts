import { splitToLines } from './util';

describe('splitToLines', () => {
  it('splits a multiline string', () => {
    expect(splitToLines('a\nb')).toStrictEqual(['a', 'b']);
  });
  it('removes whitespace from lines', () => {
    expect(splitToLines(' a \n b   \n c')).toStrictEqual(['a', 'b', 'c']);
  });
  it('returns an empty list for an empty string', () => {
    expect(splitToLines('')).toStrictEqual([]);
  });
  it('removes empty lines', () => {
    expect(splitToLines('a\n\n\n\nb\n')).toStrictEqual(['a', 'b']);
  });
  it('supports alternate separators', () => {
    expect(splitToLines('aAAbAAcAAd', { separator: 'AA' })).toStrictEqual(['a', 'b', 'c', 'd']);
  });
  it('allows keeping empty lines', () => {
    expect(splitToLines('a\n\nb\n', { keepEmptyLines: true })).toStrictEqual(['a', '', 'b', '']);
  });
  it('allows keeping whitespace', () => {
    expect(splitToLines('  a  \n  b  \n  c  ', { keepWhitespaceAtEnd: true }))
      .toStrictEqual(['  a  ', '  b  ', '  c  ']);
  });
});
