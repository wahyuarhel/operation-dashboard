import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import _ from 'lodash';

import Sidebar from '../../components/Sidebar/index';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import {
  useGetBanksQuery,
  useGetHkdEnquiryQuery,
  useGetMultiCurrencyEnquiryQuery,
  useGetRemittancesQuery,
  useGetTransactionsQuery,
  useGetFirmBalanceQuery,
  useGetExchangeRateQuery,
  useGetAllExchangeRatesQuery,
  useGetQueueQuery
} from '../../graphql/queries.generated';
import {
  TransactionTransactionActivitiesSideChoices,
  TransactionTransactionRemittanceStatusChoices,
  TransactionTransactionRemittanceAccountStatusChoices,
  RemittanceTypeEdge,
  TransactionActivitiesTypeEdge
} from '../../graphql/generated/types';
import {
  setWaitingApprovalTransactions,
  setOnHoldTransactions,
  setReturnedTransactions,
  setUnMatchedTransactions,
  setBanks,
  setHkdEnquiry,
  setMultiCcyEnquiry,
  setFirmBalance,
  setInQueueDepositTransactions,
  setActionRequiredDepositTransactions,
  setExchangeRate,
  setAllExchangeRates,
  setInQueueWithdrawalTransactions,
  setActionRequiredWithdrawalTransactions,
  setReturnedWithdrawalTransactions,
  setDepositTransactions,
  setWithdrawalTransactions,
  setOtherTransactions,
  setOpenAlpacaRunningLowModal,
  setOpenDBSRunningLowModal,
  setQueue,
  setCompletedDepositTransactions,
  setIsTransactionLoading,
  setRejectedTransactions,
  setUnknownDepositTransactions,
  setRefundDepositTransactions,
  setRejectedWithdrawalTransactions,
  setrejectedAndReturnedDepositTransactions
} from '../../redux/slice/transactionSlice';
import './styles.scss';
import { getUserProfile } from '../../redux/action/userAction';
import { pathNames } from 'types/transaction_types';
import { setClearMessage } from 'redux/slice/userSlice';
import { setClearMessage as setClearTransactionMessage } from 'redux/slice/transactionSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { successMessageTransaction, errorMessageTransaction } = useAppSelector(
    state => state.transaction
  );
  const {
    data: remittancesData,
    loading: remittancesDataLoading,
    error: remittancesDataError,
    refetch: refetchRemittances,
    startPolling: startPollingRemittances,
    stopPolling: stopPollingRemittances
  } = useGetRemittancesQuery({
    variables: {
      orderBy: '-created'
    },
    fetchPolicy: 'cache-and-network'
  });
  const {
    data: transactionsData,
    loading: transactionsDataLoading,
    error: transactionsDataError,
    refetch: refetchTransactions,
    startPolling: startPollingTransactions,
    stopPolling: stopPollingTransactions
  } = useGetTransactionsQuery({
    variables: {
      orderBy: '-created'
    },
    fetchPolicy: 'cache-and-network'
  });
  const {
    data: hkdEnquiryData,
    loading: hkdEnquiryLoading,
    error: hkdEnquiryError
  } = useGetHkdEnquiryQuery();
  const {
    data: multiEnquiryData,
    loading: multiEnquiryLoading,
    error: multiEnquiryError
  } = useGetMultiCurrencyEnquiryQuery();
  const {
    data: firmBalanceData,
    loading: firmBalanceLoading,
    error: firmBalanceError
  } = useGetFirmBalanceQuery();
  const {
    data: banks,
    loading: getBanksLoading,
    error: getBanksError
  } = useGetBanksQuery();

  const {
    data: exchangeRateData,
    loading: exchangeRateLoading,
    error: exchangeRateError,
    refetch: refetchExchangeRate
  } = useGetExchangeRateQuery();

  const {
    data: allExchangeRatesData,
    loading: allExchangeRatesLoading,
    error: allExchangeRatesError
  } = useGetAllExchangeRatesQuery();

  const {
    data: queueData,
    loading: queueLoading,
    error: queueError,
    refetch: refetchQueue
  } = useGetQueueQuery();

  const dispatchTransactions = () => {
    const transactions = transactionsData?.transactions?.edges;
    if (transactions) {
      const depositTransactions = transactions.filter(t => {
        const now = dayjs();
        const updatedDate = dayjs(t?.node?.created);
        const duration = now.diff(updatedDate, 'hours');
        if (
          t?.node?.side ===
            TransactionTransactionActivitiesSideChoices.Deposit &&
          !t.node.isRefunded &&
          t?.node?.transactionStatusCode?.statusCode === 0 &&
          duration > 24
        ) {
          return t;
        }
      });
      if (depositTransactions)
        dispatch(setDepositTransactions(depositTransactions));
      // *-------------------------------------------------------------------------
      const withdrawalTransactions = transactions.filter(
        t =>
          t?.node?.side ===
            TransactionTransactionActivitiesSideChoices.Withdraw &&
          !t.node.isRefunded &&
          t?.node?.transactionStatusCode?.statusCode === 0
      );
      if (withdrawalTransactions)
        dispatch(setWithdrawalTransactions(withdrawalTransactions));
      // *-------------------------------------------------------------------------
      const OtherTransactions = transactions.filter(
        t => t?.node?.transactionStatusCode?.statusCode === 600
      );
      if (withdrawalTransactions)
        dispatch(setOtherTransactions(OtherTransactions));
      // *-------------------------------------------------------------------------
      const inQueueDepositTransactions = transactions.filter(
        t =>
          t?.node?.side ===
            TransactionTransactionActivitiesSideChoices.Deposit &&
          t?.node?.transactionStatusCode?.statusCode! >= 110 &&
          t?.node?.transactionStatusCode?.statusCode! < 150
      );
      if (inQueueDepositTransactions)
        dispatch(setInQueueDepositTransactions(inQueueDepositTransactions));
      // *-------------------------------------------------------------------------
      const actionRequiredDepositTransactions = transactions!.filter(
        t =>
          t?.node?.side ===
            TransactionTransactionActivitiesSideChoices.Deposit &&
          ((t?.node?.transactionStatusCode?.statusCode! >= 210 &&
            t?.node?.transactionStatusCode?.statusCode! < 600) ||
            t.node.transactionStatusCode?.statusCode === 700 ||
            t.node.transactionStatusCode?.statusCode === 800 ||
            t.node.transactionStatusCode?.statusCode === 900)
      );
      if (actionRequiredDepositTransactions)
        dispatch(
          setActionRequiredDepositTransactions(
            actionRequiredDepositTransactions
          )
        );

      const completedDepositTransactions = transactions!.filter(t => {
        const now = dayjs();
        const updatedDate = dayjs(t?.node?.created);
        const duration = now.diff(updatedDate, 'hours');

        if (
          t?.node?.side ===
            TransactionTransactionActivitiesSideChoices.Deposit &&
          !t.node.isRefunded &&
          t.node.transactionStatusCode?.statusCode === 0 &&
          duration <= 24
        ) {
          return t;
        }
      });

      if (completedDepositTransactions) {
        dispatch(setCompletedDepositTransactions(completedDepositTransactions));
      }
      // *-------------------------------------------------------------------------
      const inQueueWithdrawalTransactions = transactions!.filter(
        t =>
          t?.node?.side ===
            TransactionTransactionActivitiesSideChoices.Withdraw &&
          t?.node?.transactionStatusCode?.statusCode! >= 160 &&
          t?.node?.transactionStatusCode?.statusCode! < 260
      );
      if (inQueueWithdrawalTransactions)
        dispatch(
          setInQueueWithdrawalTransactions(inQueueWithdrawalTransactions)
        );
      // *-------------------------------------------------------------------------
      const actionRequiredWithdrawalTransactions = transactions!.filter(
        t =>
          t?.node?.side ===
            TransactionTransactionActivitiesSideChoices.Withdraw &&
          ((t?.node?.transactionStatusCode?.statusCode! >= 260 &&
            t?.node?.transactionStatusCode?.statusCode! < 600) ||
            t.node.transactionStatusCode?.statusCode === 800 ||
            t.node.transactionStatusCode?.statusCode === 900)
      );
      if (actionRequiredWithdrawalTransactions)
        dispatch(
          setActionRequiredWithdrawalTransactions(
            actionRequiredWithdrawalTransactions
          )
        );
      // *-------------------------------------------------------------------------
      const unknownTransactions = transactions.filter(transaction =>
        [900].includes(transaction?.node?.transactionStatusCode?.statusCode!)
      );
      if (unknownTransactions) {
        dispatch(setUnknownDepositTransactions(unknownTransactions));
      }
      // *-------------------------------------------------------------------------

      const returnedTransactions = transactions.filter(transaction =>
        [700].includes(transaction?.node?.transactionStatusCode?.statusCode!)
      );

      dispatch(setReturnedTransactions(returnedTransactions));

      // *-------------------------------------------------------------------------
      const rejectedAndReturnedDepositTransactions = transactions.filter(
        transaction =>
          transaction?.node?.side === 'DEPOSIT' &&
          transaction.node.isRefunded &&
          [0].includes(transaction?.node?.transactionStatusCode?.statusCode!)
      );

      if (rejectedAndReturnedDepositTransactions) {
        dispatch(
          setrejectedAndReturnedDepositTransactions(
            rejectedAndReturnedDepositTransactions
          )
        );
      }
      // *-------------------------------------------------------------------------
      const rejectedWithdrawalTransactions = transactions.filter(
        transaction =>
          transaction?.node?.side === 'WITHDRAW' &&
          transaction.node.isRefunded &&
          [0].includes(transaction?.node?.transactionStatusCode?.statusCode!)
      );
      if (rejectedWithdrawalTransactions) {
        dispatch(
          setRejectedWithdrawalTransactions(rejectedWithdrawalTransactions)
        );
      }
    }
  };

  const dispatchRemittances = () => {
    if (remittancesData) {
      const remittances = remittancesData.remittances?.edges;
      if (remittances) {
        const waitingApprovalRemittances = remittances.filter(
          remittance =>
            remittance?.node?.status ===
            TransactionTransactionRemittanceStatusChoices.Needapproval
        );
        if (waitingApprovalRemittances) {
          dispatch(setWaitingApprovalTransactions(waitingApprovalRemittances));
        }

        // *-------------------------------------------------------------------------

        const onHoldRemittances = remittances.filter(
          remittance =>
            remittance?.node?.status ===
            TransactionTransactionRemittanceStatusChoices.Onhold
        );

        if (onHoldRemittances) {
          dispatch(setOnHoldTransactions(onHoldRemittances));
        }

        // *-------------------------------------------------------------------------
        const rejectedTransactions = remittances.filter(
          remittance =>
            remittance?.node?.status ===
            TransactionTransactionRemittanceStatusChoices.Rejected
        );
        if (rejectedTransactions) {
          dispatch(setRejectedTransactions(rejectedTransactions));
        }
        // *-------------------------------------------------------------------------
      }
    }
  };

  const dispatchUnMatchedTransactions = () => {
    let unMatchedTransactionsQuery: Array<TransactionActivitiesTypeEdge> = [];
    let unMatchedRemittancesQuery: Array<RemittanceTypeEdge> = [];

    if (remittancesData) {
      const remittances = remittancesData.remittances?.edges;
      if (remittances) {
        unMatchedRemittancesQuery = remittances.filter(
          remittance =>
            remittance?.node?.status ===
            TransactionTransactionRemittanceStatusChoices.Unmatched
        ) as Array<RemittanceTypeEdge>;
      }
    }
    // *-------------------------------------------------------------------------
    if (transactionsData) {
      const transactions = transactionsData?.transactions?.edges;
      if (transactions) {
        unMatchedTransactionsQuery = transactions.filter(transaction =>
          [200, 305, 502, 503, 504, 800].includes(
            transaction?.node?.transactionStatusCode?.statusCode!
          )
        ) as Array<TransactionActivitiesTypeEdge>;
      }
    }

    const combineUnMatchedTransactions = [
      ...unMatchedRemittancesQuery,
      ...unMatchedTransactionsQuery
    ];
    dispatch(setUnMatchedTransactions(combineUnMatchedTransactions));
  };

  const clearReduxMessage = () => {
    dispatch(setClearMessage());
    dispatch(setClearTransactionMessage());
  };

  useEffect(() => {
    dispatch(setIsTransactionLoading(true));
    if (remittancesData) dispatchRemittances();
    if (transactionsData) dispatchTransactions();
    dispatchUnMatchedTransactions();
    if (banks) dispatch(setBanks(banks?.banks));
    if (hkdEnquiryData) {
      dispatch(setHkdEnquiry(hkdEnquiryData.hkdEnquiry?.accountBalResponse));
      if (
        Number(hkdEnquiryData.hkdEnquiry?.accountBalResponse.clsAvailableBal) <
        5100000
      ) {
        dispatch(setOpenDBSRunningLowModal(true));
      }
    }

    if (multiEnquiryData) {
      const enquiry =
        multiEnquiryData.multiCcyEnquiry?.accountBalResponse?.accountBalResponseDtl?.find(
          enquiry => enquiry?.accountCcy === 'HKD'
        )!;
      dispatch(setMultiCcyEnquiry(enquiry!));
    }
    if (firmBalanceData) {
      dispatch(setFirmBalance(firmBalanceData.firmBalance));
      if (Number(firmBalanceData.firmBalance?.cashTransferable) < 40000) {
        dispatch(setOpenAlpacaRunningLowModal(true));
      }
    }
    if (exchangeRateData)
      dispatch(setExchangeRate(exchangeRateData.exchangeRate));
    if (allExchangeRatesData)
      dispatch(setAllExchangeRates(allExchangeRatesData.allExchangeRates));
    if (queueData) dispatch(setQueue(queueData.queue));
    clearReduxMessage();
  }, [
    remittancesData,
    transactionsData,
    hkdEnquiryData,
    multiEnquiryData,
    banks,
    firmBalanceData,
    exchangeRateData,
    allExchangeRatesData,
    queueData
  ]);

  useEffect(() => {
    const getProfile = async () => {
      const response = await dispatch(getUserProfile());
      if (
        response.type === 'getUserProfile/rejected' &&
        response.payload.includes('401')
      ) {
        navigate('/login');
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    refetchRemittances({
      orderBy: '-created'
    });
    refetchTransactions({
      orderBy: '-created'
    });
    refetchExchangeRate();
    refetchQueue();
  }, [successMessageTransaction, errorMessageTransaction]);

  useEffect(() => {
    const { pathname } = location;

    if (
      [
        pathNames.deposits,
        pathNames.withdrawals,
        pathNames.transactionHistory,
        pathNames.transactionsIbkr
      ].includes(pathname as pathNames)
    ) {
      refetchTransactions({
        orderBy: '-created'
      });
    }

    if (pathname === pathNames.waitingApprovals) {
      refetchRemittances({
        orderBy: '-created'
      });
    }
    clearReduxMessage();
  }, [location.pathname]);

  useEffect(() => {
    if (!transactionsDataLoading || !remittancesDataLoading) {
      dispatch(setIsTransactionLoading(false));
    }
  }, [transactionsDataLoading, remittancesDataLoading]);

  return (
    <div id='main-container'>
      <Sidebar />
      <div className='outlet-container'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
