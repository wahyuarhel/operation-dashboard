import { useMemo } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { BsArrowDownUp } from 'react-icons/bs/';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import {
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useFilters
} from 'react-table';
import { Col, Input, Row, Spinner } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'redux/store/hooks';
import './styles.scss';
import {
  resetUserDetailState,
  setClearMessage,
  filterAccounts,
  sortAccounts
} from 'redux/slice/userSlice';
import LoadingOverlay from 'components/LoadingOverlay';
import {
  AccountType,
  AccountLoraAccountLoraStatusChoices
} from 'graphql/generated/types';
import { resetPpiAnswers } from 'redux/slice/ppiSlice';

const USER_COLUMNS = [
  {
    Header: 'NAME',
    accessor: 'fullName',
    minWidth: 140,
    width: 250
  },
  {
    Header: 'USER ID',
    accessor: 'id',
    minWidth: 100,
    width: 120
  },
  {
    Header: 'EMAIL',
    accessor: 'email',
    minWidth: 140,
    width: 250
  },
  {
    Header: 'LAST SIGN IN',
    accessor: 'lastLogin',
    minWidth: 100,
    width: 200
  },
  {
    Header: 'ACTIVE SINCE',
    accessor: 'dateJoined',
    minWidth: 100,
    width: 200
  },
  {
    Header: 'STATUS',
    accessor: 'status',
    minWidth: 140,
    width: 200,
    //REMOVE ONBOARDING USER FROM THE USER TABLE
    filter: (rows: any, columnIds: any, filterValue: any) =>
      rows.filter(
        row => row.original.status != filterValue && row.original.status != null
      )
  }
];

function CustomCell({ value, row: { index, values }, column: { id } }) {
  const statusStyle = {
    orange: {
      borderRadius: '8px',
      backgroundColor: '#FFE8C7',
      color: '#F29100',
      fontWeight: 'bold'
    },
    red: {
      borderRadius: '8px',
      backgroundColor: '#F3B9B9',
      color: '#C33335',
      fontWeight: 'bold'
    },
    green: {
      borderRadius: '8px',
      backgroundColor: '#ADEBA3',
      color: '#009821',
      fontWeight: 'bold'
    },
    black: {
      borderRadius: '8px',
      backgroundColor: '#000000',
      color: '#FFFFFF',
      fontWeight: 'bold'
    },
    blue: {
      borderRadius: '8px',
      backgroundColor: '#006EF2',
      color: '#FFFFFF',
      fontWeight: 'bold'
    }
  };
  const renderStatus = (status: string) => {
    const formattedStatus = status ? status.replace(/_/g, ' ') : 'ONBOARDING';
    if (
      [
        'ONBOARDING',
        'PENDING LORA',
        'PENDING IBKR',
        'CONSIDER ONFIDO',
        'AWAITING USER ACTION'
      ].includes(formattedStatus)
    ) {
      return statusStyle.orange;
    }
    if (
      [
        'SUSPENDED',
        'PENDING SUSPEND',
        'REJECTED',
        'REJECTED IBKR',
        'REJECTED LORA'
      ].includes(formattedStatus)
    ) {
      return statusStyle.red;
    }

    if (
      ['REQUESTED CLOSE', 'PENDING CLOSE', 'CLOSED'].includes(formattedStatus)
    ) {
      return statusStyle.black;
    }

    if (formattedStatus === 'FINAL APPROVAL REQUIRED') {
      return statusStyle.blue;
    }

    if (formattedStatus === 'ACTIVE') {
      return statusStyle.green;
    }
  };
  if (id === 'fullName') {
    return (
      <div className='d-flex flex-row align-items-center'>
        <p className='custom-cell-text'>
          {value
            ? value.toUpperCase()
            : values['email'].split('@')[0].toUpperCase()}
        </p>
      </div>
    );
  } else if (['lastLogin', 'dateJoined'].includes(id)) {
    return (
      <p className='custom-cell-text'>
        {value ? dayjs(value).format('DD/MM/YYYY') : ''}
      </p>
    );
  } else if (id === 'status') {
    return (
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <div className='d-flex justify-content-center w-100'>
          <p
            className='d-inline custom-cell-text'
            style={{
              padding: '10px',
              textAlign: 'center',
              ...renderStatus(value)
            }}
          >
            {value ? value.replace(/_/g, ' ') : 'ONBOARDING'}
          </p>
        </div>
        <HiDotsVertical size={30} color='#767676' />
      </div>
    );
  } else if (id === 'isActive') {
    return <p className='custom-cell-text'>{value ? 'ACTIVE' : 'SUSPEND'}</p>;
  } else {
    return <p className='custom-cell-text'>{value}</p>;
  }
}

const defaultColumn = {
  Cell: CustomCell
};

const sortByDefaultValue = {
  label: 'Status - All',
  value: 'ALL'
};

const sortByOptions = [
  {
    label: 'All',
    value: 'ALL'
  },
  {
    label: 'Active',
    value: 'ACTIVE'
  },
  {
    label: 'Awaiting User Action',
    value: 'AWAITING_USER_ACTION'
  },
  {
    label: 'Closed',
    value: 'CLOSED'
  },
  {
    label: 'Final Approval Required',
    value: 'FINAL_APPROVAL_REQUIRED'
  },
  {
    label: 'Consider',
    value: 'CONSIDER'
  },
  {
    label: 'Pending IBKR',
    value: 'PENDING_IBKR'
  },
  {
    label: 'Pending Lora',
    value: 'PENDING_LORA'
  },
  {
    label: 'Rejected Lora',
    value: 'REJECTED_LORA'
  },
  {
    label: 'Rejected IBKR',
    value: 'REJECTED_IBKR'
  },
  {
    label: 'Requested Close',
    value: 'REQUESTED_CLOSE'
  },
  {
    label: 'Suspended',
    value: 'SUSPENDED'
  },
  {
    label: 'Pending Suspend',
    value: 'PENDING_SUSPEND'
  }
];

function UserTable(props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accounts, updateAccounts, selectedStatus, keywordSearch } =
    useAppSelector(state => state.user);

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
      columns: useMemo(() => USER_COLUMNS, []),
      data: useMemo(
        () =>
          selectedStatus.value != 'ALL' || keywordSearch
            ? updateAccounts
            : accounts,
        [accounts, updateAccounts]
      ),
      initialState: {
        //REMOVE ONBOARDING USER FROM THE USER TABLE
        filters: [
          {
            id: 'status',
            value: AccountLoraAccountLoraStatusChoices.Onboarding
          }
        ],

        sortBy: [
          {
            id: 'dateJoined',
            desc: true
          }
        ]
      },
      defaultColumn
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handleSearchUsers = (keyword: string) => {
    dispatch(filterAccounts(keyword));
  };

  const handleSortUsers = status => {
    dispatch(sortAccounts(status));
  };

  const handleClickOnRow = (data: AccountType) => {
    dispatch(setClearMessage());
    dispatch(resetUserDetailState());
    dispatch(resetPpiAnswers());
    navigate(`/user-detail/${data.id}`, { state: data });
  };

  const renderPaginationInterval = (pages: number[], pageIndex: number) => {
    return pages.map((page: number, i: number) => {
      if (page <= 3 || page == pageOptions.length - 1) {
        return (
          <strong
            key={i}
            onClick={() => gotoPage(page)}
            className='pagination-page'
            style={{
              color: pageIndex + 1 == page + 1 ? '#222E41' : '#006EF2'
            }}
          >
            {page == pageOptions.length - 1 &&
            page == pageIndex &&
            pageOptions.length > 4 ? (
              <strong key={i} className='dot-text'>
                ...
              </strong>
            ) : null}
            {`${page + 1}`}
            {page == 3 && pageIndex <= 3 ? (
              <strong key={i} className='dot-text'>
                ...
              </strong>
            ) : null}
          </strong>
        );
      } else {
        return pageIndex + 1 == page + 1 ? (
          <strong
            key={i}
            onClick={() => gotoPage(page)}
            className='pagination-page'
            style={{
              color: '#222E41'
            }}
          >
            {`${page + 1}`}
            {page >= 4 && pageIndex < pageOptions.length - 1 ? (
              <strong key={i} className='dot-text'>
                ...
              </strong>
            ) : null}
          </strong>
        ) : null;
      }
    });
  };

  const renderSearchBar = () => (
    <Row className='search-outer-container'>
      <Col className='search-inner-container'>
        <div className='d-flex flex-row align-items-center'>
          <p>SORT BY</p>
          <Select
            defaultValue={sortByDefaultValue}
            options={sortByOptions}
            isSearchable={false}
            placeholder='Column'
            value={selectedStatus}
            onChange={handleSortUsers}
            classNamePrefix='react-select'
            styles={{
              container: (provided, state) => ({
                ...provided,
                width: '200px',
                fontFamily: 'Ubuntu',
                marginLeft: '20px',
                position: 'relative',
                zIndex: 15
              })
            }}
          />
        </div>
        <div className='d-flex' style={{ width: '20%' }}>
          <FiSearch size={20} color='#737373' className='search-icon' />
          <Input
            type='search'
            style={{ fontFamily: 'Ubuntu', borderRadius: '8px' }}
            placeholder='Search Users'
            className='field-input'
            value={keywordSearch}
            onChange={e => handleSearchUsers(e.target.value)}
          />
        </div>
      </Col>
    </Row>
  );
  return (
    <div id='user-table-container'>
      <LoadingOverlay
        active={props.loading}
        placeholder={'Loading user data'}
      />
      <div className='container pt-3'>
        <div className='table-wrapper'>
          <h2>{`Active Users (${accounts!.length})`}</h2>
          {renderSearchBar()}
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => {
                    const { id } = column;
                    return (
                      <th
                        key={i}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        style={{
                          textAlign:
                            id == 'loraAccount.loraStatus' ? 'center' : 'left',
                          justifyContent:
                            id == 'loraAccount.loraStatus' ? 'center' : 'left',
                          width: column.width,
                          minWidth: column.minWidth
                        }}
                      >
                        {column.render('Header')}
                        <span>
                          <BsArrowDownUp size={15} className='mx-2' />
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
                  <tr key={indexRow} {...row.getRowProps()}>
                    {row.cells.map((cell, i) => {
                      return (
                        <td
                          key={i}
                          {...cell.getCellProps()}
                          onClick={() => handleClickOnRow(row.original)}
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
    </div>
  );
}

export default UserTable;
