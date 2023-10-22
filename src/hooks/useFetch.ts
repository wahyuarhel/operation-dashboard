import { useReducer, useEffect } from 'react';
import axios from 'axios';

export type TApiResponse = {
  status: number;
  statusText: string;
  data: any;
  error: string;
  loading: boolean;
};

const initialState: TApiResponse = {
  status: 0,
  statusText: '',
  data: null,
  loading: false,
  error: ''
};

enum ReducerActionType {
  PENDING,
  FULFILLED,
  REJECTED
}

type ReducerAction = {
  type: ReducerActionType;
  payload?: any;
  error?: any;
};

const reducer = (state: TApiResponse, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionType.PENDING:
      return {
        ...state,
        loading: true
      };
    case ReducerActionType.FULFILLED:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        status: action.payload.status,
        statusText: action.payload.statusText,
        error: ''
      };
    case ReducerActionType.REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error.message,
        status: action.error.status,
        statusText: action.error.statusText,
        data: null
      };
    default:
      throw new Error('Unidentified reducer action type!');
  }
};

const useFetch = (url: string): TApiResponse => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = async () => {
    dispatch({ type: ReducerActionType.PENDING });
    try {
      const response = await axios.get(url);
      dispatch({ type: ReducerActionType.FULFILLED, payload: response });
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const error = {
          message: e.message,
          status: e.response?.status,
          statusText: e.response?.statusText
        };
        dispatch({ type: ReducerActionType.REJECTED, error });
      }
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  const { data, loading, error, status, statusText } = state;

  return { data, loading, error, status, statusText };
};

export default useFetch;
