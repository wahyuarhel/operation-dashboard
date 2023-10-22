import {
  ChangeEvent,
  createContext,
  ReactElement,
  useCallback,
  useReducer
} from 'react';

type Notification = {
  title: string;
  body: string;
  isOpen: boolean;
};

const enum REDUCER_ACTION_TYPE {
  INPUT_TITLE,
  INPUT_BODY,
  OPEN_NOTIFICATION
}

type reducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: any;
};

const reducer = (state: Notification, action: reducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INPUT_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case REDUCER_ACTION_TYPE.INPUT_BODY:
      return {
        ...state,
        body: action.payload
      };
    case REDUCER_ACTION_TYPE.OPEN_NOTIFICATION:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      throw new Error('Unidentified reducer action type!');
  }
};

const initialState: Notification = {
  title: '',
  body: '',
  isOpen: false
};

export const useNotification = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onInputTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.INPUT_TITLE,
      payload: e.target.value
    });
  }, []);

  const onInputBody = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.INPUT_BODY,
      payload: e.target.value
    });
  }, []);

  const onOpenNotification = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.OPEN_NOTIFICATION
    });
  }, []);
  return {
    state,
    onInputTitle,
    onInputBody,
    onOpenNotification
  };
};
