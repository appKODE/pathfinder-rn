import React from 'react';
import { ScrollView } from 'react-native';

import { MockServerForm } from '../../organisms';
import { Layout } from '../../../../ui/atoms';
import { EnviromentSelector } from '../../../../features/enviroment-selector';

export const SettingsPage: React.FC = () => {
  return (
    <Layout.Cal>
      <EnviromentSelector />
      <ScrollView>
        <Layout.Cal spacing={2}>
          <MockServerForm />
        </Layout.Cal>
      </ScrollView>
    </Layout.Cal>
  );
};
