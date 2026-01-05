import { useEffect } from 'react';
import { Keyboard, type KeyboardEventName, Platform } from 'react-native';

type TOptions = {
  onOpen: (height: number) => void;
  onClose: () => void;
};

export const useKeyboardEvents = ({ onOpen, onClose }: TOptions) => {
  useEffect(() => {
    const showKeyboardEventName: KeyboardEventName =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideKeyboardEventName: KeyboardEventName =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    const openListener = Keyboard.addListener(showKeyboardEventName, (e) => {
      onOpen(e.endCoordinates.height);
    });

    const closeListener = Keyboard.addListener(hideKeyboardEventName, () => {
      onClose();
    });

    return () => {
      openListener.remove();
      closeListener.remove();
    };
  }, [onOpen, onClose]);
};
