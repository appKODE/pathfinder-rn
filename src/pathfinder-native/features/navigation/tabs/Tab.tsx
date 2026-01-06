import { type PropsWithChildren } from 'react';
import type { TTabBarButtonProps } from './TabBarButton';

type Props = PropsWithChildren<Omit<TTabBarButtonProps, 'onPress'>>;

export const Tab = ({ children }: Props) => <>{children}</>;
