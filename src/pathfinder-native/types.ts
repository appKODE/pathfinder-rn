import type { ReactNode } from 'react';

import type { PathfinderSettings } from '../pathfinder-react';
import type { Props as PathfinderPanelProps } from './app';

export type TAsyncStorage = {
  setItem: (key: string, item: string) => Promise<any>;
  getItem: (key: string) => Promise<string | null | undefined>;
};

export type PathfinderProps = PathfinderPanelProps & {
  /**
   * show logs about working pathfinder
   * default: `false`
   */
  devMode: boolean;
  /**
   * initial environment
   */
  initialEnvironment: string;
  /**
   * list of environments
   */
  environments: string[];
  /**
   * initialSettings for pathfinder
   *
   * Example
   * ```
   * {
   *    paths: {
   *      '/pets': {
   *        get: [{
   *          enabledMock: false,
   *          enabled: true,
   *          parameters: [
   *            { name: '__example', in: 'query', value: 'test' },
   *          ],
   *      }
   *    }
   * }
   * ```
   */
  initialSettings?: PathfinderSettings;
  /**
   * pathfinder controller will be shown if set `true`
   * default: `false`
   */
  autostartForDev?: boolean;
  children?: ReactNode | ReactNode[];
  /**
   * Callback for change environment
   * @param env string
   */
  onChangeEnvironment?: (env: string) => void;
};
