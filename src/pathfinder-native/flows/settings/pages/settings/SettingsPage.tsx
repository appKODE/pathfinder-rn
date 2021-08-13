import React from 'react';
import { ScrollView } from 'react-native';

import { MockServerForm } from '../../organisms';
import { Layout } from '../../../../ui/atoms';
import { EnviromentSelector } from '../../../../features/enviroment-selector';
import { ModuleVersion } from '../../molecules';

export const SettingsPage: React.FC = () => {
  return (
    <Layout.Cal flex={1}>
      <EnviromentSelector />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Layout.Cal spacing={2} flex={1}>
          <MockServerForm />
        </Layout.Cal>
        <Layout.Cal spacing={{ bottom: 2 }}>
          <ModuleVersion />
        </Layout.Cal>
      </ScrollView>
    </Layout.Cal>
  );
};
