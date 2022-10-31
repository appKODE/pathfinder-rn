# :construction: :construction: :construction: THIS PROJECT HAS EXPERIMENTAL STATUS, DON'T USE IT :construction: :construction: :construction:


# pathfinder-rn

This is a library for integrating a pathfinder into your application.
The library is easy to integrate into an existing project and does not require any further development.
## Installation

```sh
yarn add @kode-frontend/pathfinder-rn
```

## Usage

```js
import Pathfinder from 'pathfinder-rn';

import dev from '../petstore.dev.json';

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
  environment: 'dev',
};

const environments: TPathfinderProps['envirnoments'] = [
  {
    name: 'dev',
    scheme: dev,
  },
];

export default function App() {

  return (
    <Pathfinder
      environments={environments}
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

| prop name          | type                  | description                                                            |
| ------------------ | --------------------- | ---------------------------------------------------------------------- |
| enviroments        | TEnviroment[]         | List of OpenAPI specifications and metadata                            |
| settings           | TPathfinderSettings   | Mock server settings and initial state                                 |
| devMode            | boolean               | Allows you to output information for developers to the console         |
| autostartForDev    | boolean               | Launches the `pathfinder` when the application is launched in dev mode |
| onChangeEnviroment | (env: string) => void | Callback changing enviroment                                           |


## Types

```ts

type TEnvironment = {
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
    environment?: string;
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

## Toggle devtools with Deep Links

- `open` - \<prefix\>://pathfinder/open
- `close` - \<prefix\>://pathfinder/close

## Tags

`release` - create release tag and increase version


