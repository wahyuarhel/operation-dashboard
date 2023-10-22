import React, { useState, useEffect, useMemo } from 'react';
import { Container } from 'reactstrap';

import Header from '../../components/Header';
import StatusTab from '../../components/StatusTab/index';
import TransactionTable from '../../components/TransactionTable/index';
import { statusTabs, OptionSearchColumnObject } from '../../types/user_types';
import { tab } from 'types/transaction_types';

interface TransactionsIbkrProps {}

const TransactionsIbkr: React.FunctionComponent = (
  props: TransactionsIbkrProps
) => {
  const [selectedTab, setSelectedTab] = useState<string>(tab.sentToIbkr);
  const [selectedTransactionIdx, setSelectedTransactionIdx] = useState([]);
  const [statusTabs, setStatusTabs] = useState<statusTabs[]>([]);
  const [selectedSearchColumns, setSelectedSearchColumns] =
    useState<OptionSearchColumnObject>(Object);
  const [keywordSearchTransaction, setKeywordSearchTransaction] = useState<
    string | number
  >('');

  useEffect(
    () => {
      const statusTabs = [
        {
          name: tab.sentToIbkr,
          isActive: true,
          total: 0
        },
        {
          name: tab.receivedFromIbkr,
          isActive: false,
          total: 0
        }
      ];
      const updateStatusTabs = statusTabs.map(sts => {
        if (sts.name === selectedTab) {
          sts.isActive = true;
        }
        return sts;
      });
      setStatusTabs(updateStatusTabs);
    },
    [
      // inQueueWithdrawalTransactions,
      // actionRequiredWithdrawalTransactions,
      // returnedWithdrawalTransactions
    ]
  );

  const SENT_TO_IBKR_COLUMNS = useMemo(
    () => [
      {
        Header: 'Transaction ID',
        accessor: 'node.transactionRemittances.accountId',
        width: 200
      },
      {
        Header: 'Date Sent',
        accessor: '',
        width: 200
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

  const RECEIVED_TO_IBKR_COLUMNS = useMemo(
    () => [
      {
        Header: 'Transaction ID',
        accessor: 'node.transactionRemittances.accountId',
        width: 200
      },
      {
        Header: 'Date Arrived',
        accessor: 'node.created',
        width: 200
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

  const activeDataTable = selectedTab === tab.sentToIbkr ? [] : [];
  const activeColumnTable =
    selectedTab === tab.sentToIbkr
      ? SENT_TO_IBKR_COLUMNS
      : RECEIVED_TO_IBKR_COLUMNS;

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
  return (
    <div>
      <Header title='Transactions - IBKR' />
      <Container>
        <h5 className='description'>
          Shows all transactions sent to or received from IBKR
        </h5>
      </Container>
      <StatusTab statusTabs={statusTabs} handleTabStatus={handleTabStatus} />
      <TransactionTable
        transactionName='transactions-ibkr'
        tableColumns={activeColumnTable}
        tableData={activeDataTable}
        setSelectedTransactionIdx={setSelectedTransactionIdx}
        selectedSearchColumns={selectedSearchColumns}
        setSelectedSearchColumns={setSelectedSearchColumns}
        keywordSearchTransaction={keywordSearchTransaction}
        setKeywordSearchTransaction={setKeywordSearchTransaction}
      />
    </div>
  );
};

export default TransactionsIbkr;
