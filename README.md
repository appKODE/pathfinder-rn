# :construction: :construction: :construction: THIS PROJECT HAS EXPERIMENTAL STATUS, DON'T USE IT :construction: :construction: :construction:

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license" />
  </a>
  <a href="https://npmjs.org/package/@kode-frontend/pathfinder-rn">
    <img src="http://img.shields.io/npm/v/@kode-frontend/pathfinder-rn.svg" alt="Current npm package version" />
  </a>
  <a href="https://npmjs.org/package/@kode-frontend/pathfinder-rn">
    <img src="http://img.shields.io/npm/dm/@kode-frontend/pathfinder-rn.svg" alt="Downloads" />
  </a>
  <a href="https://npmjs.org/package/@kode-frontend/pathfinder-rn">
    <img src="http://img.shields.io/npm/dt/@kode-frontend/pathfinder-rn.svg?label=total%20downloads" alt="Total downloads" />
  </a>
</p>

# pathfinder-rn

This is a library for integrating a pathfinder into your application.
The library is easy to integrate into an existing project and does not require any further development.
## Installation

```sh
yarn add @kode-frontend/pathfinder-rn
```

## Usage

```js
import {
  createPathfinder,
  PathfinderConfiguration,
} from '@kode-frontend/pathfinder-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import petstore from '../petstore.json';
import users from '../users.json';

const config = PathfinderConfiguration
  // create pathfinder configuration with default settings for mock server
  // default mock server settings are optional
  .create({
    domain: 'https://127.0.0.1:3100',
    headers: {
      Accept: 'application/json',
    },
    queryParams: {
      __dynamic: false,
    },
  })
  // add specification
  .addScheme({
    name: 'petstore',
    specification: petstore,
  })
  .addScheme({
    name: 'users',
    specification: users,
    // if needed set specific mock server settings for scheme
    // optional
    server: {
      domain: 'https://1.1.1.1/some/path',
      headers: {
        Accept: 'application/json',
      },
      queryParams: {
        __dynamic: false,
      },
    },
  });

// creating native pathfinder component
const Pathfinder = createPathfinder(config, AsyncStorage);

export default function App() {
  const [environment, setEnvironment] = React.useState('dev');
  return (
    <Pathfinder
      initialEnvironment={environment}
      environments={['dev', 'prod']}
      onChangeEnvironment={setEnvironment}
      devMode
      autostartForDev
    >
    	<YourApp />
    </Pathfinder>
  );
}

```

## Props

| prop name           | type                  | description                                                            |
| ------------------- | --------------------- | ---------------------------------------------------------------------- |
| initialEnvironment  | string                | Initial environments, should be static (required)                      |
| environments        | string[]              | List of environments (required)                                        |
| devMode             | boolean               | Allows you to output information for developers to the console         |
| autostartForDev     | boolean               | Launches the `pathfinder` when the application is launched in dev mode |



## Toggle devtools with Deep Links

- `open` - \<prefix\>://pathfinder/open
- `close` - \<prefix\>://pathfinder/close

## Tags

`release` - create release tag and increase version


