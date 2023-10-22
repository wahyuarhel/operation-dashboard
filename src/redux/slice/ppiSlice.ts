import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AccountPpiType,
  UserAnswerType,
  UserAnswerDetailType
} from 'graphql/generated/types';
import {
  getPpiSnapshotsAction,
  getPpiQuestionsAction
} from 'redux/action/ppiAction';
import { ppiSnapshots, ppiQuestions } from 'types/ppi_types';

type InitialState = {
  loading: boolean;
  error: string;
  message: string;
  ppiSnapshots: ppiSnapshots | {};
  ppiQuestions: ppiQuestions[] | [];
  ppiAccount: AccountPpiType;
  ppiAnswers: UserAnswerType[];
  ppiAnswersDetail: UserAnswerDetailType[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  message: '',
  ppiSnapshots: {},
  ppiQuestions: [],
  ppiAccount: {} as AccountPpiType,
  ppiAnswers: [] as UserAnswerType[],
  ppiAnswersDetail: [] as UserAnswerDetailType[]
};

const ppiSlice = createSlice({
  name: 'PPI',
  initialState,
  reducers: {
    setPpiAccount: (state, action) => {
      state.ppiAccount = action.payload;
    },
    setPpiAnswers: (state, action) => {
      state.ppiAnswers = action.payload;
    },
    setPpiAnswersDetail: (state, action) => {
      state.ppiAnswersDetail = action.payload;
    },
    resetPpiAnswers: state => {
      state.ppiAnswersDetail = [] as UserAnswerDetailType[];
    }
  },
  extraReducers: builder => {
    builder.addCase(getPpiSnapshotsAction.pending, (state, action) => {
      return {
        ...state,
        loading: true
      };
    });

    builder.addCase(getPpiSnapshotsAction.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        ppiSnapshots: action.payload
      };
    });

    builder.addCase(getPpiSnapshotsAction.rejected, (state, action) => {
      return {
        ...state,
        loading: false
      };
    });

    builder.addCase(getPpiQuestionsAction.pending, (state, action) => {
      return {
        ...state,
        loading: true
      };
    });

    builder.addCase(getPpiQuestionsAction.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        ppiQuestions: action.payload
      };
    });

    builder.addCase(getPpiQuestionsAction.rejected, (state, action) => {
      return {
        ...state,
        loading: false
      };
    });
  }
});

export const {
  setPpiAccount,
  setPpiAnswers,
  setPpiAnswersDetail,
  resetPpiAnswers
} = ppiSlice.actions;
export default ppiSlice.reducer;
