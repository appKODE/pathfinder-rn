import { getQueryParams } from '../utils';

describe('pathfinder utils', function () {
  it('do not mutate url', function () {
    expect(
      getQueryParams('?school_id=59&class_unit_id=403491&__dynamic=false')
    ).toEqual({
      school_id: '59',
      __dynamic: 'false',
      class_unit_id: '403491',
    });
  });
});
