import type { TDeepLinkHandlerParams } from '../types';
import useDeepLink from '../useDeepLink';

type Props = {
  onShownStateChange: (shown: boolean) => void;
};

export const DevtoolsDeeplink = ({ onShownStateChange }: Props) => {
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
    switch (params.mapPath[1].trim()) {
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
