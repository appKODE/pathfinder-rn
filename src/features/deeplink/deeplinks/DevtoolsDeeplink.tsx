import type React from 'react';
import useDeepLink from '../useDeepLink';
import type { TDeepLinkHandlerParams } from '../types';

type Props = {
  onShownStateChange: (shown: boolean) => void;
};

const DevtoolsDeeplink: React.FC<Props> = ({ onShownStateChange }) => {
  const condition = (params: TDeepLinkHandlerParams) => {
    return params.mapPath[0] === 'pathfinder';
  };

  const open = () => {
    onShownStateChange(true);
  };

  const close = () => {
    onShownStateChange(false);
  };

  const execute = (params: TDeepLinkHandlerParams) => {
    switch (params.mapPath[1]) {
      case 'open':
        open();
        break;
      case 'close':
        close();
        break;
    }
  };

  const onReceived = (params: TDeepLinkHandlerParams) => {
    execute(params);
  };

  const onOpened = (params: TDeepLinkHandlerParams) => {
    execute(params);
  };

  useDeepLink({
    condition,
    onReceived,
    onOpened,
  });

  return null;
};

export default DevtoolsDeeplink;
