import React, { useState, useEffect, useMemo } from 'react';
import { Container } from 'reactstrap';
import _ from 'lodash';

import Header from '../../components/Header';
import StatusTab from '../../components/StatusTab/index';
import TransactionTable from '../../components/TransactionTable/index';
import { useAppSelector } from '../../redux/store/hooks';
import { statusTabs, OptionSearchColumnObject } from '../../types/user_types';
import { TransactionActivitiesTypeEdge } from '../../graphql/generated/types';
import './styles.scss';
import { tab } from 'types/transaction_types';

interface TransactionHistoryProps {}

const TransactionHistory: React.FunctionComponent<TransactionHistoryProps> = (
  props: TransactionHistoryProps
) => {
  const {
    depositTransactions,
    withdrawalTransactions,
    otherTransactions,
    unknownDepositTransactions,
    refundDepositTransactions,
    rejectedWithdrawalTransactions,
    rejectedAndReturnedDepositTransactions
  } = useAppSelector(state => state.transaction);

  const [selectedTab, setSelectedTab] = useState<string>('Deposits');
  const [selectedTransactionIdx, setSelectedTransactionIdx] = useState([]);
  const [statusTabs, setStatusTabs] = useState<statusTabs[]>([]);
  const [selectedSearchColumns, setSelectedSearchColumns] =
    useState<OptionSearchColumnObject>(Object);
  const [keywordSearchTransaction, setKeywordSearchTransaction] =
    useState<string>('');
  const [searchResult, setSearchResult] = useState<
    TransactionActivitiesTypeEdge[] | []
  >([]);

  useEffect(() => {
    const statusTabs = [
      {
        name: tab.deposits,
        isActive: true,
        total: depositTransactions.length
      },
      {
        name: tab.withdrawals,
        isActive: false,
        total: withdrawalTransactions.length
      },
      {
        name: tab.rejectedOrReturnedDeposit,
        isActive: false,
        total: rejectedAndReturnedDepositTransactions.length
      },
      {
        name: tab.rejectedWithdrawal,
        isActive: false,
        total: rejectedWithdrawalTransactions.length
      }
    ];
    const updateStatusTabs = statusTabs.map(sts => {
      if (sts.name === selectedTab) {
        sts.isActive = true;
      }
      return sts;
    });
    setStatusTabs(updateStatusTabs);
  }, [depositTransactions, withdrawalTransactions, otherTransactions]);

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

  const DEPOSITS_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 150
      },
      {
        Header: 'Journal ID',
        accessor: 'node.journalId',
        width: 150
      },
      {
        Header: 'User Type',
        accessor: 'node.userType',
        width: 150
      },
      {
        Header: 'Date Completed',
        accessor: 'node.finishTime',
        width: 250
      },
      {
        Header: 'Amount (HKD)',
        accessor: 'node.hkdAmount',
        width: 200
      },
      {
        Header: 'PoR (New/Painful)',
        accessor: 'node.transactionRemittances.remittanceProofs'
      },
      {
        Header: '',
        accessor: '#'
      }
    ],
    []
  );

  const WITHDRAWALS_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 150
      },
      {
        Header: 'Journal ID',
        accessor: 'node.journalId',
        width: 300
      },
      {
        Header: 'Date Completed',
        accessor: 'node.finishTime',
        width: 250
      },
      {
        Header: 'Amount (HKD)',
        accessor: 'node.hkdAmount',
        width: 200
      },
      {
        Header: '',
        accessor: '#'
      }
    ],
    []
  );

  const UNKNOWN_DEPOSIT_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 150
      },
      {
        Header: 'Journal ID',
        accessor: 'node.journalId',
        width: 250
      },
      {
        Header: 'User Type',
        accessor: 'node.userType',
        width: 150
      },
      {
        Header: 'Date Returned',
        accessor: 'node.finishTime',
        width: 250
      },
      {
        Header: 'Amount (HKD)',
        accessor: 'node.hkdAmount',
        width: 150
      },
      {
        Header: '',
        accessor: '#'
      }
    ],
    []
  );

  const REJECTED_OR_RETURNED_DEPOSIT_COLUMNS = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'node.accountName',
        width: 150
      },
      {
        Header: 'Date Returned',
        accessor: 'node.sendbackTime',
        width: 250
      },
      {
        Header: 'Bank Account No.',
        accessor: 'node.bankAccountNumber',
        width: 150
      },
      {
        Header: 'Amount (HKD)',
        accessor: 'node.hkdAmount',
        width: 150
      },
      {
        Header: '',
        accessor: '#'
      }
    ],
    []
  );

  const REJECTED_WITHDRAWAL_COLUMNS = useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'node.accountId',
        width: 150
      },
      {
        Header: 'Rejected Date',
        accessor: 'node.rejectedTime',
        width: 250
      },
      {
        Header: 'Requested Amount (HKD)',
        accessor: 'node.hkdAmount',
        width: 150
      },
      {
        Header: '',
        accessor: '#'
      }
    ],
    []
  );

  const activeDataTable =
    selectedTab === tab.deposits
      ? depositTransactions
      : selectedTab === tab.withdrawals
      ? withdrawalTransactions
      : selectedTab === tab.rejectedOrReturnedDeposit
      ? rejectedAndReturnedDepositTransactions
      : rejectedWithdrawalTransactions;
  const activeColumnTable =
    selectedTab === tab.deposits
      ? DEPOSITS_COLUMNS
      : selectedTab === tab.withdrawals
      ? WITHDRAWALS_COLUMNS
      : selectedTab === tab.rejectedOrReturnedDeposit
      ? REJECTED_OR_RETURNED_DEPOSIT_COLUMNS
      : REJECTED_WITHDRAWAL_COLUMNS;

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
  const data =
    keywordSearchTransaction && !_.isEmpty(selectedSearchColumns)
      ? searchResult
      : activeDataTable;
  return (
    <div>
      <Header title='Transaction History' />
      <Container>
        <h5 className='description'>
          The transaction history shows all closed transactions. Click on a
          transaction to view more details
        </h5>
      </Container>
      <StatusTab statusTabs={statusTabs} handleTabStatus={handleTabStatus} />
      <TransactionTable
        transactionName='transaction history'
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

export default TransactionHistory;
