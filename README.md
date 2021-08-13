# react-native-pathfinder

This is a library for integrating a pathfinder into your application.  
The library is easy to integrate into an existing project and does not require any further development.
## Installation

```sh
yarn add git+https://git.appkode.ru/front/react-native-pathfinder
```

## Usage

```js
import BiometryTools from 'react-native-pathfinder';

import dev from '../dnevnik.dev.json';

const settings: TPathfinderProps['settings'] = {
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
  },
  enviroment: 'dev',
};

const enviroments: TPathfinderProps['enviroments'] = [
  {
    name: 'dev',
    scheme: dev,
  },
];

export default function App() {

  return (
    <Pathfinder
      enviroments={enviroments}
      settings={settings}
      devMode
      autostartForDev
    >
    	<YourApp />
    </Pathfinder>
  );
}

```

## Props

| prop name       | type                | description                                                            |
| --------------- | ------------------- | ---------------------------------------------------------------------- |
| enviroments     | TEnviroment[]       | List of OpenAPI specifications and metadata                            |
| settings        | TPathfinderSettings | Mock server settings and initial state                                 |
| devMode         | boolean             | Allows you to output information for developers to the console         |
| autostartForDev | boolean             | Launches the `pathfinder` when the application is launched in dev mode |


## Types

```ts

type TEnviroment = {
    // the unique name of the environment, for example 'prod', 'dev', etc...
    name: string;
    // OpenApi scheme
    scheme: OpenAPIObject;
};

type Template = {
    get?: OpenAPIObject.MethodObject;
    put?: OpenAPIObject.MethodObject;
    post?: OpenAPIObject.MethodObject;
    delete?: OpenAPIObject.MethodObject;
};

type TMockServerSettings = {
    domain?: string;
    headers?: Record<string, string>;
    queryParams?: Record<string, string | number | boolean>;
};

type TPathfinderSettings = {
    // name of environment
    enviroment?: string;
    mockServer?: TMockServerSettings;
    /* {
      ['/profile/{id_profile}']: {
        get: {
          ...
        }
      }
    } */
    paths?: Record<string, Template>;
};

```

## Tags

`release` - create release tag and increase version


