import * as React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Pathfinder, { TPathfinderProps } from 'react-native-pathfinder';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [enviroment, setEnviroment] = React.useState('dev');
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
      asyncStorage={AsyncStorage}
      onChangeEnviroment={setEnviroment}
      devMode
      autostartForDev
    >
      <View style={styles.container}>
        <Text style={styles.label}>Eviroment: {enviroment}</Text>
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
  label: {
    marginVertical: 20,
  },
});
