import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import AccountBalance from '../../components/AccountBalance';
import ControlButtons from '../../components/ControlButtons/index';
import Header from '../../components/Header';
import StatusTab from '../../components/StatusTab/index';
import TransactionTable from '../../components/TransactionTable/index';
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

import AlertMessage, { AlertMessageProps } from '../../components/AlertMessage';
import FXRateModal from '../../components/FXRateModal';
import LoadingOverlay, {
  LoadingOverlayProps
} from '../../components/LoadingOverlay';
import PopupMessage, { PopupMessageProp } from '../../components/PopupMessage';
import { TransactionActivitiesTypeEdge } from '../../graphql/generated/types';
import {
  moveToTopQueueAction,
  queueControlAction,
  updateExchangeRateAction
} from '../../redux/action/transactionAction';
import {
  setClearMessage,
  setErrorMessageTransaction,
  setOpenAlpacaRunningLowModal,
  setSuccessMessageTransaction
} from '../../redux/slice/transactionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';

interface DepositsProps {}

const Deposits: React.FunctionComponent = (props: DepositsProps) => {
  const dispatch = useAppDispatch();
  const {
    inQueueDepositTransactions,
    actionRequiredDepositTransactions,
    onHoldTransactions,
    unMatchedTransactions,
    returnedTransactions,
    exchangeRate,
    isOpenAlpacaRunningLowModal,
    completedDepositTransactions,
    isTransactionLoading
  } = useAppSelector(state => state.transaction);

  const [selectedTab, setSelectedTab] = useState<string>(tab.completedDeposits);
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

  const [loadingOverlay, setLoadingOverlay] = useState<LoadingOverlayProps>({
    active: false,
    placeholder: ''
  });
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

  const [selectedSearchColumns, setSelectedSearchColumns] =
    useState<OptionSearchColumnObject>(Object);
  const [keywordSearchTransaction, setKeywordSearchTransaction] =
    useState<string>('');

  const COMPLETED_DEPOSITS_COLUMNS = useMemo(
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
        Header: 'Deposit Amount (HKD)',
        accessor: 'node.hkdAmount',
        disableSortBy: true
      }
    ],
    []
  );

  const IN_QUEUE_COLUMNS = useMemo(
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
        Header: 'Deposit Amount (HKD)',
        accessor: 'node.hkdAmount'
      },
      {
        Header: 'Payment Method',
        accessor: 'node.transactionRemittances.fundType'
      }
    ],
    []
  );

  const ACTION_REQUIRED_COLUMNS = useMemo(
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
        Header: 'Deposit Amount (HKD)',
        accessor: 'node.hkdAmount'
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

  const activeDataTable = completedDepositTransactions;
  const activeColumnTable = COMPLETED_DEPOSITS_COLUMNS;

  useEffect(() => {
    setStatusTabs([
      {
        name: tab.completedDeposits,
        isActive: true,
        total: completedDepositTransactions.length
      }
    ]);
  }, [completedDepositTransactions]);

  useEffect(() => {}, [
    inQueueDepositTransactions,
    onHoldTransactions,
    unMatchedTransactions,
    returnedTransactions,
    inQueueDepositTransactions,
    actionRequiredDepositTransactions
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

  function openLoadingOverlay(label: string) {
    setLoadingOverlay({
      active: true,
      placeholder: label
    });
  }
  function closeLoadingOverlay() {
    setLoadingOverlay({
      active: false
    });
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
  const BUTTONS: ButtonParams[] = [
    {
      title: actionButton.restart,
      onPressButton: () => handleQueueControl('RESTART')
    },
    {
      title: actionButton.moveToTop,
      onPressButton: () => handleMoveToTopQueue()
    },
    {
      title: actionButton.pause,
      onPressButton: () => handleQueueControl('PAUSE')
    }
  ];
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
    if (value > 100 || value <= 0) return false;
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
      openLoadingOverlay('Moving To Top of Queue...');
      const selectTransactionsMoveToTopQueue = selectedTransactionIdx.map(
        (index: string) => activeDataTable[index].node.transactionId
      );
      const moveToTopQueueParams: MoveToTopQueueParams = {
        transactions: selectTransactionsMoveToTopQueue
      };
      const response = await dispatch(
        moveToTopQueueAction(moveToTopQueueParams)
      );
      if (response.type === 'moveToTopQueueAction/fulfilled') {
        closeLoadingOverlay();
        const successMessage: Success = {
          source: response.type,
          message: response.payload.detail
        };
        dispatch(setSuccessMessageTransaction(successMessage));
        openSuccessAlertMessage(successMessage.message);
        setTimeout(() => closeAlertMessage(), 5000);
      } else if (response.type === 'moveToTopQueueAction/rejected') {
        closeLoadingOverlay();
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

  async function handleQueueControl(control: QueueControlParams) {
    if (control === 'RESTART') {
      openLoadingOverlay('Restarting Automation...');
    } else {
      openLoadingOverlay('Pausing Automation...');
    }
    const response = await dispatch(queueControlAction(control));
    if (response.type === 'queueControlAction/fulfilled') {
      closeLoadingOverlay();
      const successMessage: Success = {
        source: response.type,
        message: response.payload.detail
      };
      dispatch(setSuccessMessageTransaction(successMessage));
      openSuccessAlertMessage(successMessage.message);
      setTimeout(() => closeAlertMessage(), 5000);
    }
    if (response.type === 'queueControlAction/rejected') {
      closeLoadingOverlay();
      const errorMessage: Success = {
        source: response.type,
        message: response.payload.detail
      };
      dispatch(setErrorMessageTransaction(errorMessage));
      openFailedAlertMessage('Failed', errorMessage.message);
      setTimeout(() => closeAlertMessage(), 5000);
    }
  }

  const onClosePopUpMessage = () =>
    dispatch(setOpenAlpacaRunningLowModal(false));

  const onClosePopUpMessageModal = () =>
    setPopupMessage({ ...popupMessage, isOpen: false });
  const data =
    keywordSearchTransaction && !_.isEmpty(selectedSearchColumns)
      ? searchResult
      : activeDataTable;
  return (
    <div>
      <Header title='Deposits' />
      <LoadingOverlay
        active={isTransactionLoading}
        placeholder={'Loading...'}
      />
      <LoadingOverlay
        active={loadingOverlay.active}
        placeholder={loadingOverlay.placeholder}
      />
      <PopupMessage
        isOpen={popupMessage.isOpen}
        title={popupMessage.title}
        message={popupMessage.message}
        type={popupMessage.type}
        toggle={onClosePopUpMessageModal}
        onClick={onClosePopUpMessageModal}
        buttonTitle={popupMessage.buttonTitle}
      />
      <AlertMessage
        isOpen={alertMessage.isOpen}
        type={alertMessage.type}
        title={alertMessage.title}
        message={alertMessage.message!}
        toggle={() => setAlertMessage({ ...alertMessage, isOpen: false })}
      />
      {/* <PopupMessage
        isOpen={isOpenAlpacaRunningLowModal}
        type='warning'
        title='Funds Running Low - Alpaca LORA'
        message='Funds for Alpaca LORA Account is below USD 40000.00. Please top up soon!'
        buttonTitle='Continue'
        toggle={onClosePopUpMessage}
        onClick={onClosePopUpMessage}
      /> */}
      <AccountBalance page='deposits' statusTabs={statusTabs} />
      <ControlButtons
        page='deposits'
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
        transactionName='deposits'
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

export default Deposits;
