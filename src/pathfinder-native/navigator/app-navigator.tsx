import React from 'react';

import { Assets } from '../assets';
import { Tab, Tabs } from '../features/navigation';
import { HomePage } from '../flows/home';
import { SettingsPage } from '../flows/settings';
import { theme } from '../ui/theme';

export const AppNavigator: React.FC = () => {
  return (
    <Tabs activeColor={theme.colors.foreground.primary}>
      <Tab routeName={'home'} icon={Assets.icons.apiContracts} label="Home">
        <HomePage />
      </Tab>
      <Tab routeName={'settings'} icon={Assets.icons.settings} label="Settings">
        <SettingsPage />
      </Tab>
    </Tabs>
  );
};
