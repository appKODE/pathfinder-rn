import React from 'react';
import { ScrollView } from 'react-native';

import { MockServerForm } from '../../organisms';

export const SettingsPage: React.FC = () => {
  return (
    <ScrollView>
      <MockServerForm />
    </ScrollView>
  );
};
