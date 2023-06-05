import * as React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import {
  createPathfinder,
  PathfinderConfiguration,
} from '@kode-frontend/pathfinder-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import petstore from '../petstore.json';
import users from '../users.json';

const config = PathfinderConfiguration.create({
  domain: 'https://127.0.0.1:3100',
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

const Pathfinder = createPathfinder(config, AsyncStorage);

export default function App() {
  const [environment, setEnvironment] = React.useState('dev');
  const request = React.useCallback(async () => {
    try {
      const headers = new Headers();
      const result = await fetch(
        'https://petstore.swagger.io/v2/pet/9223372036854753736',
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
      initialEnvironment={environment}
      environments={['dev', 'prod']}
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
