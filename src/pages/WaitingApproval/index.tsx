import LoadingOverlay from 'components/LoadingOverlay';
import PopupMessage, { PopupMessageProp } from 'components/PopupMessage';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import {
  closeAlertMessage,
  closeLoadingOverLay,
  openFailedAlertMessage,
  openLoadingOverLay
} from 'utils/helper';
import AccountBalance from '../../components/AccountBalance';
import AlertMessage from '../../components/AlertMessage';
import ControlButtons from '../../components/ControlButtons/index';
import Header from '../../components/Header';
import StatusTab from '../../components/StatusTab/index';
import TransactionTable from '../../components/TransactionTable/index';
import {
  RemittanceTypeEdge,
  TransactionActivitiesTypeEdge
} from '../../graphql/generated/types';
import {
  approveTransactionAction,
  deleteRemittanceTransactionAction,
  deleteTransactionAction,
  updateTransactionRemittanceAction,
  onHoldTransactionAction,
  forceMatchTransactionAction,
  needApprovalTransactionAction,
  completeRefundTransactionAction
} from '../../redux/action/transactionAction';
import {
  setClearMessage,
  setErrorMessageTransaction,
  setSuccessMessageTransaction
} from '../../redux/slice/transactionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import {
  ApproveTransactionParams,
  ButtonParams,
  actionButton,
  tab,
  transferType
} from '../../types/transaction_types';
import { OptionSearchColumnObject, statusTabs } from '../../types/user_types';
import icons from 'constants/icons';
import { formatNumber } from 'utils/formatNumber';

interface WaitingApprovalProps {}

const WaitingApproval: React.FunctionComponent = (
  props: WaitingApprovalProps
) => {
  const dispatch = useAppDispatch();

  const {
    waitingApprovalTransactions,
    onHoldTransactions,
    unMatchedTransactions,
    returnedTransactions,
    rejectedTransaction,
    isTransactionLoading,
    loadingOverlay,
    alertMessage,
    unknownDepositTransactions
  } = useAppSelector(state => state.transaction);

  const [selectedTab, setSelectedTab] = useState<string>(tab.waitingApproval);
  const [selectedTransactionIdx, setSelectedTransactionIdx] = useState([]);
  const [statusTabs, setStatusTabs] = useState<statusTabs[]>([]);
  const [selectedSearchColumns, setSelectedSearchColumns] =
    useState<OptionSearchColumnObject>(Object);
  const [keywordSearchTransaction, setKeywordSearchTransaction] =
    useState<string>('');
  const [searchResult, setSearchResult] = useState<RemittanceTypeEdge[] | []>(
    []
  );

  const [transactionMoveToHistory, setTransactionMoveToHistory] =
    useState<TransactionActivitiesTypeEdge | null>(null);

  const [popupMessage, setPopupMessage] = useState<PopupMessageProp>({
    isOpen: false,
    title: '',
    message: ''
  });

  function openConfirmPopupMessage(title: string, message: string): void {
    setPopupMessage({
      isOpen: true,
      title: title,
      message: message
    });
  }

  function openSuccessPopupMessage(title: string, message: string) {
    setPopupMessage({
      isOpen: true,
      type: 'success',
      title: title,
      message: message
    });
  }

  function openWarningPopupMessage(title: string, message: string) {
    setPopupMessage({
      isOpen: true,
      type: 'warning',
      title: title,
      message: message
    });
  }
  function onClosePopupMessage() {
    setPopupMessage({
      ...popupMessage,
      isOpen: false
    });
  }

  useEffect(() => {
    const statusTabs = [
      {
        name: tab.waitingApproval,
        isActive: false,
        total: waitingApprovalTransactions.length
      },
      {
        name: tab.onHold,
        isActive: false,
        total: onHoldTransactions.length
      },
      {
        name: tab.unMatched,
        isActive: false,
        total: unMatchedTransactions.length
      },
      {
        name: tab.return,
        isActive: false,
        total: returnedTransactions.length
      },
      {
        name: tab.reject,
        isActive: false,
        total: rejectedTransaction.length
      },
      {
        name: tab.unknown,
        isActive: false,
        total: unknownDepositTransactions.length
      }
    ];
    const updateStatusTabs = statusTabs.map(sts => {
      if (sts.name === selectedTab) {
        sts.isActive = true;
      }
      return sts;
    });
    setStatusTabs(updateStatusTabs);
    isTransactionLoading
      ? openLoadingOverLay('Loading...')
      : closeLoadingOverLay();
  }, [
    waitingApprovalTransactions,
    onHoldTransactions,
    unMatchedTransactions,
    returnedTransactions,
    rejectedTransaction,
    unknownDepositTransactions,
    isTransactionLoading
  ]);

  useEffect(() => {
    onSearchTransactionBasedOnColumn();
  }, [keywordSearchTransaction]);

  const onSearchTransactionBasedOnColumn = () => {
    if (selectedTab === tab.unMatched) {
      let updateActiveData = unMatchedTransactions.filter(transaction => {
        let value: string = '';
        if (selectedSearchColumns.label === 'User Type') {
          value =
            transaction.node?.userType! ?? transaction.node?.accountStatus!;
        } else if (selectedSearchColumns.label === 'Type') {
          value = _.get(transaction, selectedSearchColumns!.value)
            ? 'transaction'
            : 'remittance';
        } else if (selectedSearchColumns.label === 'Amount (HKD)') {
          value = String(
            transaction.node?.hkdAmount! ?? transaction.node?.inputtedAmount!
          );
        } else {
          value = String(
            _.get(transaction, selectedSearchColumns!.value) ?? ''
          );
        }

        return value
          .toLowerCase()
          .includes(keywordSearchTransaction.toLowerCase())
          ? transaction
          : null;
      });

      setSearchResult(updateActiveData);
    } else {
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
    }
  };

  const WAITING_APPROVAL_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 150
      },
      {
        Header: 'Date',
        accessor: 'node.created',
        width: 120
      },
      {
        Header: 'Name',
        accessor: 'node.accountName',
        width: 250
      },
      {
        Header: 'User Type',
        accessor: 'node.accountStatus',
        width: 150
      },
      {
        Header: 'PoR',
        accessor: 'node.remittanceProofs',
        disableSortBy: true
      },
      {
        Header: 'Admin 1 Approved',
        accessor: 'node.approvedAdmins.admin1.name',
        disableSortBy: true
      },
      {
        Header: 'Admin 2 Approved',
        accessor: 'node.approvedAdmins.admin2.name',
        disableSortBy: true
      }
    ],
    []
  );

  const UNMATCHED_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 150
      },
      {
        Header: 'Date',
        accessor: 'node.created',
        width: 120
      },
      {
        Header: 'Name',
        accessor: 'node.accountName',
        width: 250
      },
      {
        Header: 'User Type',
        accessor: 'node.accountStatus',
        width: 150
      },
      {
        Header: 'Type',
        accessor: 'node.transactionId',
        width: 150
      },
      {
        Header: 'Amount (HKD)',
        accessor: a =>
          a.node.inputtedAmount ? a.node.inputtedAmount : a.node.hkdAmount,
        width: 150
      },
      {
        Header: 'PoR',
        accessor: 'node.remittanceProofs'
      }
    ],
    []
  );
  const ONHOLD_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 150
      },
      {
        Header: 'Date',
        accessor: 'node.created',
        width: 120
      },
      {
        Header: 'Name',
        accessor: 'node.accountName'
      },
      {
        Header: 'User Type',
        accessor: 'node.accountStatus'
      },
      {
        Header: 'PoR',
        accessor: 'node.remittanceProofs',
        disableSortBy: true
      },
      {
        Header: 'Admin 1 Approved',
        accessor: 'node.approvedAdmins.admin1.name',
        disableSortBy: true
      },
      {
        Header: 'Admin 2 Approved',
        accessor: 'node.approvedAdmins.admin2.name',
        disableSortBy: true
      }
    ],
    []
  );

  const RETURN_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 120
      },
      {
        Header: 'Date',
        accessor: 'node.created',
        width: 120
      },
      {
        Header: 'Name',
        accessor: 'node.accountName',
        width: 300
      },
      {
        Header: 'Amount to Return (HKD)',
        accessor: 'node.hkdAmount',
        width: 250
      },
      {
        Header: 'Bank Acc. Number',
        accessor: 'node.bankAccountNumber',
        width: 250,
        disableSortBy: true
      },
      {
        Header: '',
        accessor: 'action',
        color: 'black',
        disableSortBy: true
      }
    ],
    []
  );
  const REJECT_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 120
      },
      {
        Header: 'Request Date',
        accessor: 'node.created',
        width: 200
      },
      {
        Header: 'Name',
        accessor: 'node.accountName',
        width: 300
      },
      {
        Header: 'User Type',
        width: 150,
        accessor: 'node.accountStatus'
      },
      {
        Header: '',
        accessor: '#',
        color: 'black',
        disableSortBy: true
      }
    ],
    []
  );

  const UNKNOWN_COLUMNS = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'node.created',
        width: 200
      },
      {
        Header: 'Name',
        accessor: 'node.accountName',
        width: 300
      },
      {
        Header: 'Amount (HKD)',
        width: 150,
        accessor: 'node.hkdAmount'
      },
      {
        Header: '',
        accessor: '#',
        color: 'black',
        disableSortBy: true
      }
    ],
    []
  );

  const activeDataTable =
    selectedTab === tab.waitingApproval
      ? waitingApprovalTransactions
      : selectedTab === tab.onHold
      ? onHoldTransactions
      : selectedTab === tab.unMatched
      ? unMatchedTransactions
      : selectedTab === tab.return
      ? returnedTransactions
      : selectedTab === tab.reject
      ? rejectedTransaction
      : unknownDepositTransactions;
  const activeColumnTable =
    selectedTab === tab.waitingApproval
      ? WAITING_APPROVAL_COLUMNS
      : selectedTab === tab.onHold
      ? ONHOLD_COLUMNS
      : selectedTab === tab.unMatched
      ? UNMATCHED_COLUMNS
      : selectedTab === tab.return
      ? RETURN_COLUMNS
      : selectedTab === tab.reject
      ? REJECT_COLUMNS
      : UNKNOWN_COLUMNS;

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

  const handleMoveToReturn = async () => {
    if (selectedTransactionIdx.length === 0) {
      openWarningPopupMessage(
        'No Transactions Selected',
        'Please select transaction(s) to process. At least 1 transaction must be selected.'
      );
    } else {
      const multipleDeleteTransactionResponse = await Promise.all(
        selectedTransactionIdx.map(async (index: string) => {
          const transactionId =
            unMatchedTransactions[Number(index)].node?.transactionId!;
          const response = await dispatch(
            deleteTransactionAction(transactionId)
          );
          return response;
        })
      );
      let fulfilledResponse = 0;
      await Promise.all(
        multipleDeleteTransactionResponse.map((res, idx) => {
          if (res.type == 'deleteTransactionAction/fulfilled') {
            fulfilledResponse++;
            if (
              idx === multipleDeleteTransactionResponse.length - 1 &&
              fulfilledResponse > 0
            ) {
              const successMessage = {
                source: res.type,
                message: `Successfully move to Return ${fulfilledResponse} ${
                  fulfilledResponse == 1 ? 'transaction' : 'transactions'
                }!`
              };
              dispatch(setSuccessMessageTransaction(successMessage));
            }
          }
          setTimeout(() => dispatch(setClearMessage()), 3000);
        })
      );
    }
  };

  async function onClickRejectRequestButton() {
    if (selectedTransactionIdx.length === 0) {
      openWarningPopupMessage(
        'No Transactions Selected',
        'Please select transaction(s) to process. At least 1 transaction must be selected.'
      );
    } else {
      openConfirmPopupMessage(
        'Confirm Request Rejection',
        'Are you sure you wish to move this Deposit Request to the Reject screen? Please note that you cannot move a Deposit Request once it is in ‘Reject’'
      );
    }
  }

  async function handleRejectRequest() {
    const multipleRejectTransactionResponse = await Promise.all(
      selectedTransactionIdx.map(async (index: string) => {
        const remittanceId = activeDataTable[Number(index)].node?.remittanceId!;
        const response = await dispatch(
          deleteRemittanceTransactionAction(remittanceId)
        );
        return response;
      })
    );
    let fulfilledResponse = 0,
      rejectedResponse = 0;
    await Promise.all(
      multipleRejectTransactionResponse.map((res, idx) => {
        if (res.type == 'deleteRemittanceTransactionAction/fulfilled') {
          fulfilledResponse++;
          if (
            idx === multipleRejectTransactionResponse.length - 1 &&
            fulfilledResponse > 0
          ) {
            closeLoadingOverLay();
            openSuccessPopupMessage(
              'Request Moved',
              'The Deposit Request has been moved to the ‘Reject’ table'
            );
          }
        }
        if (res.type == 'deleteRemittanceTransactionAction/rejected') {
          rejectedResponse++;
          if (
            idx === multipleRejectTransactionResponse.length - 1 &&
            rejectedResponse > 0
          ) {
            closeLoadingOverLay();
            openWarningPopupMessage(
              'Unable to Move Deposit Request',
              res.payload.includes('404')
                ? 'You are only able to move Deposit Requests to the ‘Reject’ screen'
                : res.payload
            );
          }
        }
      })
    );
  }

  const handleApproveTransaction = async () => {
    if (selectedTransactionIdx.length === 0) {
      openWarningPopupMessage(
        'No Transactions Selected',
        'Please select transaction(s) to process. At least 1 transaction must be selected.'
      );
    } else {
      const multipleApproveTransactionResponse = await Promise.all(
        selectedTransactionIdx.map(async (index: string) => {
          const transactionId =
            activeDataTable[Number(index)].node?.transactionActivity
              ?.transactionId!;
          const approveParams: ApproveTransactionParams = {
            transaction_id: transactionId
          };
          const response = await dispatch(
            approveTransactionAction(approveParams)
          );
          return response;
        })
      );
      let fulfilledResponse = 0,
        rejectedResponse = 0;
      await Promise.all(
        multipleApproveTransactionResponse.map((res, idx) => {
          if (res.type == 'approveTransactionAction/fulfilled') {
            fulfilledResponse++;
            if (
              idx === multipleApproveTransactionResponse.length - 1 &&
              fulfilledResponse > 0
            ) {
              const successMessage = {
                source: res.type,
                message: `Successfully approve ${fulfilledResponse} ${
                  fulfilledResponse == 1 ? 'transaction' : 'transactions'
                }!`
              };
              dispatch(setSuccessMessageTransaction(successMessage));
              setTimeout(() => dispatch(setClearMessage()), 3000);
            }
          }
          if (res.type == 'approveTransactionAction/rejected') {
            rejectedResponse++;
            if (
              idx === multipleApproveTransactionResponse.length - 1 &&
              rejectedResponse > 0
            ) {
              const errorMessage = {
                source: res.type,
                message: res.payload
              };
              dispatch(setErrorMessageTransaction(errorMessage));
              setTimeout(() => dispatch(setClearMessage()), 3000);
            }
          }
        })
      );
    }
  };

  const handleUpdateRemittanceStatus = async (status: string) => {
    onClosePopupMessage();
    if (selectedTransactionIdx.length === 0) {
      openWarningPopupMessage(
        'No Transactions Selected',
        'Please select transaction(s) to process. At least 1 transaction must be selected.'
      );
    } else {
      if (selectedTransactionIdx.length == 0) return;
      const multipleUpdateStatusResponse = await Promise.all(
        selectedTransactionIdx.map(async (index: string) => {
          const remittanceId =
            activeDataTable[Number(index)].node?.remittanceId!;
          const updateStatusRemittanceParams = {
            remittance_id: remittanceId,
            status
          };
          const response = await dispatch(
            updateTransactionRemittanceAction(updateStatusRemittanceParams)
          );
          return response;
        })
      );
      let fulfilledResponse = 0,
        rejectedResponse = 0;
      await Promise.all(
        multipleUpdateStatusResponse.map((res, idx) => {
          if (res.type == 'updateTransactionRemittanceAction/fulfilled') {
            fulfilledResponse++;
            if (
              idx === multipleUpdateStatusResponse.length - 1 &&
              fulfilledResponse > 0
            ) {
              const successMessage = {
                source: `${res.type}/${res.meta.arg.status}`,
                message: `Successfully move ${fulfilledResponse} ${
                  fulfilledResponse == 1 ? 'remittance' : 'remittances'
                } to ${status}!`
              };
              dispatch(setSuccessMessageTransaction(successMessage));
              setTimeout(() => dispatch(setClearMessage()), 3000);
            }
          }
          if (res.type == 'updateTransactionRemittanceAction/rejected') {
            rejectedResponse++;
            if (
              idx === multipleUpdateStatusResponse.length - 1 &&
              rejectedResponse > 0
            ) {
              const errorMessage = {
                source: 'updateTransactionRemittanceAction/rejected',
                message: `Failed move ${rejectedResponse} ${
                  rejectedResponse == 1 ? 'remittance' : 'remittances'
                } to ${status}!`
              };
              dispatch(setErrorMessageTransaction(errorMessage));
              setTimeout(() => dispatch(setClearMessage()), 3000);
            }
          }
        })
      );
    }
  };

  function handleTransactionMoveToQueue() {
    openFailedAlertMessage('Failed To Move', '');
    setTimeout(() => closeAlertMessage(), 3000);
  }

  const handleForceMatchTransaction = async (): Promise<void> => {
    if (selectedTransactionIdx.length != 2) {
      openWarningPopupMessage(
        'Force match error',
        'Please select transaction(s) to process. 1 Remittance & 1 Transaction to force match.'
      );
      return;
    }
    let forceMatchParams: {
      transaction_id: string;
      remittance_id: number;
    } = {
      remittance_id: 0,
      transaction_id: ''
    };
    selectedTransactionIdx.map((index: number) => {
      if (
        unMatchedTransactions[index].__typename ===
        'TransactionActivitiesTypeEdge'
      ) {
        forceMatchParams.transaction_id =
          unMatchedTransactions[index].node?.transactionId ?? '';
      } else {
        forceMatchParams.remittance_id =
          Number(unMatchedTransactions[index].node?.remittanceId) ?? 0;
      }
    });

    if (
      !_.isEmpty(forceMatchParams.transaction_id) &&
      forceMatchParams.remittance_id != 0
    ) {
      const forceMatchResponse = await dispatch(
        forceMatchTransactionAction(forceMatchParams)
      );
      setTimeout(() => dispatch(setClearMessage()), 3000);
    } else {
      openWarningPopupMessage(
        'Force match error',
        'Please select transaction(s) to process. 1 Remittance & 1 Transaction to force match.'
      );
    }
  };

  const handleOnHoldTransaction = async (): Promise<void> => {
    if (selectedTransactionIdx.length == 0) {
      openWarningPopupMessage(
        'No Transactions Selected',
        'Please select transaction(s) to process. At least 1 transaction must be selected.'
      );
      return;
    }
    const multipleMoveToOnHoldResponse = await Promise.all(
      selectedTransactionIdx.map(async (index: number) => {
        const remittanceId = activeDataTable[index].node?.remittanceId
          ? activeDataTable[index].node?.remittanceId
          : '0';
        const moveToOnHoldParams = {
          remittance_id: Number(remittanceId)
        };
        const response = await dispatch(
          onHoldTransactionAction(moveToOnHoldParams)
        );
        return response;
      })
    );
    let fulfilledResponse = 0,
      rejectedResponse = 0;
    await Promise.all(
      multipleMoveToOnHoldResponse.map((res, idx) => {
        if (res.type == 'onHoldTransactionAction/fulfilled') {
          fulfilledResponse++;
          if (
            idx === multipleMoveToOnHoldResponse.length - 1 &&
            fulfilledResponse > 0
          ) {
            const successMessage = {
              source: res.type,
              message: `Successfully move ${fulfilledResponse} ${
                fulfilledResponse == 1 ? 'remittance' : 'remittances'
              } to On Hold!`
            };
            dispatch(setSuccessMessageTransaction(successMessage));
            setTimeout(() => dispatch(setClearMessage()), 1000);
          }
        }
        if (res.type == 'onHoldTransactionAction/rejected') {
          rejectedResponse++;
          if (
            idx === multipleMoveToOnHoldResponse.length - 1 &&
            rejectedResponse > 0
          ) {
            const errorMessage = {
              source: res.type,
              message: `Failed move ${rejectedResponse} ${
                rejectedResponse == 1 ? 'remittance' : 'remittances'
              } to On Hold!`
            };
            dispatch(setErrorMessageTransaction(errorMessage));
            setTimeout(() => dispatch(setClearMessage()), 1000);
          }
        }
      })
    );
  };

  const handleNeedApprovalTransaction = async (): Promise<void> => {
    if (selectedTransactionIdx.length === 0) {
      openWarningPopupMessage(
        'No Transactions Selected',
        'Please select transaction(s) to process. At least 1 transaction must be selected.'
      );
      return;
    }
    const multipleNeedApprovalResponse = await Promise.all(
      selectedTransactionIdx.map(async (index: number) => {
        const remittanceId = activeDataTable[index].node?.remittanceId!;
        const moveWaitApprovalParams = {
          remittance_id: Number(remittanceId)
        };
        const response = await dispatch(
          needApprovalTransactionAction(moveWaitApprovalParams)
        );
        return response;
      })
    );
    let fulfilledResponse = 0,
      rejectedResponse = 0;
    await Promise.all(
      multipleNeedApprovalResponse.map((res, idx) => {
        if (res.type == 'needApprovalTransactionAction/fulfilled') {
          fulfilledResponse++;
          if (
            idx === multipleNeedApprovalResponse.length - 1 &&
            fulfilledResponse > 0
          ) {
            const successMessage = {
              source: res.type,
              message: `Successfully move ${fulfilledResponse} ${
                fulfilledResponse == 1 ? 'remittance' : 'remittances'
              } to Wait Approval!`
            };
            dispatch(setSuccessMessageTransaction(successMessage));
            setTimeout(() => dispatch(setClearMessage()), 1000);
          }
        }
        if (res.type == 'needApprovalTransactionAction/rejected') {
          rejectedResponse++;
          if (
            idx === multipleNeedApprovalResponse.length - 1 &&
            rejectedResponse > 0
          ) {
            const errorMessage = {
              source: res.type,
              message: `Failed move ${rejectedResponse} ${
                rejectedResponse == 1 ? 'remittance' : 'remittances'
              } to Wait Approval!`
            };
            dispatch(setErrorMessageTransaction(errorMessage));
            setTimeout(() => dispatch(setClearMessage()), 1000);
          }
        }
      })
    );
  };

  const handleMoveToTransactionHistory = (
    transaction: TransactionActivitiesTypeEdge
  ) => {
    openConfirmPopupMessage('Select Return Method', '');
    setTransactionMoveToHistory(transaction);
  };

  const handleCompleteRefundButton = async (transferType: string) => {
    onClosePopupMessage();
    openConfirmPopupMessage(
      transferType === 'AUTO' ? 'Confirm Automatic Return' : 'Manual Return',
      ''
    );
  };

  const handleCompleteRefundAction = async (completeRefund: {
    transaction_id: string;
    transfer_type: string;
  }): Promise<void> => {
    onClosePopupMessage();
    openLoadingOverLay('Loading...');
    const response = await dispatch(
      completeRefundTransactionAction(completeRefund)
    );
    if (response.type === 'completeRefundTransactionAction/fulfilled') {
      const successMessage =
        completeRefund.transfer_type === transferType.auto
          ? 'The deposit has been returned to the user. You can check the transaction by going to ‘Transaction History’ -> ‘Rejected/Returned Deposits’'
          : 'The transaction has been moved to ‘Transaction History’ -> ‘Rejected/Returned Deposits’, and the cash ledger has also been updated.';
      setTimeout(() => {
        closeLoadingOverLay();
        openSuccessPopupMessage('Return Success', successMessage);
      }, 1000);
    }
    if (response.type === 'completeRefundTransactionAction/rejected') {
      setTimeout(() => {
        closeLoadingOverLay();
        openWarningPopupMessage(
          completeRefund.transfer_type === transferType.auto
            ? 'Auto Return Failed'
            : 'Manual Return Failed',
          response.payload
        );
      }, 1000);
    }
  };

  const BUTTONS: ButtonParams[] = [
    {
      title: actionButton.onHold,
      onPressButton: () => handleOnHoldTransaction()
    },
    {
      title: actionButton.waitingApproval,
      onPressButton: () => handleNeedApprovalTransaction()
    },
    {
      title: actionButton.forceMatch,
      onPressButton: () => handleForceMatchTransaction()
    },
    {
      title: actionButton.return,
      onPressButton: () => handleMoveToReturn()
    },
    {
      title: actionButton.reject,
      onPressButton: () => onClickRejectRequestButton()
    }
  ];

  function onClickButtonInPopupMessage() {
    onClosePopupMessage();
    if (popupMessage.title === 'Confirm Request Rejection') {
      openLoadingOverLay('Loading...');
      setTimeout(() => handleRejectRequest(), 1000);
    } else if (
      popupMessage.title === 'Confirm Automatic Return' ||
      popupMessage.title === 'Manual Return'
    ) {
      const completeRefundParams = {
        transaction_id: transactionMoveToHistory?.node?.transactionId!,
        transfer_type:
          popupMessage.title === 'Confirm Automatic Return' ? 'AUTO' : 'MANUAL'
      };
      handleCompleteRefundAction(completeRefundParams);
    }
  }

  const renderConfirmationRefundMethod = () => {
    return (
      <div>
        <b className='my-2'>
          {popupMessage.title === 'Confirm Automatic Return' ? (
            'The transaction will be returned to the following:'
          ) : (
            <>
              Please go to DBS Internet banking and return the transaction
              (click ({' '}
              <a
                href='https://ideal.dbs.com/loginSubscriberv2/login/pin?undefined='
                target='_blank'
              >
                HERE
              </a>{' '}
              for the link). The details are:
            </>
          )}
        </b>
        <p className='my-2'>
          Name : {transactionMoveToHistory?.node?.accountName}
        </p>
        <p className='my-2'>
          Bank Code : {transactionMoveToHistory?.node?.bankAccountCode}
        </p>
        <p className='my-2'>
          Bank Name : {transactionMoveToHistory?.node?.bankAccountName}
        </p>
        <p className='my-2'>
          Account No : {transactionMoveToHistory?.node?.bankAccountNumber}
        </p>
        <p className='my-2'>
          Amount : HKD {formatNumber(transactionMoveToHistory?.node?.hkdAmount)}
        </p>
        {popupMessage.title === 'Manual Return' ? (
          <b className='my-2'>
            Once you have returned the deposit, click on "Continue"
          </b>
        ) : null}
      </div>
    );
  };
  const data =
    keywordSearchTransaction && !_.isEmpty(selectedSearchColumns)
      ? searchResult
      : activeDataTable;

  return (
    <div>
      <LoadingOverlay
        active={loadingOverlay.active}
        placeholder={loadingOverlay.placeholder}
      />
      <Header title='Waiting Approval' />
      <AccountBalance page='waiting approval' statusTabs={statusTabs} />
      <ControlButtons
        page='waiting approval'
        buttons={BUTTONS}
        selectedTransactionIdx={selectedTransactionIdx}
        selectedTab={selectedTab}
      />
      <PopupMessage
        isOpen={popupMessage.isOpen}
        title={popupMessage.title}
        message={popupMessage.message}
        type={popupMessage.type}
        toggle={onClosePopupMessage}
        onClick={onClickButtonInPopupMessage}
        buttonTitle={popupMessage.buttonTitle}
      >
        {selectedTab === tab.return &&
        popupMessage.title === 'Select Return Method' ? (
          <div className='d-flex flex-row'>
            <div style={{ cursor: 'pointer' }}>
              <img
                src={icons.automatic}
                alt='Automatic'
                onClick={() => handleCompleteRefundButton('AUTO')}
              />
              <p style={{ fontSize: '12px', marginTop: '20px' }}>
                <b>Automatic</b> - The transaction will be returned
                automatically to the user
              </p>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <img
                src={icons.manual}
                alt='Manual'
                onClick={() => handleCompleteRefundButton('MANUAL')}
              />
              <p style={{ fontSize: '12px', marginTop: '20px' }}>
                <b>Manual</b> - The admin must return the payment via DBS
                manually
              </p>
            </div>
          </div>
        ) : null}
        {selectedTab === tab.return &&
        ['Confirm Automatic Return', 'Manual Return'].includes(
          popupMessage.title
        )
          ? renderConfirmationRefundMethod()
          : null}
      </PopupMessage>
      <AlertMessage
        isOpen={alertMessage.isOpen}
        toggle={closeAlertMessage}
        type={alertMessage.type}
        size='sm'
        title={alertMessage.title}
        message={alertMessage.message}
      />
      <StatusTab statusTabs={statusTabs} handleTabStatus={handleTabStatus} />
      <TransactionTable
        selectedTabMenu={selectedTab}
        transactionName='waiting approval'
        tableColumns={activeColumnTable}
        tableData={data}
        setSelectedTransactionIdx={setSelectedTransactionIdx}
        selectedSearchColumns={selectedSearchColumns}
        setSelectedSearchColumns={setSelectedSearchColumns}
        keywordSearchTransaction={keywordSearchTransaction}
        setKeywordSearchTransaction={setKeywordSearchTransaction}
        handleMoveToTransactionHistory={handleMoveToTransactionHistory}
      />
    </div>
  );
};

export default WaitingApproval;
