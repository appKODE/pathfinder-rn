import { Pathfinder } from '../Pathfinder';
import dev from './dnevnik.dev.json';
import prod from './dnevnik.prod.json';

describe('pathfinder', function () {
  const pathfinder = Pathfinder.create({
    environments: [
      {
        name: 'dev',
        //@ts-ignore
        scheme: dev,
      },
      {
        name: 'prod',
        //@ts-ignore
        scheme: prod,
      },
    ],
    settings: {
      mockServer: {
        dev: {
          domain: 'https://127.0.0.1:3100',
          headers: {
            Accept: 'application/json',
          },
          queryParams: {
            __dynamic: false,
          },
        },
        prod: {
          domain: 'https://127.0.0.1:3100',
          headers: {
            Accept: 'application/json',
          },
          queryParams: {
            __dynamic: false,
          },
        },
      },
      environment: 'dev',
    },
  });

  it('do not mutate url', function () {
    expect(
      pathfinder.resolve({
        url: 'https://dnevnik-dev.mos.ru/mobile/api/events/1',
        method: 'get',
      })
    ).toEqual({
      url: 'https://dnevnik-dev.mos.ru/mobile/api/events/1',
      headers: {},
    });
  });

  it('should getting mock url', function () {
    pathfinder.updateTemplateSettings(
      '/mobile/api/school_info',
      'get',
      (lastState) => ({
        ...lastState,
        enabledMock: true,
        enabled: true,
      })
    );
    expect(
      pathfinder.resolve({
        url: 'https://dnevnik-dev.mos.ru/mobile/api/school_info?school_id=59&class_unit_id=403491',
        method: 'get',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/mobile/api/school_info?school_id=59&class_unit_id=403491&__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });

  it('should getting mock url 2', function () {
    pathfinder.updateTemplateSettings(
      '/mobile/api/events/{event_item_id}',
      'get',
      (lastState) => ({
        ...lastState,
        enabledMock: true,
        enabled: true,
      })
    );
    expect(
      pathfinder.resolve({
        url: 'https://dnevnik-dev.mos.ru/mobile/api/events/1',
        method: 'get',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/mobile/api/events/1?__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });

  it('should getting mock url with new path params', function () {
    pathfinder.updateTemplateSettings(
      '/mobile/api/events/{event_item_id}',
      'get',
      (lastState) => ({
        ...lastState,
        enabledMock: true,
        enabled: true,
        parameters: [{ name: 'event_item_id', in: 'path', value: 2 }],
      })
    );
    expect(
      pathfinder.resolve({
        url: 'https://dnevnik-dev.mos.ru/mobile/api/events/1',
        method: 'get',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/mobile/api/events/2?__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });

  it('should getting mock url with new query params', function () {
    pathfinder.updateTemplateSettings(
      '/mobile/api/events/{event_item_id}',
      'get',
      (lastState) => ({
        ...lastState,
        enabledMock: false,
        enabled: true,
        parameters: [
          { name: '__example', in: 'query', value: 'test' },
          { name: 'event_item_id', in: 'path', value: 3 },
          { name: '__dynamic', in: 'query', value: 'false' },
        ],
      })
    );
    expect(
      pathfinder.resolve({
        url: 'https://dnevnik-dev.mos.ru/mobile/api/events/1',
        method: 'get',
      })
    ).toEqual({
      url: 'https://dnevnik-dev.mos.ru/mobile/api/events/3?__example=test&__dynamic=false',
      headers: {},
    });
  });

  it('reset query params', function () {
    pathfinder.updateTemplateSettings(
      '/mobile/api/events/{event_item_id}',
      'get',
      (lastState) => ({
        ...lastState,
        enabled: true,
        enabledMock: false,
        parameters: [],
      })
    );
    expect(
      pathfinder.resolve({
        url: 'https://dnevnik-dev.mos.ru/mobile/api/events/1',
        method: 'get',
      })
    ).toEqual({
      url: 'https://dnevnik-dev.mos.ru/mobile/api/events/1',
      headers: {},
    });
  });

  it('change environment', function () {
    pathfinder.setEnvironment('prod');
    expect(pathfinder.getAllSettings().environment).toEqual('prod');
  });

  it('should getting mock url for prod', function () {
    pathfinder.updateTemplateSettings(
      '/mobile/api/v1.0/school_info',
      'get',
      (lastState) => ({
        ...lastState,
        enabledMock: true,
        enabled: true,
      })
    );
    expect(
      pathfinder.resolve({
        url: 'https://dnevnik.mos.ru/mobile/api/v1.0/school_info?school_id=7885&class_unit_id=539090',
        method: 'get',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/mobile/api/v1.0/school_info?school_id=7885&class_unit_id=539090&__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });
});
