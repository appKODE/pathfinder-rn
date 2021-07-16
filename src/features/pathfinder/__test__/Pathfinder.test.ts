import { Pathfinder } from '../Pathfinder';
import dev from './dnevnik.dev.json';

describe('pathfinder', function () {
  const pathfinder = Pathfinder.create({
    //@ts-ignore
    scheme: dev,
    settings: {
      mockServer: 'https://127.0.0.1:3100',
      paths: {},
    },
  });

  it('do not mutate url', function () {
    expect(
      pathfinder.getUrl('https://dnevnik-dev.mos.ru/mobile/api/events/1', 'get')
    ).toEqual('https://dnevnik-dev.mos.ru/mobile/api/events/1');
  });

  it('should getting mock url', function () {
    pathfinder.setTemplateSettings(
      '/mobile/api/events/{event_item_id}',
      'get',
      {
        enabledMock: true,
      }
    );
    expect(
      pathfinder.getUrl('https://dnevnik-dev.mos.ru/mobile/api/events/1', 'get')
    ).toEqual('https://127.0.0.1:3100/mobile/api/events/1?__dynamic=false');
  });

  it('should getting mock url with new path params', function () {
    pathfinder.setTemplateSettings(
      '/mobile/api/events/{event_item_id}',
      'get',
      {
        enabledMock: true,
        parameters: [{ name: 'event_item_id', in: 'path', value: 2 }],
      }
    );
    expect(
      pathfinder.getUrl('https://dnevnik-dev.mos.ru/mobile/api/events/1', 'get')
    ).toEqual('https://127.0.0.1:3100/mobile/api/events/2?__dynamic=false');
  });

  it('should getting mock url with new query params', function () {
    pathfinder.setTemplateSettings(
      '/mobile/api/events/{event_item_id}',
      'get',
      {
        enabledMock: false,
        parameters: [
          { name: '__example', in: 'query', value: 'test' },
          { name: 'event_item_id', in: 'path', value: 3 },
          { name: '__dynamic', in: 'query', value: 'false' },
        ],
      }
    );
    expect(
      pathfinder.getUrl('https://dnevnik-dev.mos.ru/mobile/api/events/1', 'get')
    ).toEqual(
      'https://dnevnik-dev.mos.ru/mobile/api/events/3?__example=test&__dynamic=false'
    );
  });
});
