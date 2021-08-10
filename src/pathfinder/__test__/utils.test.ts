import {
  getQueryParams,
  compareUrlWithTemplate,
  generatePath,
  getPathParameters,
  createDomain,
} from '../utils';

describe('pathfinder/utils.tsx', function () {
  describe('getQueryParams', function () {
    it('must parse query params from search', function () {
      expect(
        getQueryParams('?school_id=59&class_unit_id=403491&__dynamic=false')
      ).toEqual({
        school_id: '59',
        __dynamic: 'false',
        class_unit_id: '403491',
      });
    });
  });

  describe('compareUrlWithTemplate', function () {
    it('must return true', function () {
      expect(
        compareUrlWithTemplate(
          'https://127.0.0.1:3100/mobile/api/events/1?__dynamic=false'
        )('/mobile/api/events/{event_item_id}')
      ).toEqual(true);
    });

    it('must return false', function () {
      expect(
        compareUrlWithTemplate('https://127.0.0.1:3100/mobile/api/events/')(
          '/mobile/api/events/{event_item_id}'
        )
      ).toEqual(false);
    });
  });

  describe('generatePath', function () {
    it('must return valid path', function () {
      expect(
        generatePath('/mobile/api/events/{event_item_id}', {
          pathParameters: {
            event_item_id: '2',
            test: '123',
          },
          queryParameters: {
            __dynamic: String(false),
          },
        })
      ).toEqual('/mobile/api/events/2?__dynamic=false');
    });
  });

  describe('getPathParameters', function () {
    it('must return all parameters', function () {
      expect(
        getPathParameters(
          '/mobile/api/events/1',
          '/mobile/api/events/{event_item_id}'
        )
      ).toEqual({
        event_item_id: '1',
      });
    });
  });

  describe('createDomain', function () {
    it('must create valid domain', function () {
      expect(createDomain('https', '127.0.0.1', '3100')).toEqual(
        'https://127.0.0.1:3100'
      );
    });
  });
});
