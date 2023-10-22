import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';

import './styles.scss';
import Table from '../Table';
import { OptionSearchColumnObject } from '../../types/user_types';

interface TransactionTableProps {
  transactionName: string;
  tableColumns?: any[];
  tableData?: any[];
  setSelectedTransactionIdx?: Function;
  selectedSearchColumns: OptionSearchColumnObject | null;
  setSelectedSearchColumns: Function;
  keywordSearchTransaction: string | number;
  setKeywordSearchTransaction: Function;
  selectedTabMenu?: string;
  handleMoveToTransactionHistory?: Function;
}

const TransactionTable: React.FunctionComponent<TransactionTableProps> = (
  props: TransactionTableProps
) => {
  const {
    transactionName,
    tableColumns,
    tableData,
    setSelectedTransactionIdx,
    selectedSearchColumns,
    setSelectedSearchColumns,
    keywordSearchTransaction,
    setKeywordSearchTransaction,
    selectedTabMenu,
    handleMoveToTransactionHistory
  } = props;
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [tableData]);

  return (
    <Container>
      <Table
        selectedTabMenu={selectedTabMenu}
        transactionName={transactionName}
        columns={tableColumns}
        data={tableData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        searchColumnOptions={tableColumns
          ?.filter(
            el =>
              !['PoR', 'PoR (New/Painful)', 'others', ''].includes(el.Header)
          )
          .map(col => {
            return {
              label: col.Header,
              value: col.accessor
            };
          })}
        selectedColumn={selectedSearchColumns}
        setSelectedColumn={setSelectedSearchColumns}
        setSelectedTransactionIdx={setSelectedTransactionIdx}
        keywordSearchTransaction={keywordSearchTransaction}
        setKeywordSearchTransaction={setKeywordSearchTransaction}
        handleMoveToTransactionHistory={handleMoveToTransactionHistory}
      />
    </Container>
  );
};

export default TransactionTable;
