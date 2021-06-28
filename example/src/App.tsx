import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Pathfinder from 'react-native-pathfinder';

export default function App() {
  const request = React.useCallback(async () => {
    try {
      const result = await fetch(
        'https://webhook.site/52b73816-f2b4-4832-acc4-a945c4ff79af?id=1'
      );
      console.log(await result.text());
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Pathfinder>
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
