import React from 'react';
import type { TTabBarButtonProps } from './TabBarButton';

export const Tab: React.FC<Omit<TTabBarButtonProps, 'onPress'>> = ({
  children,
}) => <>{children}</>;
