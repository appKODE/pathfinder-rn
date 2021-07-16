import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Pathfinder from 'react-native-pathfinder';
import dev from '../dnevnik.dev.json';

export default function App() {
  const request = React.useCallback(async () => {
    try {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
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
      //@ts-ignore
      scheme={dev}
      settings={{ mockServer: 'http://127.0.0.1:3100', paths: {} }}
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
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
