import { createQueryString } from '../create-query-string';

describe('Tests for create-query-string', () => {
  it('Should correct create query string from object', () => {
    expect(
      createQueryString({
        code: '200',
        example: 'success',
      })
    ).toBe('code=200,example=success');
  });

  it('Should correct create query string from object with empty values', () => {
    expect(
      createQueryString({
        code: '200',
        example: null,
      })
    ).toBe('code=200');
  });
});
