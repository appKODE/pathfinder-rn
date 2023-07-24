import { parseQueryString } from '../parse-query-string';

describe('Tests for parse-query-string', () => {
  it('Should correct parse query string to object', () => {
    expect(parseQueryString('code=200,example=success')).toStrictEqual({
      code: '200',
      example: 'success',
    });
  });

  it('Should correct parse query string with spaces to object', () => {
    expect(parseQueryString(' code=200, example=success ')).toStrictEqual({
      code: '200',
      example: 'success',
    });
  });
});
