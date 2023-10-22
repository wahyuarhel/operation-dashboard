import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import transactionReducer from '../slice/transactionSlice';
import ppiQuestionReducer from '../slice/ppiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    ppi: ppiQuestionReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
