import { HighlighSearchPipe } from './highligh-search.pipe';

describe('HighlighSearchPipe', () => {
  let pipe: HighlighSearchPipe;

  beforeEach(() => {
    pipe = new HighlighSearchPipe();
  });

  it('should return empty array if value is undefined', () => {
    expect(pipe.transform(undefined, 'test')).toEqual([]);
  });

  it('should return empty array if value is null', () => {
    expect(pipe.transform(null, 'test')).toEqual([]);
  });

  it('should return the original value if searchText is undefined', () => {
    const value = 'This is a test string';
    expect(pipe.transform(value, '')).toBe(value);
  });

  it('should return the original value if searchText is null', () => {
    const value = 'This is a test string';
    expect(pipe.transform(value, '')).toBe(value);
  });

  it('should highlight the searchText within the value', () => {
    const value = 'This is a test string';
    const searchText = 'test';
    const expectedOutput =
      "This is a <div style='color:red!important' class='yellow d-inline-flex fs-12px' > test</div> string";
    expect(pipe.transform(value, searchText)).toBe(expectedOutput);
  });

  it('should be case insensitive when highlighting searchText', () => {
    const value = 'This is a Test string';
    const searchText = 'test';
    const expectedOutput =
      "This is a <div style='color:red!important' class='yellow d-inline-flex fs-12px' > Test</div> string";
    expect(pipe.transform(value, searchText)).toBe(expectedOutput);
  });

  it('should replace multiple occurrences of searchText', () => {
    const value = 'Test test testing highlighting test cases';
    const searchText = 'test';
    const expectedOutput =
      "<div style='color:red!important' class='yellow d-inline-flex fs-12px' > Test</div> <div style='color:red!important' class='yellow d-inline-flex fs-12px' > test</div> testing highlighting <div style='color:red!important' class='yellow d-inline-flex fs-12px' > test</div> cases";
    expect(pipe.transform(value, searchText)).toBe(expectedOutput);
  });

  it('should return an empty string if searchText matches entire value and replace it', () => {
    const value = 'test';
    const searchText = 'test';
    const expectedOutput =
      "<div style='color:red!important' class='yellow d-inline-flex fs-12px' > test</div>";
    expect(pipe.transform(value, searchText)).toBe(expectedOutput);
  });

  it('should not alter the value if searchText does not match', () => {
    const value = 'This is a sample string';
    const searchText = 'nonexistent';
    expect(pipe.transform(value, searchText)).toBe(value);
  });

  it('should highlight searchText when it appears at the start of the value', () => {
    const value = 'test is at the start';
    const searchText = 'test';
    const expectedOutput =
      "<div style='color:red!important' class='yellow d-inline-flex fs-12px' > test</div> is at the start";
    expect(pipe.transform(value, searchText)).toBe(expectedOutput);
  });

  it('should highlight searchText when it appears at the end of the value', () => {
    const value = 'Ending with test';
    const searchText = 'test';
    const expectedOutput =
      "Ending with <div style='color:red!important' class='yellow d-inline-flex fs-12px' > test</div>";
    expect(pipe.transform(value, searchText)).toBe(expectedOutput);
  });
});
