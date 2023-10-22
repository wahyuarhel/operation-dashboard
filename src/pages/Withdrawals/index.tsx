import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import AccountBalance from '../../components/AccountBalance';
import AlertMessage, { AlertMessageProps } from '../../components/AlertMessage';
import ControlButtons from '../../components/ControlButtons/index';
import FXRateModal from '../../components/FXRateModal';
import Header from '../../components/Header';
import LoadingOverlay, {
  LoadingOverlayProps
} from '../../components/LoadingOverlay';
import PopupMessage, { PopupMessageProp } from '../../components/PopupMessage';
import StatusTab from '../../components/StatusTab/index';
import TransactionTable from '../../components/TransactionTable/index';
import { TransactionActivitiesTypeEdge } from '../../graphql/generated/types';
import {
  deleteRemittanceTransactionAction,
  deleteTransactionAction,
  moveToTopQueueAction,
  processWithdrawalAction,
  queueControlAction,
  updateExchangeRateAction
} from '../../redux/action/transactionAction';
import {
  setClearMessage,
  setErrorMessageTransaction,
  setOpenDBSRunningLowModal,
  setSuccessMessageTransaction
} from '../../redux/slice/transactionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import {
  ButtonParams,
  Error,
  MoveToTopQueueParams,
  QueueControlParams,
  Success,
  UpdateExchangeRateParams,
  tab,
  actionButton
} from '../../types/transaction_types';
import { OptionSearchColumnObject, statusTabs } from '../../types/user_types';
import { closeLoadingOverLay, openLoadingOverLay } from 'utils/helper';

interface WithdrawalsProps {}

const Withdrawals: React.FunctionComponent = (props: WithdrawalsProps) => {
  const dispatch = useAppDispatch();
  const {
    inQueueWithdrawalTransactions,
    actionRequiredWithdrawalTransactions,
    returnedWithdrawalTransactions,
    exchangeRate,
    successMessageTransaction,
    loadingOverlay
  } = useAppSelector(state => state.transaction);

  const [selectedTab, setSelectedTab] = useState<string>(tab.inQueueWithdrawal);
  const [selectedTransactionIdx, setSelectedTransactionIdx] = useState([]);
  const [statusTabs, setStatusTabs] = useState<statusTabs[]>([]);
  const [openFxRate, setOpenFxRate] = useState(false);
  const [depositRate, setDepositRate] = useState({
    value: 0,
    error: ''
  });
  const [withdrawalRate, setWithdrawalRate] = useState({
    value: 0,
    error: ''
  });

  const [selectedSearchColumns, setSelectedSearchColumns] =
    useState<OptionSearchColumnObject>(Object);
  const [keywordSearchTransaction, setKeywordSearchTransaction] =
    useState<string>('');
  const [searchResult, setSearchResult] = useState<
    TransactionActivitiesTypeEdge[] | []
  >([]);

  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({
    isOpen: false
  });

  const [popupMessage, setPopupMessage] = useState<PopupMessageProp>({
    isOpen: false,
    title: '',
    message: ''
  });

  useEffect(() => {
    const statusTabs = [
      {
        name: tab.inQueueWithdrawal,
        isActive: true,
        total: inQueueWithdrawalTransactions.length
      },
      {
        name: tab.actionRequired,
        isActive: false,
        total: actionRequiredWithdrawalTransactions.length
      }
    ];
    const updateStatusTabs = statusTabs.map(sts => {
      if (sts.name === selectedTab) {
        sts.isActive = true;
      }
      return sts;
    });
    setStatusTabs(updateStatusTabs);
  }, [inQueueWithdrawalTransactions, actionRequiredWithdrawalTransactions]);

  useEffect(() => {}, [
    inQueueWithdrawalTransactions,
    actionRequiredWithdrawalTransactions,
    returnedWithdrawalTransactions
  ]);

  useEffect(() => {
    let updateActiveData = activeDataTable.filter(transaction => {
      const value = String(
        _.get(transaction, selectedSearchColumns!.value) ?? ''
      );
      return value
        .toLowerCase()
        .includes(keywordSearchTransaction.toLowerCase())
        ? transaction
        : null;
    });
    setSearchResult(updateActiveData);
  }, [keywordSearchTransaction]);

  const IN_QUEUE_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 120,
        disableSortBy: true
      },
      {
        Header: 'Date',
        accessor: 'node.created',
        width: 120,
        disableSortBy: true
      },
      {
        Header: 'Amount Requested (HKD)',
        accessor: 'node.hkdAmount',
        width: 150,
        disableSortBy: true
      },
      {
        Header: 'others',
        accessor: '',
        color: 'black',
        disableSortBy: true
      }
    ],
    []
  );

  const ACTION_REQUIRED_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        disableSortBy: true
      },
      {
        Header: 'Journal ID',
        accessor: 'node.journalId',
        disableSortBy: true
      },
      {
        Header: 'Date',
        accessor: 'node.created',
        width: 120,
        disableSortBy: true
      },
      {
        Header: 'Amount Requested (HKD)',
        accessor: 'node.hkdAmount',
        width: 250,
        disableSortBy: true
      },
      {
        Header: 'Fail Reason',
        accessor: 'node.transactionStatusCode.statusName',
        disableSortBy: true
      }
    ],
    []
  );

  const RETURNED_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId'
      },
      {
        Header: 'Journal ID',
        accessor: 'node.journalId'
      },
      {
        Header: 'Date',
        accessor: 'node.created',
        width: 120
      },
      {
        Header: 'Withdrawal Amount (USD)',
        accessor: 'node.usdAmount'
      },
      {
        Header: 'Fail Point',
        accessor: 'node.transactionStatusCode.statusPoint'
      },
      {
        Header: 'Fail Reason',
        accessor: 'node.transactionStatusCode.statusName'
      }
    ],
    []
  );

  const activeDataTable =
    selectedTab === tab.inQueueWithdrawal
      ? inQueueWithdrawalTransactions
      : selectedTab === tab.actionRequired
      ? actionRequiredWithdrawalTransactions
      : returnedWithdrawalTransactions;
  const activeColumnTable =
    selectedTab === tab.inQueueWithdrawal
      ? IN_QUEUE_COLUMNS
      : selectedTab === tab.actionRequired
      ? ACTION_REQUIRED_COLUMNS
      : RETURNED_COLUMNS;

  const BUTTONS: ButtonParams[] = [
    {
      title: actionButton.processWithdrawal,
      onPressButton: () => handleProcessWithdrawal(),
      tabs: [tab.inQueueWithdrawal, tab.actionRequired]
    },
    {
      title: actionButton.moveToTop,
      onPressButton: handleMoveToTopQueue,
      tabs: [tab.inQueueWithdrawal, tab.actionRequired]
    },
    {
      title: actionButton.reject,
      onPressButton: onRejectRequestWithdrawal,
      tabs: [tab.inQueueWithdrawal]
    }
  ];

  async function onRejectRequestWithdrawal() {
    if (selectedTransactionIdx.length === 0) {
      setPopupMessage({
        isOpen: true,
        type: 'warning',
        title: 'No Transactions Selected',
        message:
          'Please select transaction(s) to process. At least 1 transaction must be selected.'
      });
      return;
    } else {
      setPopupMessage({
        isOpen: true,
        title: 'Reject Request',
        message: 'Are you sure you wish to reject the Withdrawal Request?'
      });
    }
  }

  async function handleRejectRequestTransaction() {
    openLoadingOverLay('Loading...');
    const multipleRejectTransactionResponse = await Promise.all(
      selectedTransactionIdx.map(async (index: string) => {
        const transactionId =
          activeDataTable[Number(index)].node?.transactionId!;
        const response = await dispatch(deleteTransactionAction(transactionId));
        return response;
      })
    );
    let fulfilledResponse = 0,
      rejectedResponse = 0;
    await Promise.all(
      multipleRejectTransactionResponse.map((res, idx) => {
        if (res.type == 'deleteTransactionAction/fulfilled') {
          fulfilledResponse++;
          if (
            idx === multipleRejectTransactionResponse.length - 1 &&
            fulfilledResponse > 0
          ) {
            setTimeout(() => {
              closeLoadingOverLay();
              setPopupMessage({
                isOpen: true,
                type: 'success',
                title: 'Rejected Withdrawal',
                message:
                  'The request has been rejected. The request has been moved to Transaction History -> `Rejected Withdrawals`'
              });
            }, 1000);
          }
        }
        if (res.type == 'deleteTransactionAction/rejected') {
          rejectedResponse++;
          if (
            idx === multipleRejectTransactionResponse.length - 1 &&
            rejectedResponse > 0
          ) {
            setTimeout(() => {
              closeLoadingOverLay();
              setPopupMessage({
                isOpen: true,
                type: 'warning',
                title: 'Rejected Withdrawal Failed',
                message: 'Rejected withdrawal process is failed!'
              });
            }, 1000);
          }
        }
      })
    );
  }

  async function handleProcessWithdrawal() {
    if (selectedTransactionIdx.length === 0) {
      setPopupMessage({
        isOpen: true,
        type: 'warning',
        title: 'No Transactions Selected',
        message:
          'Please select transaction(s) to process. At least 1 transaction must be selected.'
      });
    } else {
      setPopupMessage({
        isOpen: true,
        title: 'Approve Selected Deposits',
        message: 'This will process the withdrawals for the selected users'
      });
    }
  }

  function closeAlertMessage() {
    dispatch(setClearMessage());
    setAlertMessage({
      isOpen: false
    });
  }

  function openSuccessAlertMessage(title: string) {
    setAlertMessage({
      isOpen: true,
      type: 'success',
      title: title,
      message: null
    });
  }
  function openFailedAlertMessage(title: string, message: string) {
    setAlertMessage({
      isOpen: true,
      type: 'alert',
      title: title,
      message: message
    });
  }

  const handleTabStatus = (index: number) => {
    const updateStatusTabs = statusTabs.map((sts: statusTabs, i: number) => {
      const updateSts = sts;
      if (index === i) {
        updateSts.isActive = true;
      } else {
        updateSts.isActive = false;
      }
      return updateSts;
    });
    setSelectedTab(statusTabs[index].name);
    setStatusTabs(updateStatusTabs);
  };

  const onChangeDepositRate = (value: number) => {
    if (value > 0 && value <= 100) {
      setDepositRate({ ...depositRate, value, error: '' });
    } else {
      setDepositRate({
        ...depositRate,
        value,
        error: 'Minimum is 0 and maximum is 100'
      });
    }
  };
  const onChangeWithdrawalRate = (value: number) => {
    if (value > 0 && value <= 100) {
      setWithdrawalRate({ ...depositRate, value, error: '' });
    } else {
      setWithdrawalRate({
        ...depositRate,
        value,
        error: 'Minimum is 0 and maximum is 100'
      });
    }
  };
  const onCloseFxRateModal = () => {
    setOpenFxRate(!openFxRate);
    setDepositRate({ ...depositRate, value: 0 });
    setWithdrawalRate({ ...withdrawalRate, value: 0 });
  };

  const validateRate = (value: number) => {
    if (value > 100 || value < 0) return false;
    return true;
  };

  const onClickContinue = async () => {
    if (validateRate(depositRate.value)) {
      const updateDepositSpread: UpdateExchangeRateParams = {
        id: exchangeRate?.deposit?.id!,
        spread: depositRate.value
      };
      const response = await dispatch(
        updateExchangeRateAction(updateDepositSpread)
      );
      if (response.type === 'updateExchangeRateAction/fulfilled') {
        dispatch(
          setSuccessMessageTransaction({
            source: response.type,
            message: response?.payload?.detail
          })
        );
        setDepositRate({ ...depositRate, value: 0, error: '' });
        setTimeout(() => {
          dispatch(setClearMessage());
        }, 3000);
      }
    }
    if (validateRate(withdrawalRate.value)) {
      const updateWithdrawalSpread: UpdateExchangeRateParams = {
        id: exchangeRate?.withdrawal?.id!,
        spread: withdrawalRate.value
      };
      const response = await dispatch(
        updateExchangeRateAction(updateWithdrawalSpread)
      );
      if (response.type === 'updateExchangeRateAction/fulfilled') {
        dispatch(
          setSuccessMessageTransaction({
            source: response.type,
            message: response?.payload?.detail
          })
        );

        setWithdrawalRate({ ...withdrawalRate, value: 0, error: '' });
        setTimeout(() => {
          dispatch(setClearMessage());
        }, 1000);
      }
    }
  };

  async function handleMoveToTopQueue() {
    if (selectedTransactionIdx.length === 0) {
      setPopupMessage({
        isOpen: true,
        type: 'warning',
        title: 'No Transactions Selected',
        message:
          'Please select transaction(s) to process. At least 1 transaction must be selected.'
      });
    } else {
      openLoadingOverLay('Moving To Top of Queue...');
      if (selectedTransactionIdx.length === 0) return;
      const selectTransactionsMoveToTopQueue = selectedTransactionIdx.map(
        (id: string) => activeDataTable[id].node.transactionId
      );
      const moveToTopQueueParams: MoveToTopQueueParams = {
        transactions: selectTransactionsMoveToTopQueue
      };
      const response = await dispatch(
        moveToTopQueueAction(moveToTopQueueParams)
      );
      if (response.type === 'moveToTopQueueAction/fulfilled') {
        closeLoadingOverLay();
        const successMessage: Success = {
          source: response.type,
          message: response.payload.detail
        };
        dispatch(setSuccessMessageTransaction(successMessage));
        openSuccessAlertMessage(successMessage.message);
        setTimeout(() => closeAlertMessage(), 5000);
      } else if (response.type === 'moveToTopQueueAction/rejected') {
        closeLoadingOverLay();
        const errorMessage: Error = {
          source: response.type,
          message: response.payload
        };
        dispatch(setErrorMessageTransaction(errorMessage));
        openFailedAlertMessage('Failed to Move', errorMessage.message);
        setTimeout(() => closeAlertMessage(), 5000);
      }
    }
  }

  async function handleQueueControl(params: QueueControlParams) {
    if (selectedTransactionIdx.length === 0) {
      setPopupMessage({
        isOpen: true,
        type: 'warning',
        title: 'No Transactions Selected',
        message:
          'Please select transaction(s) to process. At least 1 transaction must be selected.'
      });
    } else {
      if (params === 'RESTART') {
        openLoadingOverLay('Restarting Automation...');
      } else {
        openLoadingOverLay('Pausing Automation...');
      }
      const response = await dispatch(queueControlAction(params));
      if (response.type === 'queueControlAction/fulfilled') {
        const successMessage = {
          source: response.type,
          message: response.payload.detail
        };
        dispatch(setSuccessMessageTransaction(successMessage));
        closeLoadingOverLay();
        openSuccessAlertMessage(response.payload.detail);
        setTimeout(() => {
          closeAlertMessage();
          dispatch(setClearMessage);
        }, 5000);
      }
      if (response.type === 'queueControlAction/rejected') {
        closeLoadingOverLay();
        const errorMessage = {
          source: response.type,
          message: response.payload
        };
        dispatch(setErrorMessageTransaction(errorMessage));
        openFailedAlertMessage('Failed', response.payload);
        setTimeout(() => {
          closeAlertMessage();
          dispatch(setClearMessage);
        }, 5000);
      }
    }
  }

  const onClosePopUpMessage = () => dispatch(setOpenDBSRunningLowModal(false));

  const onClosePopUpMessageModal = (): void =>
    setPopupMessage({ ...popupMessage, isOpen: false });

  const onClickPopUpMessage = async (): Promise<void> => {
    setPopupMessage({ ...popupMessage, isOpen: false });

    if (popupMessage.title === 'Approve Selected Deposits') {
      openLoadingOverLay('Loading...');
      const transactionIds = selectedTransactionIdx.map(
        idx => data[idx].node?.transactionId!
      );
      const processWithdrawalParams = {
        transactions: transactionIds
      };
      const response = await dispatch(
        processWithdrawalAction(processWithdrawalParams)
      );
      if (response.type === 'processWithdrawalAction/fulfilled') {
        setTimeout(() => {
          closeLoadingOverLay();
          setPopupMessage({
            isOpen: true,
            type: 'success',
            title: 'Withdrawals Processing',
            message: 'System will now process the withdrawals'
          });
        }, 1000);
      }
      if (response.type === 'processWithdrawalAction/rejected') {
        setTimeout(() => {
          closeLoadingOverLay();
          setPopupMessage({
            isOpen: true,
            type: 'warning',
            title: 'Withdrawals Failed',
            message: 'System will not process the withdrawals'
          });
        }, 1000);
      }
    } else if (popupMessage.title === 'Reject Request') {
      handleRejectRequestTransaction();
    }
  };
  const data =
    keywordSearchTransaction && !_.isEmpty(selectedSearchColumns)
      ? searchResult
      : activeDataTable;
  return (
    <div>
      <Header title='Withdrawals' />
      <LoadingOverlay
        active={loadingOverlay.active}
        placeholder={loadingOverlay.placeholder}
      />
      <AlertMessage
        isOpen={alertMessage.isOpen}
        type={alertMessage.type}
        title={alertMessage.title}
        message={alertMessage.message!}
        toggle={() => setAlertMessage({ ...alertMessage, isOpen: false })}
      />

      <PopupMessage
        isOpen={popupMessage.isOpen}
        title={popupMessage.title}
        message={popupMessage.message}
        type={popupMessage.type}
        toggle={onClosePopUpMessageModal}
        onClick={onClickPopUpMessage}
        buttonTitle={popupMessage.buttonTitle}
      />
      {/* <PopupMessage
        isOpen={isOpenDBSRunningLowModal}
        type='warning'
        title='Funds Running Low - DBS LORA'
        message='Funds for DBS LORA Account is below HKD 5,100,000.00. Please top up soon!'
        buttonTitle='Continue'
        toggle={onClosePopUpMessage}
        onClick={onClosePopUpMessage}
      /> */}
      <AccountBalance page='withdrawals' statusTabs={statusTabs} />
      <ControlButtons
        page='withdrawals'
        buttons={BUTTONS}
        selectedTransactionIdx={selectedTransactionIdx}
        selectedTab={selectedTab}
      />
      <StatusTab statusTabs={statusTabs} handleTabStatus={handleTabStatus} />
      <FXRateModal
        isOpen={openFxRate}
        toggle={onCloseFxRateModal}
        title='Current FX Rates'
        depositRate={depositRate}
        setDepositRate={e => onChangeDepositRate(e.target.value)}
        withdrawalRate={withdrawalRate}
        setWithdrawalRate={e => onChangeWithdrawalRate(e.target.value)}
        onClickContinue={onClickContinue}
      />
      <TransactionTable
        transactionName='withdrawals'
        selectedTabMenu={selectedTab}
        tableColumns={activeColumnTable}
        tableData={data}
        setSelectedTransactionIdx={setSelectedTransactionIdx}
        selectedSearchColumns={selectedSearchColumns}
        setSelectedSearchColumns={setSelectedSearchColumns}
        keywordSearchTransaction={keywordSearchTransaction}
        setKeywordSearchTransaction={setKeywordSearchTransaction}
      />
    </div>
  );
};

export default Withdrawals;
