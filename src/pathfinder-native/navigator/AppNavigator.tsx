import React from 'react';

import { Assets } from '../assets';
import { Tab, Tabs } from '../features/navigation';
import { PathfinderPage } from '../flows/main';
import { SettingsMockServerPage } from '../flows/mock-server';

export const AppNavigator: React.FC = () => {
  return (
    <Tabs>
      <Tab routeName={'home'} icon={Assets.icons.home} label="Home">
        <PathfinderPage />
      </Tab>
      <Tab routeName={'settings'} icon={Assets.icons.settings} label="Settings">
        <SettingsMockServerPage />
      </Tab>
    </Tabs>
  );
};
