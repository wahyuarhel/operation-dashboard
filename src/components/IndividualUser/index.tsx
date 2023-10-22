import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Col, Input, Row, Spinner } from 'reactstrap';

import {
  TransactionActivitiesType,
  TransactionStatusCodeType
} from '../../graphql/generated/types';
import {
  setErrorMessageTransaction,
  setSuccessMessageTransaction
} from '../../redux/slice/transactionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { formatNumber } from '../../utils/formatNumber';
import StatusTimeline from '../StatusTimeline';
import './styles.scss';
import { tab } from 'types/transaction_types';

interface IndividualUserProps {
  onViewConversation: any;
  transactionName?: string;
  transaction?: TransactionActivitiesType;
  updateNotes: Function;
  additionalNote: string | null;
  setAdditionalNote: Function;
  onUploadImag: () => void;
  selectedFile: File;
  setSelectedFile: Function;
  status: TransactionStatusCodeType;
  selectedTabMenu: tab;
}

const IndividualUser: React.FunctionComponent<IndividualUserProps> = (
  props: IndividualUserProps
) => {
  const dispatch = useAppDispatch();
  const {
    onViewConversation,
    transactionName,
    transaction,
    additionalNote = '',
    setAdditionalNote,
    updateNotes,
    onUploadImag,
    selectedFile,
    setSelectedFile,
    status,
    selectedTabMenu
  } = props;

  const {
    loadingTransaction,
    successMessageTransaction,
    errorMessageTransaction
  } = useAppSelector(state => state.transaction);
  const [editNote, setEditNote] = useState(false);

  const handleUpdateNotes = () => {
    const emptyMessage = {
      source: '',
      message: ''
    };
    setEditNote(!editNote);
    dispatch(setSuccessMessageTransaction(emptyMessage));
    if (editNote) {
      updateNotes();
    } else {
      dispatch(setErrorMessageTransaction(emptyMessage));
    }
  };

  function labelName() {
    switch (transactionName) {
      case 'deposits':
        return 'User Stated Amount (HKD)';
      case 'withdrawals':
        return 'Requested Amount (HKD)';
      case 'others':
        return 'Amount (HKD)';
      case 'transaction history':
        switch (transaction?.side) {
          case 'DEPOSIT':
            return 'User Stated Amount (HKD)';
          default:
            return 'Requested Amount (HKD)';
        }
      default:
        break;
    }
  }
  const statedAmount = userStatedAmountValue();
  function userStatedAmountValue() {
    switch (transactionName) {
      case 'deposits':
        return formatNumber(
          Number(transaction?.transactionRemittances?.inputtedAmount ?? 0)
        );
      case 'withdrawals':
        return formatNumber(Number(transaction?.hkdAmount));
      case 'transaction history':
        switch (transaction?.side) {
          case 'DEPOSIT':
            return formatNumber(
              Number(transaction?.transactionRemittances?.inputtedAmount ?? 0)
            );
          default:
            return formatNumber(Number(transaction?.hkdAmount));
        }
      default:
        break;
    }
  }

  const renderRegisteredInformation = () => (
    <Row>
      <h6 className='title'>Registered Information</h6>
      <Col xs='6'>
        {[
          {
            label: 'User ID',
            value: transaction?.accountId
          },
          {
            label: 'Name',
            value: transaction?.accountName
          },
          {
            label: 'Registered Bank Code',
            value: transaction?.accountBankCode
          },
          {
            label: 'Account Number (LORA)',
            value: transaction?.accountNumber
          },
          {
            label: labelName(),
            value: statedAmount
          }
        ].map((datum, index) => {
          if (index == 4) {
            if (datum.value == undefined) {
              datum.value = 0;
            }
          }
          return (
            <Row className='pb-4' key={index}>
              <Col xs='6' className='ms-0'>
                <p className='label'>{datum.label}</p>
              </Col>
              <Col xs='6' className='d-flex align-items-center me-0'>
                <p className='value'>{datum.value}</p>
              </Col>
            </Row>
          );
        })}
      </Col>
      {transaction?.side === 'DEPOSIT' ? (
        <Col xs='6'>
          {[
            {
              label: 'Admin 1',
              value:
                transaction?.transactionRemittances?.approvedAdmins?.admin1
                  ?.name ??
                transaction?.transactionRemittances?.approvedAdmins?.admin1
                  ?.username
            },
            {
              label: 'Approved Date',
              value:
                transaction?.transactionRemittances?.approvedAdmins?.admin1
                  ?.date ?? ''
            },
            {
              label: 'Admin 2',
              value:
                transaction?.transactionRemittances?.approvedAdmins?.admin2
                  ?.name ??
                transaction?.transactionRemittances?.approvedAdmins?.admin2
                  ?.username
            },
            {
              label: 'Approved Date',
              value:
                transaction?.transactionRemittances?.approvedAdmins?.admin2
                  ?.date ?? ''
            }
          ].map((datum, index) => (
            <Row className='pb-4' key={index}>
              <Col xs='6'>
                <p className='label'>{datum.label}</p>
              </Col>
              <Col xs='6'>
                <p className='value'>
                  {datum.label === 'Approved Date' && datum.value != ''
                    ? dayjs(datum.value).format('DD/MM/YYYY HH:mm:ss')
                    : datum.value}
                </p>
              </Col>
            </Row>
          ))}
        </Col>
      ) : null}
    </Row>
  );

  const labelCreatedDate = (transactionName: string) => {
    if (transactionName === 'transaction history') {
      return transaction?.side.toLowerCase().includes('withdraw')
        ? 'Withdrawal Request Date'
        : 'Deposit Date';
    } else {
      return transactionName === 'withdrawals'
        ? 'Withdrawal Request Date'
        : 'Deposit Date';
    }
  };

  const labelFinishDate = (transactionName: string) => {
    if (transactionName === 'transaction history') {
      return transaction?.side.toLowerCase().includes('withdraw')
        ? 'Withdrawal Complete Date'
        : 'Date Returned';
    } else {
      return transactionName === 'withdrawals'
        ? 'Withdrawal Complete Date'
        : 'Date Returned';
    }
  };

  const renderTransactionDetails = () => (
    <Row className='mb-4'>
      <h6 className='title pb-2'>
        Transaction Details {transactionName === 'deposits' && '(from DBS)'}
      </h6>
      <Col xs='6'>
        {[
          {
            label: 'Transaction UID (LORA)',
            value: transaction?.transactionId ?? 'N/A'
          },
          {
            label: 'Transaction UID (DBS)',
            value: transaction?.paymentId ?? 'N/A'
          },
          {
            label: 'Name (DBS)',
            value: transaction?.accountName ?? 'N/A'
          },
          {
            label: 'Bank Code (DBS)',
            value: transaction?.accountBankCode ?? 'N/A'
          },
          {
            label: 'Account Number (DBS)',
            value: transaction?.accountNumber ?? 'N/A'
          },
          {
            label: 'Amount (HKD)',
            value: transaction?.hkdAmount
              ? formatNumber(Number(transaction?.hkdAmount))
              : 'N/A'
          }
        ].map((datum, index) => (
          <Row className='pb-4' key={index}>
            <Col xs='6'>
              <p className='label'>{datum.label}</p>
            </Col>
            <Col xs='6'>
              <p className='value'>{datum.value}</p>
            </Col>
          </Row>
        ))}
      </Col>
      <Col xs='6'>
        {[
          {
            label: `${labelCreatedDate(transactionName!)}`,
            value: dayjs(transaction?.created).format('DD/MM/YYYY HH:mm:ss'),
            side: ['DEPOSIT', 'WITHDRAW']
          },
          {
            label: `${labelFinishDate(transactionName!)}`,
            value: transaction?.finishTime
              ? dayjs(transaction?.finishTime).format('DD/MM/YYYY HH:mm:ss')
              : '',
            side: ['WITHDRAW']
          },
          {
            label: `${labelFinishDate(transactionName!)}`,
            value: transaction?.isRefunded
              ? dayjs(transaction?.sendbackTime).format('DD/MM/YYYY HH:mm:ss')
              : transaction?.rejectedTime
              ? dayjs(transaction?.rejectedTime).format('DD/MM/YYYY HH:mm:ss')
              : '',
            side: ['DEPOSIT']
          }
        ]
          .filter(el => el.side.includes(transaction?.side!))
          .map((datum, index) => (
            <Row className='pb-4' key={index}>
              <Col xs='6'>
                <p className='label' style={{ width: '100px' }}>
                  {datum.label}
                </p>
              </Col>
              <Col xs='6'>
                <p className='value'>{datum.value}</p>
              </Col>
            </Row>
          ))}
      </Col>
    </Row>
  );

  const renderAdditionalNotes = () => (
    <Row>
      <div className='notes-container'>
        <h6 className='title'>Additional Notes</h6>
        <p className='edit-text ms-3' onClick={handleUpdateNotes}>
          {editNote ? 'Done' : 'Edit'}
          {loadingTransaction.source === 'updateTransactionAction/pending' &&
          loadingTransaction.status ? (
            <Spinner size='sm' style={{ marginLeft: 10, marginTop: 5 }}>
              Loading...
            </Spinner>
          ) : null}
        </p>
      </div>
      <Col xs='12'>
        <Input
          name='text'
          type='textarea'
          disabled={
            !editNote ||
            (loadingTransaction.source === 'updateTransactionAction/pending' &&
              loadingTransaction.status)
          }
          placeholder={
            transaction?.notes
              ? transaction?.notes
              : transaction?.transactionRemittances?.notes
              ? transaction?.transactionRemittances?.notes
              : 'Please write any comments here'
          }
          className={
            'additional-notes-input' + loadingTransaction.status && 'loading'
          }
          value={
            additionalNote
              ? additionalNote
              : transaction?.notes
              ? transaction?.notes
              : transaction?.transactionRemittances?.notes
              ? transaction?.transactionRemittances?.notes
              : ''
          }
          onChange={e => {
            e.preventDefault();
            setAdditionalNote(e.target.value);
          }}
        />
        {errorMessageTransaction.source ===
        'updateTransactionAction/rejected' ? (
          <p className='error-message'>{errorMessageTransaction.message}</p>
        ) : null}
        {successMessageTransaction.source ===
        'updateTransactionAction/fulfilled' ? (
          <p className='success-message'>{successMessageTransaction.message}</p>
        ) : null}
      </Col>
    </Row>
  );

  const formattedTransactionName = () => {
    if (transactionName === 'transaction history') {
      if (
        [tab.rejectedOrReturnedDeposit, tab.rejectedWithdrawal].includes(
          selectedTabMenu
        )
      ) {
        return transaction?.side == 'DEPOSIT' ? 'deposits' : 'withdrawals';
      } else {
        return selectedTabMenu.toLowerCase();
      }
    } else {
      return transactionName;
    }
  };

  return (
    <Row id='individual-user-content'>
      <Col xs='12' xl='4' className='pb-5 pb-xl-0'>
        <StatusTimeline
          selectedTabMenu={selectedTabMenu}
          onViewConversation={onViewConversation}
          transactionName={formattedTransactionName()}
          onSubmit={onUploadImag}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          status={status}
        />
      </Col>
      <Col xs='12' xl='8' className='detail-wrapper'>
        {selectedTabMenu != tab.unMatched
          ? renderRegisteredInformation()
          : null}
        {renderTransactionDetails()}
        {renderAdditionalNotes()}
      </Col>
    </Row>
  );
};
export default IndividualUser;
