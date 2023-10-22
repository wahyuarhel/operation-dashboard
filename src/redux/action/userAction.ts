import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import Endpoint, { getAuthorizationHeader } from '../api/dashboardApi';
import {
  LoginParam,
  UserPermission,
  UserPermissionAccess,
  UserPermissionModel,
  UserRole,
  AccountChecklistParam,
  EmploymentInformation,
  PersonalInformation,
  ApprovalParam,
  ResidenceInfo
} from '../../types/user_types';

export const loginAction = createAsyncThunk(
  'login',
  async (user: LoginParam, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(`/users/login/`, user);
      if (response.status === 200) {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        return response.data;
      }
    } catch (e: any) {
      return rejectWithValue(e.response.data.detail);
    }
  }
);

export const refreshTokenAction = createAsyncThunk(
  'refreshTokenAction',
  async (refreshToken: { refresh: string }, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(`/users/refresh/`, refreshToken);
      if (response.status === 200) {
        localStorage.setItem('access', response.data.access);
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsersPermissionAction = createAsyncThunk(
  'getUsersPermissionAction',
  async () => {
    try {
      const response = await Endpoint.get(`/users/permission/`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const getUsersPermissionByIdAction = createAsyncThunk(
  'getUsersPermissionByIdAction',
  async permissionId => {
    try {
      const response = await Endpoint.get(`/users/permission/${permissionId}/`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const createUserPermissionAction = createAsyncThunk(
  'createUserPermissionAction',
  async (permission: UserPermission) => {
    try {
      const response = await Endpoint.post(`/users/permission/`, permission);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const getUsersPermissionAccessAction = createAsyncThunk(
  'getUsersPermissionAccessAction',
  async () => {
    try {
      const response = await Endpoint.get(`/users/permission-access/`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const getUsersPermissionAccessByIdAction = createAsyncThunk(
  'getUsersPermissionAccessByIdAction',
  async accessId => {
    try {
      const response = await Endpoint.get(
        `/users/permission-access/${accessId}/`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const createUserPermissionAccessAction = createAsyncThunk(
  'createUserPermissionAccessAction',
  async (permissionAccess: UserPermissionAccess) => {
    try {
      const response = await Endpoint.post(
        `/users/permission-access/`,
        permissionAccess
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const getUsersPermissionModelAction = createAsyncThunk(
  'getUsersPermissionModelAction',
  async () => {
    try {
      const response = await Endpoint.get(`/users/permission-model/`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const getUsersPermissionModelByIdAction = createAsyncThunk(
  'getUsersPermissionModelByIdAction',
  async permissionModelId => {
    try {
      const response = await Endpoint.get(
        `/users/permission-model/${permissionModelId}/`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const createUserPermissionModelAction = createAsyncThunk(
  'createUserPermissionModelAction',
  async (permissionModel: UserPermissionModel) => {
    try {
      const response = await Endpoint.post(
        `/users/permission-model/`,
        permissionModel
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const getUsersRolesAction = createAsyncThunk(
  'getUsersRolesAction',
  async () => {
    try {
      const response = await Endpoint.get(`/users/roles/`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const createUserRoleAction = createAsyncThunk(
  'createUserRoleAction',
  async (role: UserRole) => {
    try {
      const response = await Endpoint.post(`/users/roles/`, role);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const updateUserPermissionAccessAction = createAsyncThunk(
  'updateUserPermissionAccess',
  async (params: UserPermissionAccess) => {
    try {
      const response = await Endpoint.patch(`/users/permission-access/`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const updateUserPermissionModelAction = createAsyncThunk(
  'updateUserPermissionModelAction',
  async (params: UserPermissionModel) => {
    try {
      const response = await Endpoint.patch(
        `/users/permission-model/${params?.permission_model_id}`,
        params
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const updateUserPermissionAction = createAsyncThunk(
  'updateUserPermissionAction',
  async (params: UserPermission) => {
    try {
      const response = await Endpoint.patch(
        `/users/permission/${params?.permission_id}`,
        params
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const updateUserRoleAction = createAsyncThunk(
  'updateUserRoleAction',
  async (params: UserRole) => {
    try {
      const response = await Endpoint.patch(
        `/users/roles/${params?.role_id}`,
        params
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const deleteUserPermissionAccessAction = createAsyncThunk(
  'deleteUserPermissionAccessAction',
  async (accessId: string) => {
    try {
      const response = await Endpoint.delete(
        `/users/permission-access/${accessId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const deleteUserPermissionModelAction = createAsyncThunk(
  'deleteUserPermissionModelAction',
  async (permissionModelId: string) => {
    try {
      const response = await Endpoint.delete(
        `/users/permission-model/${permissionModelId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const deleteUserPermissionRoleAction = createAsyncThunk(
  'deleteUserPermissionRoleAction',
  async (roleId: string) => {
    try {
      const response = await Endpoint.delete(
        `/users/permission-role/${roleId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const deleteUserPermissionAction = createAsyncThunk(
  'deleteUserPermissionAction',
  async (permissionId: string) => {
    try {
      const response = await Endpoint.delete(
        `/users/permission/${permissionId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const deleteUserRoleAction = createAsyncThunk(
  'deleteUserRoleAction',
  async (responseId: string) => {
    try {
      const response = await Endpoint.delete(`/users/roles/${responseId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  'deleteUserAction',
  async (userId: string) => {
    try {
      const response = await Endpoint.delete(`/users/user-creation/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      return e;
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(`/users/profile/`, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        const isUmsAdmin = response.data?.admin_groups.includes('umsadmin');
        localStorage.setItem('authorized', isUmsAdmin);
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
export const getOnfidoKycDataAction = createAsyncThunk(
  'getOnfidoKycDataAction',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get('user/kyc');
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const getIbKycResultAction = createAsyncThunk(
  'getIbKycResultAction',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get('user/ib');
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const updateUserStatusAction = createAsyncThunk(
  'updateUserStatusAction',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await Endpoint.patch(
        `user/update/${params?.id}`,
        params
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const editUserAction = createAsyncThunk(
  'editUserAction',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await Endpoint.patch(
        `user/update/${params?.id}`,
        params
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);
export const approvalAccountAction = createAsyncThunk(
  'approvalAccountAction',
  async (params: ApprovalParam, { rejectWithValue }) => {
    try {
      const approvalParam = _.pick(params, ['account_approve']);
      const response = await Endpoint.patch(
        `accounts/${params.account_id}/approval/`,
        approvalParam,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.detail || err.response.data.details
      );
    }
  }
);

export const checklistFieldAction = createAsyncThunk(
  'checklistFieldAction',
  async (params: AccountChecklistParam, { rejectWithValue }) => {
    const accountChecklistParam = _.omit(params, ['user_id']);
    try {
      const response = await Endpoint.put(
        `accounts/${params?.user_id}/checklist/`,
        accountChecklistParam,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const getPersonalInformationAction = createAsyncThunk(
  'getPersonalInformationAction',
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(
        `accounts/${accountId}/personal-information/`,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const updatePersonalInformationAction = createAsyncThunk(
  'updatePersonalInformationAction',
  async (params: PersonalInformation, { rejectWithValue }) => {
    const updatePersonalInfo = _.omit(params, 'account_id');
    try {
      const response = await Endpoint.put(
        `accounts/${params?.account_id}/personal-information/`,
        updatePersonalInfo,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.detail || err.response.data.details
      );
    }
  }
);

export const getEmploymentInformationAction = createAsyncThunk(
  'getEmploymentInformationAction',
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(
        `accounts/${accountId}/employment-information/`,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const updateEmploymentInformationAction = createAsyncThunk(
  'updateEmploymentInformationAction',
  async (params: EmploymentInformation, { rejectWithValue }) => {
    const updateEmploymentInfo = _.omit(params, 'account_id');
    try {
      const response = await Endpoint.put(
        `accounts/${params?.account_id}/employment-information/`,
        updateEmploymentInfo,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.detail || err.response.data.details
      );
    }
  }
);

export const upgradeAccountAction = createAsyncThunk(
  'upgradeAccountAction',
  async (params: { account_id: string }, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post('accounts/upgrade/', params, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      const errorMessage =
        err.response.data.detail || err.response.data.details?.account_id[0];
      return rejectWithValue(errorMessage);
    }
  }
);

export const suspendAccountAction = createAsyncThunk(
  'suspendAccountAction',
  async (params: { account_id: string }, { rejectWithValue }) => {
    try {
      const response = await Endpoint.patch('accounts/suspend/', params, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 204) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const postCommentAction = createAsyncThunk(
  'postCommentAction',
  async (
    params: {
      user?: number;
      account_id: number;
      comment?: string;
      note_type: string;
      extra_field?: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Endpoint.post(
        `accounts/${params?.account_id}/comments/`,
        params,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.details || err.response.data.detail
      );
    }
  }
);

export const getCommentAction = createAsyncThunk(
  'getCommentAction',
  async (account_id: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(`accounts/${account_id}/comments/`, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const getAccountChecklistAction = createAsyncThunk(
  'getAccountChecklistAction',
  async (account_id: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(`accounts/${account_id}/checklist/`, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const getAccountDataAction = createAsyncThunk(
  'getAccountDataAction',
  async (account_id: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(`accounts/${account_id}/data/`, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const getOnfidoLivePhotos = createAsyncThunk(
  'getOnfidoLivePhotos',
  async (account_id: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(
        `accounts/onfido/live-photos/${account_id}/`,
        {
          responseType: 'blob',
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return URL.createObjectURL(response.data);
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const reactivateAccountAction = createAsyncThunk(
  'reactivateAccountAction',
  async (params: { account_id: string }, { rejectWithValue }) => {
    try {
      const response = await Endpoint.patch('accounts/reactivate/', params, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 204) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details);
    }
  }
);

export const getOnfidoHKIDList = createAsyncThunk(
  'getOnfidoHKIDList',
  async (account_id: number, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(
        `accounts/onfido/identity-card/${account_id}/`,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const getOnfidoIdentityCardByHKID = createAsyncThunk(
  'getOnfidoIdentityCardByHKID',
  async (params: { account_id: number; hkid: string }, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(
        `accounts/onfido/identity-card/${params.account_id}/${params.hkid}`,
        {
          responseType: 'blob',
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return URL.createObjectURL(response.data);
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const resubmitRequestAction = createAsyncThunk(
  'resubmitRequestAction',
  async (params: { account_id: string }, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(
        `accounts/${params?.account_id}/resubmit-request`,
        params
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const reUploadProofOfAddressAction = createAsyncThunk(
  'reUploadProofOfAddressAction',
  async (
    params: { account_id: string; proof_of_addresses: any },
    { rejectWithValue }
  ) => {
    const proofOfAddress = _.pick(params, ['proof_of_addresses']);
    try {
      const response = await Endpoint.put(
        `accounts/${params?.account_id}/proof-of-address/`,
        proofOfAddress,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const updateLoraAccountAction = createAsyncThunk(
  'updateLoraAccountAction',
  async (
    params: { account_id: string; us_resident: boolean; hk_resident: boolean },
    { rejectWithValue }
  ) => {
    const loraAccount = _.pick(params, ['us_resident', 'hk_resident']);
    try {
      const response = await Endpoint.put(
        `accounts/${params?.account_id}/lora-account`,
        loraAccount
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.detail || err.response.data.details
      );
    }
  }
);

export const updateResidenceInfoAction = createAsyncThunk(
  'updateResidenceInfoAction',
  async (params: ResidenceInfo, { rejectWithValue }) => {
    const residenceInfoParams = _.omit(params, ['account_id']);
    try {
      const response = await Endpoint.put(
        `accounts/${params?.account_id}/residence-info`,
        residenceInfoParams
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.detail || err.response.data.details
      );
    }
  }
);

export const mergeCommentAction = createAsyncThunk(
  'mergeCommentAction',
  async (
    params: {
      account_id: number;
      note_id: number;
      is_approved: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Endpoint.patch(
        `accounts/${params?.account_id}/comments/merge`,
        params,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      const errorDetails = err.response.data.details;
      let error = '';
      if (errorDetails?.non_field_errors) {
        error = errorDetails?.non_field_errors[0];
      } else {
        error = errorDetails;
      }
      return rejectWithValue(err.response.data.detail || error);
    }
  }
);
