import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  loginAction,
  getUserProfile,
  checklistFieldAction,
  updateEmploymentInformationAction,
  updatePersonalInformationAction,
  postCommentAction,
  approvalAccountAction,
  suspendAccountAction,
  upgradeAccountAction,
  getCommentAction,
  getAccountChecklistAction,
  getOnfidoLivePhotos,
  getAccountDataAction,
  reactivateAccountAction,
  getOnfidoHKIDList,
  getOnfidoIdentityCardByHKID,
  resubmitRequestAction,
  reUploadProofOfAddressAction,
  updateLoraAccountAction,
  updateResidenceInfoAction,
  mergeCommentAction
} from '../action/userAction';
import {
  LoginResponse,
  UserPermission,
  UserPermissionAccess,
  UserPermissionModel,
  UserRole,
  UserProfile
} from 'types/user_types';
import { Loading, Success, Error } from '../../types/transaction_types';
import {
  AccountChecklistType,
  AccountCommentType,
  AccountType,
  EmploymentInfoType,
  LoraAccountType,
  PersonalInfoType,
  OnfidoKycReportType,
  AccountWithDetailType
} from 'graphql/generated/types';
import { generateCountryCodes } from 'constants/';

const emptyLoading = {
  source: '',
  status: false
};
const emptyErrorMessage = {
  source: '',
  message: ''
};

const emptySuccessMessage = {
  source: '',
  message: ''
};

const sortByDefaultValue = {
  label: 'Status - All',
  value: 'ALL'
};

const defaultAccountChecklist = {
  legalName: false,
  gender: false,
  dob: false,
  idNumber: false,
  address: false,
  occupation: false,
  riskInfo: false
};

type InitialState = {
  loading: Loading;
  error: Error;
  successMessage: Success;
  auth?: LoginResponse;
  permissions?: UserPermission[];
  permission?: UserPermission;
  permissionAccesses?: UserPermissionAccess[];
  permissionAccess?: UserPermissionAccess;
  permissionModels?: UserPermissionModel[];
  permissionModel?: UserPermissionModel;
  roles?: UserRole[];
  role?: UserRole;
  profile: UserProfile;
  authorized: boolean;
  accounts: AccountType[] | [];
  updateAccounts: AccountType[] | [];
  selectedStatus: { label: string; value: string };
  keywordSearch?: string;
  loraAccount: LoraAccountType;
  personalInfo: PersonalInfoType;
  employmentInfo: EmploymentInfoType;
  accountComment: AccountCommentType[];
  accountChecklist: AccountChecklistType;
  kycReports: OnfidoKycReportType[];
  account: AccountWithDetailType;
  accountData: any;
  photoSelfie: string;
  identities: string[];
  document: string;
  countries?: { label: string; value: string }[];
};

const initialState: InitialState = {
  loading: emptyLoading,
  error: emptyErrorMessage,
  successMessage: emptySuccessMessage,
  profile: {} as UserProfile,
  authorized: false,
  accounts: [] as AccountType[],
  updateAccounts: [],
  selectedStatus: sortByDefaultValue,
  loraAccount: {} as LoraAccountType,
  personalInfo: {} as PersonalInfoType,
  employmentInfo: {} as EmploymentInfoType,
  accountComment: [] as AccountCommentType[],
  accountChecklist: defaultAccountChecklist as AccountChecklistType,
  kycReports: [] as OnfidoKycReportType[],
  account: {} as AccountWithDetailType,
  accountData: null,
  photoSelfie: '',
  countries: generateCountryCodes,
  identities: [],
  document: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: () => {},
    resetUserDetailState: state => {
      state.loraAccount = {} as LoraAccountType;
      state.personalInfo = {} as PersonalInfoType;
      state.employmentInfo = {} as EmploymentInfoType;
      state.accountComment = [] as AccountCommentType[];
      state.accountChecklist = defaultAccountChecklist as AccountChecklistType;
      state.account = {} as AccountWithDetailType;
      state.photoSelfie = '';
      state.accountData = null;
      state.identities = [];
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAuthorizedForUMS: (state, action) => {
      state.authorized = true;
    },
    setAccounts: (state, action: PayloadAction<AccountType[]>) => {
      state.accounts = action.payload;
    },
    sortAccounts: (state, action) => {
      state.selectedStatus = action.payload;
      if (state.keywordSearch) {
        if (action.payload.value !== 'ALL') {
          state.updateAccounts = state.accounts!.filter(
            user =>
              user.status === action.payload.value &&
              (user?.fullName
                ?.toString()
                ?.toLowerCase()
                .includes(state.keywordSearch!.toLowerCase()) ||
                user?.email
                  ?.toLowerCase()
                  .includes(state.keywordSearch!.toLowerCase()))
          );
        } else {
          state.updateAccounts = state.accounts!.filter(
            user =>
              user?.fullName
                ?.toString()
                ?.toLowerCase()
                .includes(state.keywordSearch!.toLowerCase()) ||
              user?.email
                ?.toLowerCase()
                .includes(state.keywordSearch!.toLowerCase())
          );
        }
      } else {
        if (action.payload.value !== 'ALL') {
          if (action.payload.value === 'ONBOARDING') {
            state.updateAccounts = state.accounts!.filter(
              user =>
                user.status === action.payload.value ||
                user.status === undefined
            );
          } else {
            state.updateAccounts = state.accounts!.filter(
              user => user.status === action.payload.value
            );
          }
        } else {
          state.updateAccounts = state.accounts;
        }
      }
    },
    filterAccounts: (state, action) => {
      state.keywordSearch = action.payload;
      if (state.selectedStatus.value !== 'ALL') {
        if (state.selectedStatus.value === 'ONBOARDING') {
          state.updateAccounts = state.accounts!.filter(
            user =>
              (user?.fullName
                ?.toString()
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
                user
                  .email!.toLowerCase()
                  .includes(action.payload.toLowerCase())) &&
              (user.status === state.selectedStatus.value ||
                user.status == undefined)
          );
        } else {
          state.updateAccounts = state.accounts!.filter(
            user =>
              (user?.fullName
                ?.toString()
                .toLowerCase()
                .includes(action.payload.toLowerCase()) ||
                user
                  .email!.toLowerCase()
                  .includes(action.payload.toLowerCase())) &&
              user.status === state.selectedStatus.value
          );
        }
      } else {
        state.updateAccounts = state.accounts!.filter(
          user =>
            user?.fullName
              ?.toString()
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            user.email!.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    setClearMessage: state => {
      state.successMessage = emptySuccessMessage;
      state.error = emptyErrorMessage;
    },
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setEmploymentInfo: (state, action) => {
      state.employmentInfo = action.payload;
    },
    setAccountComment: (state, action) => {
      state.accountComment = action.payload;
    },
    setAccountChecklist: (state, action) => {
      state.accountChecklist = action.payload;
    },
    setLoraAccount: (state, action) => {
      state.loraAccount = action.payload;
    },
    setKycReports: (state, action) => {
      state.kycReports = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });
    builder.addCase(
      loginAction.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        const loading: Loading = {
          source: action.type,
          status: false
        };
        return {
          ...state,
          loading
        };
      }
    );
    builder.addCase(loginAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });
    builder.addCase(getUserProfile.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });
    builder.addCase(
      getUserProfile.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        const loading: Loading = {
          source: action.type,
          status: false
        };
        return {
          ...state,
          loading,
          profile: action.payload
        };
      }
    );
    builder.addCase(getUserProfile.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });
    builder.addCase(checklistFieldAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });
    builder.addCase(checklistFieldAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully update checklist!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });
    builder.addCase(checklistFieldAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(
      updatePersonalInformationAction.pending,
      (state, action) => {
        const loading: Loading = {
          source: action.type,
          status: true
        };
        return {
          ...state,
          loading,
          error: emptyErrorMessage
        };
      }
    );

    builder.addCase(
      updatePersonalInformationAction.fulfilled,
      (state, action) => {
        const loading: Loading = {
          source: action.type,
          status: true
        };
        const message: Success = {
          source: action.type,
          message: 'Successfully update Personal Information!'
        };
        return {
          ...state,
          loading,
          successMessage: message
        };
      }
    );

    builder.addCase(
      updatePersonalInformationAction.rejected,
      (state, action) => {
        const loading: Loading = {
          source: action.type,
          status: false
        };
        const error: Error = {
          source: action.type,
          message: action.payload
        };
        return {
          ...state,
          loading,
          error
        };
      }
    );

    builder.addCase(
      updateEmploymentInformationAction.pending,
      (state, action) => {
        const loading: Loading = {
          source: action.type,
          status: true
        };
        return {
          ...state,
          loading,
          error: emptyErrorMessage
        };
      }
    );

    builder.addCase(
      updateEmploymentInformationAction.fulfilled,
      (state, action) => {
        const loading: Loading = {
          source: action.type,
          status: true
        };
        const message: Success = {
          source: action.type,
          message: 'Successfully update Employment Information!'
        };
        return {
          ...state,
          loading,
          successMessage: message
        };
      }
    );

    builder.addCase(
      updateEmploymentInformationAction.rejected,
      (state, action) => {
        const loading: Loading = {
          source: action.type,
          status: false
        };
        const error: Error = {
          source: action.type,
          message: action.payload
        };
        return {
          ...state,
          loading,
          error
        };
      }
    );

    builder.addCase(postCommentAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(postCommentAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully save Notes!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(postCommentAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(approvalAccountAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(approvalAccountAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully approve/reject account!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(approvalAccountAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(suspendAccountAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(suspendAccountAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully Suspended account!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(suspendAccountAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(getCommentAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(getCommentAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        loading,
        comments: action.payload.data
      };
    });

    builder.addCase(getCommentAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(getAccountChecklistAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(getAccountChecklistAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        loading,
        checklist: action.payload.data
      };
    });

    builder.addCase(getAccountChecklistAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(getOnfidoLivePhotos.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(getOnfidoLivePhotos.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        loading,
        photoSelfie: action.payload!
      };
    });

    builder.addCase(getOnfidoLivePhotos.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(getAccountDataAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(getAccountDataAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        loading,
        accountData: action.payload
      };
    });

    builder.addCase(getAccountDataAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(reactivateAccountAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(reactivateAccountAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully Reactivate account!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(reactivateAccountAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(getOnfidoHKIDList.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(getOnfidoHKIDList.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        loading,
        identities: action.payload?.identities
      };
    });

    builder.addCase(getOnfidoHKIDList.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(getOnfidoIdentityCardByHKID.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(getOnfidoIdentityCardByHKID.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        loading,
        document: action.payload!
      };
    });

    builder.addCase(getOnfidoIdentityCardByHKID.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(resubmitRequestAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(resubmitRequestAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: action.payload?.detail
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(resubmitRequestAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(upgradeAccountAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(upgradeAccountAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully approve account!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(upgradeAccountAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(reUploadProofOfAddressAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(reUploadProofOfAddressAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully update proof of address!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(reUploadProofOfAddressAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(updateLoraAccountAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(updateLoraAccountAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully update lora account!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(updateLoraAccountAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(updateResidenceInfoAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(updateResidenceInfoAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully update lora account!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(updateResidenceInfoAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });

    builder.addCase(mergeCommentAction.pending, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loading,
        error: emptyErrorMessage
      };
    });

    builder.addCase(mergeCommentAction.fulfilled, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const message: Success = {
        source: action.type,
        message: 'Successfully merge comment!'
      };
      return {
        ...state,
        loading,
        successMessage: message
      };
    });

    builder.addCase(mergeCommentAction.rejected, (state, action) => {
      const loading: Loading = {
        source: action.type,
        status: false
      };
      const error: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loading,
        error
      };
    });
  }
});
export const {
  resetState,
  resetUserDetailState,
  setAuth,
  setUserProfile,
  setAuthorizedForUMS,
  filterAccounts,
  sortAccounts,
  setAccounts,
  setClearMessage,
  setPersonalInfo,
  setEmploymentInfo,
  setAccountComment,
  setAccountChecklist,
  setLoraAccount,
  setKycReports,
  setAccount,
  setCountries
} = userSlice.actions;
export default userSlice.reducer;
