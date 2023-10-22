import { createContext, ReactElement, useCallback, useReducer } from 'react';

type UserType = {
  name: string;
  userId: number;
  email: string;
  phone: string;
  lastSignIn: string;
  activeSince: string;
  status: string;
  isActive: boolean;
};

type StatusType = {
  label: string;
  value: string;
};

export type ChecklistItemType = {
  icon: JSX.Element;
  label: string;
  checked: boolean;
};

type InitialStateType = {
  searchKeyword: string;
  selectedStatus: StatusType;
  users: UserType[];
};

const initialState: InitialStateType = {
  searchKeyword: '',
  selectedStatus: {
    label: 'Status - All',
    value: 'ALL'
  },
  users: [
    {
      name: 'John Doe',
      userId: 1,
      email: 'johndoe@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'REJECTED IBKR',
      isActive: false
    },
    {
      name: 'Shopia Lu',
      userId: 2,
      email: 'shopialu@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'CONSIDER ONFIDO',
      isActive: false
    },
    {
      name: 'Zhoe Lu',
      userId: 3,
      email: 'zhoelu@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'ONBOARDING',
      isActive: false
    },
    {
      name: 'Bill Gate',
      userId: 4,
      email: 'billgate@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'ONBOARDING',
      isActive: false
    },
    {
      name: 'John Doe',
      userId: 1,
      email: 'johndoe@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'REJECTED IBKR',
      isActive: false
    },
    {
      name: 'Shopia Lu',
      userId: 2,
      email: 'shopialu@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'CLOSED',
      isActive: false
    },
    {
      name: 'Zhoe Lu',
      userId: 3,
      email: 'zhoelu@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'ONBOARDING',
      isActive: false
    },
    {
      name: 'Bill Gate',
      userId: 4,
      email: 'billgate@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'ACTIVE',
      isActive: true
    },
    {
      name: 'John Doe',
      userId: 1,
      email: 'johndoe@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'REJECTED IBKR',
      isActive: false
    },
    {
      name: 'Shopia Lu',
      userId: 2,
      email: 'shopialu@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'CONSIDER ONFIDO',
      isActive: false
    },
    {
      name: 'Zhoe Lu',
      userId: 3,
      email: 'zhoelu@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'ONBOARDING',
      isActive: false
    },
    {
      name: 'Bill Gate',
      userId: 4,
      email: 'billgate@gmail.com',
      phone: '8524234333',
      lastSignIn: '2022-12-28T06:53:58.732188+00:00',
      activeSince: '2021-12-28T06:53:58.732188+00:00',
      status: 'ACTIVE',
      isActive: true
    }
  ]
};

const enum REDUCER_ACTION_TYPE {
  SEARCH_USERS,
  SORT_USERS
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: any;
};

const reducer = (state: InitialStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SEARCH_USERS:
      return {
        ...state,
        users: action.payload.currentUsers.filter(user =>
          user.name.toLowerCase().includes(action.payload.keyword.toLowerCase())
        ),
        searchKeyword: action.payload.keyword
      };
    case REDUCER_ACTION_TYPE.SORT_USERS:
      return {
        ...state,
        users:
          action.payload.status.value !== 'ALL'
            ? action.payload.currentUsers.filter(user =>
                user.status
                  .toLowerCase()
                  .includes(action.payload.status.value.toLowerCase())
              )
            : action.payload.currentUsers,
        selectedStatus: action.payload.status
      };
    default:
      throw new Error('Unidentified reducer action type!');
  }
};

const useUsersContext = (initialState: InitialStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchUsers = useCallback(
    payload => dispatch({ type: REDUCER_ACTION_TYPE.SEARCH_USERS, payload }),
    []
  );

  const sortUsers = useCallback(
    payload => dispatch({ type: REDUCER_ACTION_TYPE.SORT_USERS, payload }),
    []
  );

  return {
    state,
    searchUsers,
    sortUsers
  };
};

type UseUsersContextType = ReturnType<typeof useUsersContext>;

type SearchUserPayload = {
  keyword: string;
  currentUsers: UserType[];
};

type SortUserPayload = {
  status: StatusType;
  currentUsers: UserType[];
};

const initContextState: UseUsersContextType = {
  state: initialState,
  searchUsers: (payload: SearchUserPayload) => {},
  sortUsers: (payload: SortUserPayload) => {}
};

export const UsersContext =
  createContext<UseUsersContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const UsersProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <UsersContext.Provider value={useUsersContext(initialState)}>
      {children}
    </UsersContext.Provider>
  );
};

export type UseUsersHookType = {
  searchKeyword: string;
  selectedStatus: StatusType;
  users: UserType[];
  searchUsers: (payload: SearchUserPayload) => void;
  sortUsers: (payload: SortUserPayload) => void;
};
