import React, { useState } from 'react';
import { Text } from 'react-native';

import { Layout } from '../../../../ui/atoms';

export const ApiDetails: React.FC<{ pathname: string; origin: string }> = ({
  origin,
}) => {
  const {} = useState(origin);
  return (
    <Layout.Cal>
      <Text>Endpoint</Text>
      <Layout.Row />
    </Layout.Cal>
  );
};
