import { useCallback, useReducer } from 'react';
import { parseURL } from '../../../utils';

type ApiCall = {
  method: string;
  url: string;
};

const ADD_API_CALL = 'ADD_API_CALL';

type AddApiCallAction = {
  type: typeof ADD_API_CALL;
  payload: ApiCall;
};

type Actions = AddApiCallAction;

const reducer = (state: ApiCall[], action: Actions) => {
  switch (action.type) {
    case ADD_API_CALL: {
      if (
        state.find(
          ({ url, method }) =>
            action.payload.method === method &&
            parseURL(action.payload.url).pathname === parseURL(url).pathname
        )
      ) {
        return state;
      }
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

export function useApiCallsState(): [
  ApiCall[],
  {
    addApiCall: (call: ApiCall) => void;
  }
] {
  const [state, dispatch] = useReducer(reducer, []);

  const addApiCall = useCallback(
    (call: ApiCall) =>
      dispatch({
        type: ADD_API_CALL,
        payload: call,
      }),
    [dispatch]
  );

  return [
    state,
    {
      addApiCall,
    },
  ];
}
