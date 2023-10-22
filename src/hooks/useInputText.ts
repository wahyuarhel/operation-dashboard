import React, { useReducer } from 'react';

export const enum INPUT_REDUCER_ACTION_TYPE {
  SET_VALUE,
  SET_ERROR,
  SET_SHOW
}

type TState = {
  value: any;
  error: string;
  visible: boolean;
};

type TPayload = {
  type: INPUT_REDUCER_ACTION_TYPE;
  payload?: any;
  error?: any;
};

const initialState: TState = {
  value: '',
  error: '',
  visible: false
};

const reducer = (state: TState, action: TPayload) => {
  switch (action.type) {
    case INPUT_REDUCER_ACTION_TYPE.SET_VALUE:
      return {
        ...state,
        value: action.payload,
        visible: true
      };
    case INPUT_REDUCER_ACTION_TYPE.SET_ERROR:
      return {
        ...state,
        error: action?.error
      };
    case INPUT_REDUCER_ACTION_TYPE.SET_SHOW:
      return {
        ...state,
        visible: !state.visible
      };
    default:
      throw new Error('Unidentified reducer action type!');
  }
};

export const useInputText = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { value, error, visible } = state;
  return { value, error, visible, dispatch };
};
