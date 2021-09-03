import React from 'react';
import { ScrollView } from 'react-native';

import { MockServerForm } from '../../organisms';
import { Layout } from '../../../../ui/atoms';
import { EnvironmentSelector } from '../../../../features/environment-selector';

export const SettingsPage: React.FC = () => {
  return (
    <Layout.Cal flex={1}>
      <EnvironmentSelector />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Layout.Cal spacing={2} flex={1}>
          <MockServerForm />
        </Layout.Cal>
        <Layout.Cal spacing={{ bottom: 2 }} />
      </ScrollView>
    </Layout.Cal>
  );
};
