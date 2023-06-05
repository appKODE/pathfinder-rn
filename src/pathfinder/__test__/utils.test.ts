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
    it.each([
      {
        url: 'https://127.0.0.1:3100/mobile/api/events/1?__dynamic=false',
        template: '/mobile/api/events/{event_item_id}',
      },
      {
        url: 'https://petstore.swagger.io/v2/pet/9223372036854753736?school_id=59&class_unit_id=403491',
        template: '/pet/{petId}',
      },
    ])('must be truthy', ({ url, template }) => {
      expect(compareUrlWithTemplate(url)(template)).toBeTruthy();
    });

    it.each([
      {
        url: 'https://127.0.0.1:3100/mobile/api/events/',
        template: '/mobile/api/events/{event_item_id}',
      },
      {
        url: 'https://petstore.swagger.io/v2/pet/9223372036854753736?school_id=59&class_unit_id=403491',
        template: '/pet',
      },
    ])('must be falsy', ({ url, template }) => {
      expect(compareUrlWithTemplate(url)(template)).toBeFalsy();
    });
  });

  describe('generatePath', function () {
    it('must return valid path', function () {
      expect(
        generatePath(
          '/mobile/api/events/99999999',
          '/mobile/api/events/{event_item_id}',
          {
            pathParameters: {
              event_item_id: '2',
              test: '123',
            },
            queryParameters: {
              __dynamic: String(false),
            },
          }
        )
      ).toEqual('/mobile/api/events/2?__dynamic=false');
    });

    it('must return valid path2', function () {
      expect(
        generatePath(
          '/v2/pet/9223372036854753736?school_id=59&class_unit_id=403491',
          '/pet/{petId}',
          {
            pathParameters: {
              petId: '2',
            },
          }
        )
      ).toEqual('/v2/pet/2');
    });

    it('must return valid path with extra chunks', function () {
      expect(
        generatePath(
          '/test/mobile/api/events/99999999',
          '/mobile/api/events/{event_item_id}',
          {
            pathParameters: {
              event_item_id: '2',
              test: '123',
            },
            queryParameters: {
              __dynamic: String(false),
            },
          }
        )
      ).toEqual('/test/mobile/api/events/2?__dynamic=false');
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

      expect(
        getPathParameters('/v2/pet/9223372036854753736', '/pet/{petId}')
      ).toEqual({
        petId: '9223372036854753736',
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
