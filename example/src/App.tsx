import * as React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import Pathfinder, { TPathfinderProps } from '@kode-frontend/pathfinder-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dev from '../petstore.dev.json';
import prod from '../petstore.prod.json';

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
  environment: 'prod',
};

const environments: TPathfinderProps['environments'] = [
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
  const [environment, setEnvironment] = React.useState(settings?.environment);
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
      environments={environments}
      settings={settings}
      asyncStorage={AsyncStorage}
      onChangeEnvironment={setEnvironment}
      devMode
      autostartForDev
    >
      <View style={styles.container}>
        <Text style={styles.label}>Environment: {environment}</Text>
        <Button title="test" onPress={request} />
        <TextInput placeholder="with keyboard" />
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
  label: {
    marginVertical: 20,
  },
});
