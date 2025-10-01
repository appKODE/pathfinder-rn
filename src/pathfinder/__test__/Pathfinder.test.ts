import { Pathfinder } from '../pathfinder';
import { PathfinderConfiguration } from '../pathfinder-configuration';
import petstore from './petstore.json';
import users from './users.json';

describe('pathfinder', function () {
  const pathfinderConfiguration = PathfinderConfiguration.create({
    domain: 'https://127.0.0.1:3100/some/path',
    headers: {
      Accept: 'application/json',
    },
    queryParams: {
      __dynamic: false,
    },
  })
    .addScheme({
      name: 'petstore',
      //@ts-ignore
      specification: petstore,
    })
    .addScheme({
      name: 'users',
      //@ts-ignore
      specification: users,
    });

  const pathfinder = Pathfinder.create(pathfinderConfiguration);

  it('do not mutate url', function () {
    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/pet/9223372036854753736',
        method: 'get',
      })
    ).toEqual({
      url: 'https://petstore.swagger.io/v2/pet/9223372036854753736',
      headers: {},
    });
  });

  it('should getting mock url', function () {
    pathfinder.updateTemplateSettings('/pet/{petId}', 'get', (lastState) => ({
      ...lastState,
      enabledMock: true,
      enabled: true,
    }));

    pathfinder.updateTemplateSettings('/pet/list', 'put', (lastState) => ({
      ...lastState,
      enabledMock: true,
      enabled: true,
    }));

    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/pet/9223372036854753736?school_id=59&class_unit_id=403491',
        method: 'get',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/some/path/pet/9223372036854753736?school_id=59&class_unit_id=403491&__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });

    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/pet/list?school_id=59&class_unit_id=403491',
        method: 'put',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/some/path/pet/list?school_id=59&class_unit_id=403491&__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });

  it('should getting mock url for post method', function () {
    pathfinder.updateTemplateSettings('/pet', 'post', (lastState) => ({
      ...lastState,
      enabledMock: true,
      enabled: true,
    }));
    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/pet',
        method: 'post',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/some/path/pet?__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });

  it('should getting mock url with new path params', function () {
    pathfinder.updateTemplateSettings('/pet/{petId}', 'get', (lastState) => ({
      ...lastState,
      enabledMock: true,
      enabled: true,
      parameters: [{ name: 'petId', in: 'path', value: 2 }],
    }));
    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/pet/9223372036854753736?school_id=59&class_unit_id=403491',
        method: 'get',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/some/path/pet/2?school_id=59&class_unit_id=403491&__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });

  it('should getting mock url with new params', function () {
    pathfinder.updateTemplateSettings('/pet/{petId}', 'get', (lastState) => ({
      ...lastState,
      enabledMock: false,
      enabled: true,
      parameters: [
        { name: '__example', in: 'query', value: 'test' },
        { name: 'petId', in: 'path', value: 3 },
        { name: 'school_id', in: 'query', value: 1 },
        { name: '__dynamic', in: 'query', value: 'true' },
        { name: 'Authorization', in: 'header', value: 'Bearer 123' },
      ],
    }));
    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/pet/9223372036854753736?school_id=59&class_unit_id=403491',
        method: 'get',
      })
    ).toEqual({
      url: 'https://petstore.swagger.io/v2/pet/3?school_id=1&class_unit_id=403491&__example=test&__dynamic=true',
      headers: {
        Authorization: 'Bearer 123',
      },
    });
  });

  it('reset query params', function () {
    pathfinder.updateTemplateSettings('/pet/{petId}', 'get', (lastState) => ({
      ...lastState,
      enabled: true,
      enabledMock: false,
      parameters: [],
    }));

    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/pet/9223372036854753736?school_id=59&class_unit_id=403491',
        method: 'get',
      })
    ).toEqual({
      url: 'https://petstore.swagger.io/v2/pet/9223372036854753736?school_id=59&class_unit_id=403491',
      headers: {},
    });
  });

  it('should getting mock url any scheme', function () {
    pathfinder.updateTemplateSettings(
      '/user/{username}',
      'get',
      (lastState) => ({
        ...lastState,
        enabledMock: true,
        enabled: true,
      })
    );
    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/user/test?school_id=59&class_unit_id=403491',
        method: 'get',
      })
    ).toEqual({
      url: 'https://127.0.0.1:3100/some/path/user/test?school_id=59&class_unit_id=403491&__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });

  it('should getting mock with new server', function () {
    pathfinder.updateMockServerSettings('users', (lastState) => ({
      ...lastState,
      domain: 'https://1.1.1.1:8888',
    }));
    expect(
      pathfinder.resolve({
        url: 'https://petstore.swagger.io/v2/user/test?school_id=59&class_unit_id=403491',
        method: 'get',
      })
    ).toEqual({
      url: 'https://1.1.1.1:8888/user/test?school_id=59&class_unit_id=403491&__dynamic=false',
      headers: {
        Accept: 'application/json',
      },
    });
  });
});
