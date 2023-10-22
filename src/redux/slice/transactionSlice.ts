import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'graphql/jsutils/Maybe';
import {
  BankType,
  TransactionActivitiesType,
  RemittanceTypeEdge,
  AccountResponseType,
  EnquiryBalanceAlpacaType,
  EnquiryBalanceDetailType,
  ExchangeRateType,
  ConversionRateType,
  TransactionActivitiesTypeEdge,
  QueueType
} from '../../graphql/generated/types';
import {
  matchTransactionRemittanceAction,
  updateTransactionRemittanceAction,
  approveTransactionAction,
  deleteTransactionAction,
  updateTransactionAction,
  createTransactionAction,
  uploadRemittanceAction,
  deleteRemittanceTransactionAction,
  addBankAccountAction,
  updateExchangeRateAction,
  moveToTopQueueAction,
  queueControlAction,
  processWithdrawalAction,
  onHoldTransactionAction,
  forceMatchTransactionAction,
  needApprovalTransactionAction,
  completeRefundTransactionAction
} from '../action/transactionAction';
import {
  MatchedRemittanceTransactionResponse,
  UpdateRemittanceTransactionResponse,
  UpdateTransactionResponse,
  UploadRemittance,
  Loading,
  Success,
  Error,
  UploadRemittanceResponse,
  MoveToTopQueueParams,
  QueueControlParams
} from '../../types/transaction_types';
import { LoadingOverlayProps } from 'components/LoadingOverlay';
import { AlertMessageProps } from 'components/AlertMessage';

type InitialState = {
  loadingTransaction: Loading;
  errorMessageTransaction: Error;
  successMessageTransaction: Success;
  depositTransactions: TransactionActivitiesTypeEdge[] | [];
  withdrawalTransactions: TransactionActivitiesTypeEdge[] | [];
  otherTransactions: TransactionActivitiesTypeEdge[] | [];
  inQueueDepositTransactions: TransactionActivitiesTypeEdge[] | [];
  actionRequiredDepositTransactions: TransactionActivitiesTypeEdge[] | [];
  completedDepositTransactions: TransactionActivitiesTypeEdge[] | [];
  inQueueWithdrawalTransactions: TransactionActivitiesTypeEdge[] | [];
  actionRequiredWithdrawalTransactions: TransactionActivitiesTypeEdge[] | [];
  returnedWithdrawalTransactions: TransactionActivitiesTypeEdge[] | [];
  waitingApprovalTransactions:
    | Array<RemittanceTypeEdge & TransactionActivitiesTypeEdge>
    | [];
  onHoldTransactions:
    | Array<RemittanceTypeEdge & TransactionActivitiesTypeEdge>
    | [];
  unMatchedTransactions:
    | Array<RemittanceTypeEdge & TransactionActivitiesTypeEdge>
    | [];
  unknownDepositTransactions:
    | Array<RemittanceTypeEdge & TransactionActivitiesTypeEdge>
    | [];
  refundDepositTransactions:
    | Array<RemittanceTypeEdge & TransactionActivitiesTypeEdge>
    | [];
  rejectedWithdrawalTransactions:
    | Array<RemittanceTypeEdge & TransactionActivitiesTypeEdge>
    | [];
  rejectedAndReturnedDepositTransactions:
    | Array<TransactionActivitiesTypeEdge>
    | [];
  returnedTransactions: RemittanceTypeEdge[] | [];
  rejectedTransaction: RemittanceTypeEdge[] | [];
  sentToAlpacaTransactions?: [];
  receivedFromAlpacaTransactions?: [];
  banks: BankType[] | [];
  matchedRemittanceTransaction:
    | Maybe<MatchedRemittanceTransactionResponse>
    | any;
  updatedRemittanceTransaction: UpdateRemittanceTransactionResponse | {};
  updatedTransaction: UpdateTransactionResponse | {};
  hkdEnquiry?: AccountResponseType;
  multiCcyEnquiry?: EnquiryBalanceDetailType;
  firmBalance?: EnquiryBalanceAlpacaType;
  uploadedProofFile: Maybe<UploadRemittanceResponse> | any;
  exchangeRate?: ExchangeRateType;
  allExchangeRates?: ConversionRateType[] | [];
  loadingUploadImg: boolean;
  successUploadImg: boolean;
  moveToTopQueue: MoveToTopQueueParams | {};
  queueControl?: QueueControlParams;
  queue: QueueType;
  isOpenAlpacaRunningLowModal: boolean;
  isOpenDBSRunningLowModal: boolean;
  dbsLora?: string;
  isTransactionLoading: boolean;
  loadingOverlay: LoadingOverlayProps;
  alertMessage: AlertMessageProps;
};

const emptyLoadingTransaction = {
  source: '',
  status: false
};
const emptyErrorMessageTransaction = {
  source: '',
  message: ''
};

const emptySuccessMessageTransaction = {
  source: '',
  message: ''
};

const initialState: InitialState = {
  loadingTransaction: emptyLoadingTransaction,
  errorMessageTransaction: emptyErrorMessageTransaction,
  successMessageTransaction: emptySuccessMessageTransaction,
  depositTransactions: [],
  withdrawalTransactions: [],
  otherTransactions: [],
  inQueueDepositTransactions: [],
  actionRequiredDepositTransactions: [],
  completedDepositTransactions: [],
  waitingApprovalTransactions: [],
  inQueueWithdrawalTransactions: [],
  actionRequiredWithdrawalTransactions: [],
  returnedWithdrawalTransactions: [],
  onHoldTransactions: [],
  unMatchedTransactions: [],
  unknownDepositTransactions: [],
  refundDepositTransactions: [],
  rejectedAndReturnedDepositTransactions: [],
  rejectedWithdrawalTransactions: [],
  returnedTransactions: [],
  rejectedTransaction: [],
  banks: [],
  matchedRemittanceTransaction: {},
  updatedRemittanceTransaction: {},
  updatedTransaction: {},
  uploadedProofFile: {},
  loadingUploadImg: false,
  successUploadImg: false,
  moveToTopQueue: {},
  queue: {},
  isOpenAlpacaRunningLowModal: false,
  isOpenDBSRunningLowModal: false,
  dbsLora: '0',
  isTransactionLoading: false,
  loadingOverlay: {
    active: false,
    placeholder: ''
  },
  alertMessage: {
    isOpen: false
  }
};

const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setDepositTransactions: (state, action) => {
      state.depositTransactions = action.payload;
    },
    setWithdrawalTransactions: (state, action) => {
      state.withdrawalTransactions = action.payload;
    },
    setInQueueDepositTransactions: (state, action) => {
      state.inQueueDepositTransactions = action.payload;
    },
    setActionRequiredDepositTransactions: (state, action) => {
      state.actionRequiredDepositTransactions = action.payload;
    },
    setCompletedDepositTransactions: (state, action) => {
      state.completedDepositTransactions = action.payload;
      state.isTransactionLoading = false;
    },
    setWaitingApprovalTransactions: (state, action) => {
      state.waitingApprovalTransactions = action.payload;
      state.isTransactionLoading = false;
    },
    setIsTransactionLoading: (state, action) => {
      state.isTransactionLoading = action.payload;
    },
    setOnHoldTransactions: (state, action) => {
      state.onHoldTransactions = action.payload;
    },
    setUnMatchedTransactions: (state, action) => {
      state.unMatchedTransactions = action.payload;
    },
    setUnknownDepositTransactions: (state, action) => {
      state.unknownDepositTransactions = action.payload;
    },
    setRefundDepositTransactions: (state, action) => {
      state.refundDepositTransactions = action.payload;
    },
    setRejectedWithdrawalTransactions: (state, action) => {
      state.rejectedWithdrawalTransactions = action.payload;
    },
    setrejectedAndReturnedDepositTransactions: (state, action) => {
      state.rejectedAndReturnedDepositTransactions = action.payload;
    },
    setReturnedTransactions: (state, action) => {
      state.returnedTransactions = action.payload;
    },
    setRejectedTransactions: (state, action) => {
      state.rejectedTransaction = action.payload;
    },
    setInQueueWithdrawalTransactions: (state, action) => {
      state.inQueueWithdrawalTransactions = action.payload;
    },
    setActionRequiredWithdrawalTransactions: (state, action) => {
      state.actionRequiredWithdrawalTransactions = action.payload;
    },
    setReturnedWithdrawalTransactions: (state, action) => {
      state.returnedWithdrawalTransactions = action.payload;
    },
    setSentToAlpacaTransactions: (state, action) => {
      state.sentToAlpacaTransactions = action.payload;
    },
    setReceivedFromAlpacaTransactions: (state, action) => {
      state.receivedFromAlpacaTransactions = action.payload;
    },
    setOtherTransactions: (state, action) => {
      state.otherTransactions = action.payload;
    },
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
    setErrorMessageTransaction: (state, action) => {
      state.errorMessageTransaction = action.payload;
    },
    setSuccessMessageTransaction: (state, action) => {
      state.successMessageTransaction = action.payload;
    },
    setHkdEnquiry: (state, action) => {
      state.hkdEnquiry = action.payload;
    },
    setMultiCcyEnquiry: (state, action) => {
      state.multiCcyEnquiry = action.payload;
    },
    setFirmBalance: (state, action) => {
      state.firmBalance = action.payload;
    },
    setClearMessage: state => {
      state.successMessageTransaction = emptySuccessMessageTransaction;
      state.errorMessageTransaction = emptyErrorMessageTransaction;
    },
    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },
    setAllExchangeRates: (state, action) => {
      state.allExchangeRates = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    setOpenAlpacaRunningLowModal: (state, action) => {
      state.isOpenAlpacaRunningLowModal = action.payload;
    },
    setOpenDBSRunningLowModal: (state, action) => {
      state.isOpenDBSRunningLowModal = action.payload;
    },
    setDbsLora: (state, action) => {
      state.dbsLora = action.payload;
    },
    setLoadingOverlay: (state, action) => {
      state.loadingOverlay = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(
      deleteRemittanceTransactionAction.pending,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: true
        };
        return {
          ...state,
          loadingTransaction,
          errorMessageTransaction: emptyErrorMessageTransaction
        };
      }
    );
    builder.addCase(
      deleteRemittanceTransactionAction.fulfilled,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: false
        };
        const successMessageTransaction: Success = {
          source: action.type,
          message: action.payload.detail
        };
        return {
          ...state,
          loadingTransaction,
          successMessageTransaction
        };
      }
    );
    builder.addCase(
      deleteRemittanceTransactionAction.rejected,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: false
        };
        const errorMessageTransaction: Error = {
          source: action.type,
          message: action.payload
        };
        return {
          ...state,
          loadingTransaction,
          errorMessageTransaction
        };
      }
    );
    builder.addCase(deleteTransactionAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction: emptyErrorMessageTransaction
      };
    });
    builder.addCase(deleteTransactionAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const successMessageTransaction: Success = {
        source: action.type,
        message: 'Successfully delete transaction!'
      };
      return {
        ...state,
        loadingTransaction,
        successMessageTransaction
      };
    });
    builder.addCase(deleteTransactionAction.rejected, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction
      };
    });
    builder.addCase(
      matchTransactionRemittanceAction.pending,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: true
        };
        return {
          ...state,
          loadingTransaction,
          errorMessageTransaction: emptyErrorMessageTransaction
        };
      }
    );
    builder.addCase(
      matchTransactionRemittanceAction.fulfilled,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: false
        };
        const successMessageTransaction: Success = {
          source: action.type,
          message: 'Successfully Matching remittance transaction!'
        };
        return {
          ...state,
          loadingTransaction,
          matchedRemittanceTransaction: action.payload,
          successMessageTransaction
        };
      }
    );
    builder.addCase(
      matchTransactionRemittanceAction.rejected,
      (state, action) => {
        const errorMessageTransaction: Error = {
          source: action.type,
          message: action.payload
        };
        const loadingTransaction: Loading = {
          source: action.type,
          status: false
        };
        return {
          ...state,
          loadingTransaction,
          errorMessageTransaction
        };
      }
    );
    builder.addCase(approveTransactionAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction: emptyErrorMessageTransaction
      };
    });
    builder.addCase(approveTransactionAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        loadingTransaction
      };
    });
    builder.addCase(approveTransactionAction.rejected, (state, action) => {
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction
      };
    });
    builder.addCase(
      updateTransactionRemittanceAction.pending,
      (state, action) => {
        let source;
        const { status, notes, inputted_amount } = action.meta.arg;
        if (notes && notes !== '') source = `${action.type}/notes`;
        if (inputted_amount && inputted_amount !== '')
          source = `${action.type}/inputted_amount`;
        if (status) source = source = `${action.type}/${status}`;

        const loadingTransaction: Loading = {
          source,
          status: true
        };
        return {
          ...state,
          loadingTransaction,
          errorMessageTransaction: emptyErrorMessageTransaction
        };
      }
    );
    builder.addCase(
      updateTransactionRemittanceAction.fulfilled,
      (state, action) => {
        let source;
        const { status, notes, inputted_amount } = action.meta.arg;
        if (notes && notes !== '') source = `${action.type}/notes`;
        if (inputted_amount && inputted_amount !== '')
          source = `${action.type}/inputted_amount`;
        if (status) source = source = `${action.type}/${status}`;
        const loadingTransaction: Loading = {
          source,
          status: false
        };
        const successMessageTransaction: Success = {
          source,
          message: 'Successfully update transaction remittance!'
        };
        return {
          ...state,
          loadingTransaction,
          errorMessageTransaction: emptyErrorMessageTransaction,
          updatedRemittanceTransaction: action.payload,
          successMessageTransaction
        };
      }
    );
    builder.addCase(
      updateTransactionRemittanceAction.rejected,
      (state, action) => {
        let source;
        const { status, notes, inputted_amount } = action.meta.arg;
        if (notes && notes !== '') source = `${action.type}/notes`;
        if (inputted_amount && inputted_amount !== '')
          source = `${action.type}/inputted_amount`;
        if (status) source = source = `${action.type}/${status}`;
        const errorMessageTransaction: Error = {
          source,
          message: action.payload
        };
        return {
          ...state,
          errorMessageTransaction,
          loadingTransaction: emptyLoadingTransaction
        };
      }
    );

    builder.addCase(updateTransactionAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction: emptyErrorMessageTransaction
      };
    });
    builder.addCase(updateTransactionAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        updatedTransaction: action.payload,
        errorMessageTransaction: emptyErrorMessageTransaction,
        loadingTransaction
      };
    });
    builder.addCase(updateTransactionAction.rejected, (state, action) => {
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction: emptyLoadingTransaction,
        errorMessageTransaction
      };
    });
    builder.addCase(uploadRemittanceAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction: emptyErrorMessageTransaction
      };
    });
    builder.addCase(uploadRemittanceAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };

      const successMessageTransaction: Success = {
        source: action.type,
        message: 'Successfully upload image on remittance!'
      };

      return {
        ...state,
        uploadedProofFile: action.payload,
        errorMessageTransaction: emptyErrorMessageTransaction,
        loadingTransaction,
        successMessageTransaction
      };
    });
    builder.addCase(uploadRemittanceAction.rejected, (state, action) => {
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction: emptyLoadingTransaction,
        errorMessageTransaction
      };
    });

    builder.addCase(addBankAccountAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction: emptyErrorMessageTransaction
      };
    });
    builder.addCase(addBankAccountAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        updatedTransaction: action.payload,
        errorMessageTransaction: emptyErrorMessageTransaction,
        loadingTransaction
      };
    });
    builder.addCase(addBankAccountAction.rejected, (state, action) => {
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction: emptyLoadingTransaction,
        errorMessageTransaction
      };
    });

    builder.addCase(updateExchangeRateAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction: emptyErrorMessageTransaction
      };
    });
    builder.addCase(updateExchangeRateAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      return {
        ...state,
        errorMessageTransaction: emptyErrorMessageTransaction,
        loadingTransaction
      };
    });
    builder.addCase(updateExchangeRateAction.rejected, (state, action) => {
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction: emptyLoadingTransaction,
        errorMessageTransaction
      };
    });

    builder.addCase(moveToTopQueueAction.pending, (state, action) => {
      return {
        ...state
      };
    });
    builder.addCase(moveToTopQueueAction.fulfilled, (state, action) => {
      return {
        ...state
      };
    });
    builder.addCase(moveToTopQueueAction.rejected, (state, action) => {
      return {
        ...state
      };
    });

    builder.addCase(queueControlAction.pending, (state, action) => {
      return {
        ...state
      };
    });
    builder.addCase(queueControlAction.fulfilled, (state, action) => {
      return {
        ...state
      };
    });
    builder.addCase(queueControlAction.rejected, (state, action) => {
      return {
        ...state
      };
    });

    builder.addCase(processWithdrawalAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction
      };
    });
    builder.addCase(processWithdrawalAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const successMessageTransaction: Success = {
        source: action.type,
        message: 'Successfully process withdrawal!'
      };
      return {
        ...state,
        loadingTransaction,
        successMessageTransaction
      };
    });
    builder.addCase(processWithdrawalAction.rejected, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction
      };
    });

    builder.addCase(onHoldTransactionAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction
      };
    });
    builder.addCase(onHoldTransactionAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const successMessageTransaction: Success = {
        source: action.type,
        message: 'Successfully move to On Hold!'
      };
      return {
        ...state,
        loadingTransaction,
        successMessageTransaction
      };
    });
    builder.addCase(onHoldTransactionAction.rejected, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction
      };
    });

    builder.addCase(forceMatchTransactionAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction
      };
    });
    builder.addCase(forceMatchTransactionAction.fulfilled, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const successMessageTransaction: Success = {
        source: action.type,
        message:
          action.payload.detail ?? 'Successfully force match transaction!'
      };
      return {
        ...state,
        loadingTransaction,
        successMessageTransaction
      };
    });
    builder.addCase(forceMatchTransactionAction.rejected, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction
      };
    });

    builder.addCase(needApprovalTransactionAction.pending, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: true
      };
      return {
        ...state,
        loadingTransaction
      };
    });
    builder.addCase(
      needApprovalTransactionAction.fulfilled,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: false
        };
        const successMessageTransaction: Success = {
          source: action.type,
          message: 'Successfully move transaction to Wait Approval!'
        };
        return {
          ...state,
          loadingTransaction,
          successMessageTransaction
        };
      }
    );
    builder.addCase(needApprovalTransactionAction.rejected, (state, action) => {
      const loadingTransaction: Loading = {
        source: action.type,
        status: false
      };
      const errorMessageTransaction: Error = {
        source: action.type,
        message: action.payload
      };
      return {
        ...state,
        loadingTransaction,
        errorMessageTransaction
      };
    });

    builder.addCase(
      completeRefundTransactionAction.pending,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: true
        };
        return {
          ...state,
          loadingTransaction
        };
      }
    );
    builder.addCase(
      completeRefundTransactionAction.fulfilled,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: false
        };
        const successMessageTransaction: Success = {
          source: action.type,
          message: 'Refund transaction is completed successfully!'
        };
        return {
          ...state,
          loadingTransaction,
          successMessageTransaction
        };
      }
    );
    builder.addCase(
      completeRefundTransactionAction.rejected,
      (state, action) => {
        const loadingTransaction: Loading = {
          source: action.type,
          status: false
        };
        const errorMessageTransaction: Error = {
          source: action.type,
          message: action.payload
        };
        return {
          ...state,
          loadingTransaction,
          errorMessageTransaction
        };
      }
    );
  }
});

export const {
  setDepositTransactions,
  setInQueueDepositTransactions,
  setActionRequiredDepositTransactions,
  setWaitingApprovalTransactions,
  setBanks,
  setHkdEnquiry,
  setMultiCcyEnquiry,
  setFirmBalance,
  setErrorMessageTransaction,
  setSuccessMessageTransaction,
  setOnHoldTransactions,
  setUnMatchedTransactions,
  setReturnedTransactions,
  setRejectedTransactions,
  setClearMessage,
  setExchangeRate,
  setAllExchangeRates,
  setInQueueWithdrawalTransactions,
  setActionRequiredWithdrawalTransactions,
  setReturnedWithdrawalTransactions,
  setSentToAlpacaTransactions,
  setReceivedFromAlpacaTransactions,
  setOtherTransactions,
  setWithdrawalTransactions,
  setQueue,
  setOpenAlpacaRunningLowModal,
  setOpenDBSRunningLowModal,
  setCompletedDepositTransactions,
  setDbsLora,
  setIsTransactionLoading,
  setLoadingOverlay,
  setAlertMessage,
  setUnknownDepositTransactions,
  setRefundDepositTransactions,
  setRejectedWithdrawalTransactions,
  setrejectedAndReturnedDepositTransactions
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
