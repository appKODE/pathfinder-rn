import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Pathfinder, { TPathfinderProps } from 'react-native-pathfinder';
import dev from '../dnevnik.dev.json';
import prod from '../dnevnik.prod.json';

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
  enviroment: 'dev',
};

const enviroments: TPathfinderProps['enviroments'] = [
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
];

export default function App() {
  const request = React.useCallback(async () => {
    try {
      const headers = new Headers();
      const result = await fetch(
        'https://dnevnik-dev.mos.ru/mobile/api/profile',
        {
          headers,
        }
      );
      console.log(await result.text());
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Pathfinder
      enviroments={enviroments}
      settings={settings}
      devMode
      autostartForDev
    >
      <View style={styles.container}>
        <Button title="test" onPress={request} />
      </View>
    </Pathfinder>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
