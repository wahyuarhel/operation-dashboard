import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import Endpoint, { getAuthorizationHeader } from '../api/ppiApi';

export const getPpiSnapshotsAction = createAsyncThunk(
  'getPpiSnapshotsAction',
  async (account_id: string, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(`/user/${account_id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      return rejectWithValue(e.response.data.detail);
    }
  }
);

export const getPpiQuestionsAction = createAsyncThunk(
  'getPpiQuestionsAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Endpoint.get(`/questions`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (e: any) {
      return rejectWithValue(e.response.data.detail);
    }
  }
);
