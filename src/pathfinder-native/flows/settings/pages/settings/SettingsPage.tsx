import React from 'react';
import { ScrollView } from 'react-native';

import { MockServerForm } from '../../organisms';
import { Layout } from '../../../../ui/atoms';

export const SettingsPage: React.FC = () => {
  return (
    <ScrollView>
      <Layout.Cal spacing={{ left: 2, right: 2 }}>
        <MockServerForm />
      </Layout.Cal>
    </ScrollView>
  );
};
