import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  AddBankAccount,
  ApproveTransactionParams,
  CreateTransactionParams,
  MatchTransactionRemittanceParams,
  MoveToTopQueueParams,
  QueueControlParams,
  UpdateExchangeRateParams,
  UpdateTransactionParams,
  UpdateTransactionRemittanceParams,
  UploadRemittance
} from '../../types/transaction_types';
import Endpoint, { getAuthorizationHeader } from '../api/dashboardApi';

export const matchTransactionRemittanceAction = createAsyncThunk(
  'matchTransactionRemittanceAction',
  async (
    remittanceTransaction: MatchTransactionRemittanceParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await Endpoint.post(
        `transactions/remittance/match/`,
        remittanceTransaction,
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

export const updateTransactionRemittanceAction = createAsyncThunk(
  'updateTransactionRemittanceAction',
  async (params: UpdateTransactionRemittanceParams, { rejectWithValue }) => {
    const updateTransactionRemittance = _.pick(params, [
      'account_id',
      'account_number',
      'account_status',
      'fund_type',
      'inputted_amount',
      'proof_file',
      'request_id',
      'status',
      'notes'
    ]);

    try {
      const response = await Endpoint.patch(
        `transactions/remittance/${params.remittance_id}/`,
        updateTransactionRemittance,
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

export const approveTransactionAction = createAsyncThunk(
  'approveTransactionAction',
  async (params: ApproveTransactionParams, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(`transactions/approve/`, params, {
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

export const deleteTransactionAction = createAsyncThunk(
  'deleteTransactionAction',
  async (transactionId: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.delete(`transactions/${transactionId}/`, {
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

export const deleteRemittanceTransactionAction = createAsyncThunk(
  'deleteRemittanceTransactionAction',
  async (remittanceId: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.delete(
        `transactions/remittance/${remittanceId}/`,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      const errorMessage =
        err.response.status === 404 ? err.message : err.response.data.details;
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTransactionAction = createAsyncThunk(
  'updateTransactionAction',
  async (params: UpdateTransactionParams, { rejectWithValue }) => {
    const updateTransaction = _.pick(params, [
      'arrival_time',
      'payment_time',
      'status',
      'proof_of_remittance',
      'notes'
    ]);

    try {
      const response = await Endpoint.patch(
        `transactions/${params.transaction_id}/`,
        updateTransaction,
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

export const createTransactionAction = createAsyncThunk(
  'createTransactionAction',
  async (transaction: CreateTransactionParams, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(`transactions/`, transaction, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const uploadRemittanceAction = createAsyncThunk(
  'uploadRemittanceAction',
  async (uploadRemittanceParams: UploadRemittance, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(
        `transactions/remittance/upload/`,
        uploadRemittanceParams,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const addBankAccountAction = createAsyncThunk(
  'addBankAccountAction',
  async (bank: AddBankAccount, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(`transactions/bank/`, bank, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const updateExchangeRateAction = createAsyncThunk(
  'updateExchangeRateAction',
  async (exchangeRate: UpdateExchangeRateParams, { rejectWithValue }) => {
    try {
      const exchangeRateBody = _.pick(exchangeRate, ['rate', 'spread']);
      const response = await Endpoint.patch(
        `transactions/exchange/${exchangeRate.id}/edit/`,
        exchangeRateBody,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const moveToTopQueueAction = createAsyncThunk(
  'moveToTopQueueAction',
  async (params: MoveToTopQueueParams, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(`transactions/queue/`, params, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const queueControlAction = createAsyncThunk(
  'queueControlAction',
  async (params: QueueControlParams, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(
        `transactions/queue/${params}`,
        params,
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

export const processWithdrawalAction = createAsyncThunk(
  'processWithdrawalAction',
  async (params: { transactions: string[] }, { rejectWithValue }) => {
    try {
      const response = await Endpoint.post(
        `transactions/complete-withdrawal/`,
        params,
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

export const onHoldTransactionAction = createAsyncThunk(
  'onHoldTransactionAction',
  async (
    params: {
      remittance_id?: number;
      transaction_id?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Endpoint.post(`transactions/hold/`, params, {
        headers: { Authorization: getAuthorizationHeader() }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.details.non_field_errors);
    }
  }
);

export const forceMatchTransactionAction = createAsyncThunk(
  'forceMatchTransactionAction',
  async (
    params: {
      remittance_id?: number;
      transaction_id?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Endpoint.post(
        `transactions/force-match/`,
        params,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        const errorMessage = Array.isArray(err.response.data)
          ? err.response.data.toString()
          : err.response.data.detail;
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue(err.response.data.detail);
      }
    }
  }
);

export const needApprovalTransactionAction = createAsyncThunk(
  'needApprovalTransactionAction',
  async (
    params: {
      remittance_id?: number;
      transaction_id?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Endpoint.post(
        `transactions/need-approval/`,
        params,
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

export const completeRefundTransactionAction = createAsyncThunk(
  'completeRefundTransactionAction',
  async (
    params: {
      transaction_id: string;
      transfer_type: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Endpoint.post(
        `transactions/complete-refund`,
        params,
        {
          headers: { Authorization: getAuthorizationHeader() }
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.detail ?? err.message);
    }
  }
);
