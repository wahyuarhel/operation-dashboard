import {
  ChangeEvent,
  createContext,
  ReactElement,
  useCallback,
  useReducer
} from 'react';
import { BsGenderAmbiguous } from 'react-icons/bs';
import Icon from '../components/Icons';
import icons from '../constants/icons';
import { EmploymentInformation, PersonalInformation } from 'types/user_types';

type EditUserType = {
  firstName?: string;
  lastName?: string;
  isUSResident?: string;
  isHKResident?: string;
  address?: string;
  nationality?: string;
};

export type ChecklistItemType = {
  icon: JSX.Element;
  label: string;
  checked: boolean;
  key: string;
};

type InitialStateType = {
  notes: string;
  user: EditUserType;
  accountInformationList: ChecklistItemType[];
  totalCheckedAccountInformation: number;
  userEmploymentInformation: EmploymentInformation;
  userPersonalInformation: PersonalInformation;
};

const initialState: InitialStateType = {
  notes: '',
  user: {},
  accountInformationList: [
    {
      icon: <Icon src={icons.legal_name} size={20} />,
      label: 'Legal Name',
      checked: false,
      key: 'legalName'
    },
    {
      icon: <BsGenderAmbiguous size={20} color='#838383' />,
      label: 'Gender',
      checked: false,
      key: 'gender'
    },
    {
      icon: <Icon src={icons.dob} size={20} />,
      label: 'D.O.B',
      checked: false,
      key: 'dob'
    },
    {
      icon: <Icon src={icons.id_number} size={20} />,
      label: 'ID Number',
      checked: false,
      key: 'idNumber'
    },
    {
      icon: <Icon src={icons.address} size={20} />,
      label: 'Address',
      checked: false,
      key: 'address'
    },
    {
      icon: <Icon src={icons.occupation} size={20} />,
      label: 'Occupation',
      checked: false,
      key: 'occupation'
    },
    {
      icon: <Icon src={icons.risk_info} size={20} />,
      label: 'Risk Info',
      checked: false,
      key: 'riskInfo'
    }
  ],
  totalCheckedAccountInformation: 0,
  userEmploymentInformation: {} as EmploymentInformation,
  userPersonalInformation: {} as PersonalInformation
};

const enum REDUCER_ACTION_TYPE {
  EDIT_NOTES,
  EDIT_USER,
  CHECK_LIST,
  RESET_LIST,
  UPDATE_EMPLOYMENT_INFORMATION,
  UPDATE_PERSONAL_INFORMATION,
  RESET_PERSONAL_INFO,
  RESET_EMPLOYMENT_INFO
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: any;
};

const reducer = (state: InitialStateType, action: ReducerAction) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.EDIT_NOTES:
      return {
        ...state,
        notes: action.payload ?? ''
      };
    case REDUCER_ACTION_TYPE.EDIT_USER:
      const editUser = state.user;
      editUser[action.payload.key] = action.payload.value;
      return {
        ...state,
        user: editUser
      };
    case REDUCER_ACTION_TYPE.CHECK_LIST:
      return {
        ...state,
        accountInformationList: action.payload.items,
        totalCheckedAccountInformation: action.payload.total
      };
    case REDUCER_ACTION_TYPE.RESET_LIST:
      return {
        ...state,
        accountInformationList: state.accountInformationList.map(item => {
          item.checked = false;
          return item;
        }),
        totalCheckedAccountInformation: 0
      };
    case REDUCER_ACTION_TYPE.UPDATE_EMPLOYMENT_INFORMATION:
      const userEmploymentInformation = state.userEmploymentInformation;
      userEmploymentInformation[action.payload.key] = action.payload.value;

      return {
        ...state,
        userEmploymentInformation
      };
    case REDUCER_ACTION_TYPE.UPDATE_PERSONAL_INFORMATION:
      const userPersonalInformation = state.userPersonalInformation;
      userPersonalInformation[action.payload.key] = action.payload.value;

      return {
        ...state,
        userPersonalInformation
      };
    case REDUCER_ACTION_TYPE.RESET_PERSONAL_INFO:
      return {
        ...state,
        userPersonalInformation: {}
      };
    case REDUCER_ACTION_TYPE.RESET_EMPLOYMENT_INFO:
      return {
        ...state,
        userEmploymentInformation: {}
      };
    default:
      throw new Error('Unidentified reducer action type!');
  }
};

type EditUserPayload = {
  key: string;
  value: string;
};

const useEditUserContext = (initialState: InitialStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputNotes = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.EDIT_NOTES,
      payload: e.target.value
    });
  }, []);

  const handleEditUser = useCallback((payload: EditUserPayload) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.EDIT_USER,
      payload
    });
  }, []);

  const handleCheckAccountInformation = useCallback(
    (payload: { items: ChecklistItemType[]; total: number }) => {
      dispatch({
        type: REDUCER_ACTION_TYPE.CHECK_LIST,
        payload
      });
    },
    []
  );
  const handleResetAccountInformation = useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.RESET_LIST
    });
  }, []);

  const updateUserEmploymentInformation = useCallback(
    payload =>
      dispatch({
        type: REDUCER_ACTION_TYPE.UPDATE_EMPLOYMENT_INFORMATION,
        payload
      }),
    []
  );

  const updateUserPersonalInformation = useCallback(
    payload =>
      dispatch({
        type: REDUCER_ACTION_TYPE.UPDATE_PERSONAL_INFORMATION,
        payload
      }),
    []
  );

  const resetUserPersonalInformation = useCallback(
    () =>
      dispatch({
        type: REDUCER_ACTION_TYPE.RESET_PERSONAL_INFO
      }),
    []
  );

  const resetUserEmploymentInformation = useCallback(
    () =>
      dispatch({
        type: REDUCER_ACTION_TYPE.RESET_EMPLOYMENT_INFO
      }),
    []
  );

  return {
    state,
    handleInputNotes,
    handleEditUser,
    handleCheckAccountInformation,
    handleResetAccountInformation,
    updateUserEmploymentInformation,
    updateUserPersonalInformation,
    resetUserPersonalInformation,
    resetUserEmploymentInformation
  };
};

type UseUserContextType = ReturnType<typeof useEditUserContext>;

type ChecklistPayloadType = {
  items: ChecklistItemType[];
  total: number;
};

const initContextState: UseUserContextType = {
  state: initialState,
  handleInputNotes: (e: ChangeEvent<HTMLInputElement>) => {},
  handleEditUser: (payload: EditUserPayload) => {},
  handleCheckAccountInformation: (payload: ChecklistPayloadType) => {},
  handleResetAccountInformation: () => {},
  updateUserEmploymentInformation: (payload: EditUserPayload) => {},
  updateUserPersonalInformation: (payload: EditUserPayload) => {},
  resetUserPersonalInformation: () => {},
  resetUserEmploymentInformation: () => {}
};

export const EditUserContext =
  createContext<UseUserContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

export const EditUserProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <EditUserContext.Provider value={useEditUserContext(initialState)}>
      {children}
    </EditUserContext.Provider>
  );
};

export type UseEditUserType = {
  notes: string;
  user: EditUserType;
  accountInformationList: ChecklistItemType[];
  totalCheckedAccountInformation: number;
  userEmploymentInformation: EmploymentInformation;
  userPersonalInformation: PersonalInformation;
  handleInputNotes: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEditUser: (payload: EditUserPayload) => void;
  handleCheckAccountInformation: (payload: ChecklistPayloadType) => void;
  handleResetAccountInformation: () => void;
  updateUserEmploymentInformation: (payload: EditUserPayload) => void;
  updateUserPersonalInformation: (payload: EditUserPayload) => void;
  resetUserPersonalInformation: () => void;
  resetUserEmploymentInformation: () => void;
};
