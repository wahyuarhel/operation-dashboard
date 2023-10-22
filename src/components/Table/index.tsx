import React, { HTMLProps, useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';
import { Row, Col, Input } from 'reactstrap';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { BsArrowDownUp } from 'react-icons/bs/';
import dayjs from 'dayjs';
import _ from 'lodash';
import { formatNumber } from '../../utils/formatNumber';
import IndividualUserModal from '../IndividualUserModal';
import ProofOfRemittanceModal from '../ProofOfRemittanceModal';
import {
  OptionPageSizeObject,
  OptionSearchColumnObject
} from '../../types/user_types';
import {
  TransactionActivitiesType,
  RemittanceTypeEdge,
  TransactionActivitiesTypeEdge,
  TransactionTransactionActivitiesSideChoices
} from '../../graphql/generated/types';
import { images, icons, COLORS } from '../../constants';
import { exportTable } from '../../utils/exportTable';
import './styles.scss';
import AlertMessage from '../AlertMessage';
import { setClearMessage } from '../../redux/slice/transactionSlice';
import { useAppDispatch } from '../../redux/store/hooks';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { tab, cols } from 'types/transaction_types';

const dt = new Date();
const tomorrow = new Date();
tomorrow.setDate(dt.getDate() + 1);
const pageSizeOptions: OptionPageSizeObject[] = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 }
];

const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type='checkbox'
      ref={ref}
      className={className + 'cursor-pointer'}
      {...rest}
    />
  );
};

function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData
}) {
  const [value, setValue] = React.useState(initialValue);
  const [date, onChangeDate] = useState(new Date());

  const onChange = e => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [
    'node.remittanceProofs',
    'node.transactionRemittances.remittanceProofs'
  ].includes(id) &&
    value &&
    value.length > 0 ? (
    <img style={{ cursor: 'pointer' }} src={images.download} />
  ) : id === 'action' ? (
    <p
      style={{
        cursor: 'pointer',
        color: '#0036FF'
      }}
    >
      Move to Transaction History
    </p>
  ) : (
    <p
      style={{
        cursor: 'pointer',
        fontFamily: 'Ubuntu',
        textAlign: 'center'
      }}
    >
      {[
        'node.created',
        'node.updated',
        'node.finishTime',
        'node.sendbackTime',
        'node.rejectedTime'
      ].includes(id) && value !== null
        ? dayjs(value).format('DD/MM/YYYY HH:mm:ss')
        : [
            'node.hkdAmount',
            'node.usdAmount',
            'node.inputtedAmount',
            'Amount (HKD)'
          ].includes(id)
        ? formatNumber(value)
        : id === 'node.exchangeRate'
        ? Number(value).toFixed(2)
        : id === 'node.transactionId'
        ? value
          ? 'Transaction'
          : 'Remittance'
        : value}
    </p>
  );
}

const defaultColumn = {
  Cell: EditableCell,
  width: 'auto'
};

function Table({
  columns,
  data,
  updateMyData,
  skipPageReset,
  searchColumnOptions,
  selectedColumn,
  setSelectedColumn,
  transactionName,
  selectedTabMenu,
  setSelectedTransactionIdx,
  keywordSearchTransaction,
  setKeywordSearchTransaction,
  handleMoveToTransactionHistory
}) {
  const dispatch = useAppDispatch();
  const [isProofOfRemittanceOpen, setIsProofOfRemittanceOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openIndividualUser, setOpenIndividualUser] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionActivitiesType | null>(null);
  const [selectedRemittance, setSelectedRemittance] =
    useState<RemittanceTypeEdge | null>(null);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  function handleAlertMessage() {
    setOpenAlertMessage(!openAlertMessage);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, selectedRowIds }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => {
              return (
                <div className='indeterminate-container'>
                  <p
                    {...getToggleAllRowsSelectedProps()}
                    className='text-white position-absolute translate-middle top-50 start-50'
                  >
                    #
                  </p>
                </div>
              );
            },
            Cell: ({ row }) => {
              return (
                <div className='indeterminate-container'>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                  <p>{row.index + 1}</p>
                </div>
              );
            }
          },
          ...columns
        ];
      });
    }
  );

  useEffect(() => {
    const keys = Object.keys(selectedRowIds);
    setSelectedTransactionIdx(keys);
  }, [selectedRowIds]);

  const downloadZipFile = (filename, urls) => {
    if (!urls) return;
    const zip = new JSZip();
    const folder = zip.folder('proof_files'); // folder name where all files will be placed in
    urls.forEach(url => {
      const blobPromise = fetch(url).then(r => {
        if (r.status === 200) return r.blob();
        return Promise.reject(new Error(r.statusText));
      });
      const name = url.substring(url.lastIndexOf('/') + 1);
      folder?.file(name, blobPromise);
    });
    zip.generateAsync({ type: 'blob' }).then(blob => saveAs(blob, filename));
  };

  const handleClickOnRow = (column: string, data) => {
    dispatch(setClearMessage());
    if (column !== 'selection') {
      if (transactionName === 'waiting approval') {
        if (column === 'node.remittanceProofs') {
          const proofFile = data?.node?.remittanceProofs.map(
            item => item.proofFile
          );
          if (!_.isEmpty(proofFile)) {
            downloadZipFile(
              `remittance_id_${data?.node?.remittanceId}_proof_files.zip`,
              proofFile
            );
          }
        } else {
          if (selectedTabMenu === tab.return) {
            if (column === 'action') {
              handleMoveToTransactionHistory(data);
            }
            return;
          }
          if (
            [tab.unMatched, tab.unknownDeposit, tab.unknown].includes(
              selectedTabMenu
            )
          ) {
            if (
              [
                TransactionTransactionActivitiesSideChoices.Deposit,
                TransactionTransactionActivitiesSideChoices.Withdraw
              ].includes(data.node.side)
            ) {
              setOpenIndividualUser(true);
              setSelectedTransaction(data.node);
            } else {
              setIsProofOfRemittanceOpen(true);
              setSelectedRemittance(data);
            }
          } else {
            setIsProofOfRemittanceOpen(true);
            setSelectedRemittance(data);
          }
        }
      } else {
        if (column === 'node.transactionRemittances.remittanceProofs') {
          const proofFile =
            data?.node.transactionRemittances.remittanceProofs.map(
              item => item.proofFile
            );
          if (!_.isEmpty(proofFile)) {
            downloadZipFile(
              `remittance_id_${data?.node?.remittanceId}_proof_files.zip`,
              proofFile
            );
          }
        } else {
          setOpenIndividualUser(true);
          setSelectedTransaction(data.node);
        }
      }
    }
  };

  const handleSelectionPageSize = (option: OptionPageSizeObject | null) =>
    setPageSize(option!.value);

  const handleSelectColumn = (option: OptionSearchColumnObject | null) =>
    setSelectedColumn(option);

  const handleExportTable = (option: OptionSearchColumnObject | null) => {
    const columLabels = columns
      .filter(el => el.Header != '')
      .map(col => col.Header);

    const accessors = columns
      .filter(col => col.accessor !== '#')
      .map(el => el.accessor);

    const dataToExport = data
      .map(trans => _.pick(trans, accessors))
      .map(t => t.node);

    exportTable(
      columLabels,
      dataToExport,
      `${transactionName} of ${selectedTabMenu.toLowerCase()}`,
      option!.value
    );
  };

  const renderPaginationInterval = (pages: number[], pageIndex: number) => {
    return pages.map((page: number, i: number) => {
      if (page == 4)
        return (
          <strong key={i} className='dot-text'>
            ...
          </strong>
        );
      if (page <= 3 || page == pageOptions.length - 1)
        return (
          <strong
            key={i}
            onClick={() => gotoPage(page)}
            className='pagination-page'
            style={{
              color: pageIndex + 1 == page + 1 ? '#222E41' : '#006EF2'
            }}
          >
            {`${page + 1}  `}
          </strong>
        );
    });
  };

  const onChangeSearchInput = e => {
    e.preventDefault();
    setKeywordSearchTransaction(e.target.value);
  };

  function descriptionOfTable(): JSX.Element | null {
    switch (selectedTabMenu) {
      case tab.onHold:
        return (
          <p className='table-description'>
            Shows Deposit Requests that have been put on hold by the admin
          </p>
        );
      case tab.unMatched:
        return (
          <p className='table-description'>
            Shows transactions or DRs that the system has been unable to match,
            or transactions that have been unmatched for more than 24 hours
          </p>
        );
      case tab.return:
        return (
          <p className='table-description'>
            Shows transactions that must be returned back to the user. This
            table does not contain deposit requests
          </p>
        );
      case tab.reject:
        return (
          <p className='table-description'>
            Shows rejected deposit requests from the app. This table does not
            contain transactions. Any deposit requests here cannot be moved
            anywhere else
          </p>
        );
      case tab.unknown:
        return (
          <p className='table-description'>
            Shows transactions that are Unknown. This may be transactions that
            do not have bank account details, or transactions from a third party
            that is not an Asklora user
          </p>
        );
      case tab.completedDeposits:
        return (
          <p className='table-description'>
            Shows all deposits that have arrived in DBS over 24H period. Will
            refresh at {dayjs(tomorrow).format('DD/MM/YYYY')} 12:00AM
          </p>
        );
      default:
        return null;
    }
  }

  const renderSearchBar = () => (
    <Row className='search-outer-container'>
      <Col className='search-inner-container' xs={7}>
        {transactionName !== 'transactions-ibkr' ? (
          <Select
            options={searchColumnOptions}
            placeholder='Column'
            value={!_.isEmpty(selectedColumn) ? selectedColumn : null}
            onChange={handleSelectColumn}
            classNamePrefix='react-select'
            isSearchable={false}
            styles={{
              container: (provided, state) => ({
                ...provided,
                marginRight: '20px',
                fontFamily: 'Ubuntu',
                width: '120px'
              })
            }}
          />
        ) : null}
        <div className='search-container'>
          <Input
            type='search'
            style={{ fontFamily: 'Ubuntu', borderRadius: '8px' }}
            placeholder='Search table'
            className='field-input'
            value={keywordSearchTransaction}
            onChange={e => onChangeSearchInput(e)}
          />
          <div className='search-icon'>
            <FiSearch size={20} color='#737373' />
          </div>
        </div>
        {descriptionOfTable()}
        {['transaction history', 'transactions-ibkr'].includes(
          transactionName
        ) && (
          <div className='export-container'>
            <img src={icons.exportIcon} className='export-icon' />
            <Select
              options={[
                {
                  label: 'CSV',
                  value: '.csv'
                },
                {
                  label: 'PDF',
                  value: '.pdf'
                },
                {
                  label: 'XLSX',
                  value: '.xlsx'
                }
              ]}
              isMulti={false}
              placeholder='Export'
              onChange={handleExportTable}
              isSearchable={false}
              styles={{
                indicatorSeparator: base => ({
                  ...base,
                  display: 'none'
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: 10,
                  paddingLeft: '25px'
                })
              }}
            />
          </div>
        )}
      </Col>
      <Col className='show-container' xs={5}>
        <p className='ubuntu-font_400'>Show</p>
        <Select
          defaultValue={pageSizeOptions[0]}
          options={pageSizeOptions}
          isMulti={false}
          isSearchable={false}
          placeholder='10'
          onChange={handleSelectionPageSize}
          classNamePrefix='react-select'
          styles={{
            container: (provided, state) => ({
              ...provided,
              marginLeft: '10px',
              marginRight: '10px'
            })
          }}
        />
        <p className='ubuntu-font_400'>Entries</p>
      </Col>
    </Row>
  );

  return (
    <div id='table-container'>
      <IndividualUserModal
        openIndividualUser={openIndividualUser}
        setOpenIndividualUser={setOpenIndividualUser}
        transactionName={
          transactionName === 'waiting approval' ? 'deposits' : transactionName
        }
        transaction={selectedTransaction!}
        selectedTabMenu={selectedTabMenu}
      />
      <ProofOfRemittanceModal
        isProofOfRemittanceOpen={isProofOfRemittanceOpen}
        setIsProofOfRemittanceOpen={setIsProofOfRemittanceOpen}
        isLoading={isLoading}
        remittance={selectedRemittance!}
      />
      <AlertMessage
        isOpen={openAlertMessage}
        toggle={handleAlertMessage}
        type='success'
        size='sm'
        title='Match Successful'
      />
      <div className='table-wrapper'>
        {renderSearchBar()}
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => {
                  return (
                    <th
                      key={i}
                      {...column.getHeaderProps(
                        column.getSortByToggleProps([
                          {
                            style: {
                              width: i == 0 ? 50 : column.width,
                              color: column.color
                            }
                          }
                        ])
                      )}
                    >
                      {column.render('Header')}
                      <span className='mx-2'>
                        {[
                          cols.userId,
                          cols.date,
                          cols.name,
                          cols.userType,
                          cols.amountToReturn,
                          cols.journalId,
                          cols.dateCompleted,
                          cols.amount,
                          cols.dateReturned,
                          cols.transactionId,
                          cols.dateSent,
                          cols.dateArrived,
                          cols.bankAccountNo
                        ].includes(column.Header) &&
                        (transactionName === 'waiting approval' ||
                          transactionName === 'transaction history' ||
                          transactionName === 'transactions-ibkr') ? (
                          <BsArrowDownUp size={15} />
                        ) : null}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, indexRow) => {
              prepareRow(row);
              return (
                <tr
                  key={indexRow}
                  {...row.getRowProps()}
                  style={{
                    backgroundColor: row?.isSelected ? '#D9D9D9' : '#FFF'
                  }}
                >
                  {row.cells.map((cell, i) => {
                    const { value } = cell;
                    const { id } = cell.column;
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps({
                          style: {
                            width: i == 0 ? 50 : cell.width
                          }
                        })}
                        onClick={() => handleClickOnRow(id, row.original)}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='pagination'>
        <FiChevronLeft
          size={25}
          onClick={() => previousPage()}
          color={!canPreviousPage ? '#222E41' : '#006EF2'}
          style={{ cursor: 'pointer' }}
        />
        {renderPaginationInterval(pageOptions, pageIndex)}
        <FiChevronRight
          size={25}
          onClick={() => nextPage()}
          color={!canNextPage ? '#222E41' : '#006EF2'}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

export default Table;
