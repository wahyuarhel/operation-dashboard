import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Col, Form, Input, Row, Spinner, Button } from 'reactstrap';
import _ from 'lodash';

import {
  BankType,
  RemittanceType,
  TransactionActivitiesType,
  TransactionTransactionRemittanceStatusChoices,
  TransactionTransactionRemittanceAccountStatusChoices
} from '../../graphql/generated/types';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { formatNumber } from '../../utils/formatNumber';
import { SelectedBank } from '../../types/transaction_types';
import PorImageCard from '../PorImageCard';
import './styles.scss';
import {
  setClearMessage,
  setErrorMessageTransaction,
  setSuccessMessageTransaction
} from '../../redux/slice/transactionSlice';

interface ProofOfRemittanceProps {
  data: Maybe<RemittanceType> | undefined;
  registeredBankCode: SelectedBank | null;
  setRegisteredBankCode: Function;
  accountNumber: any;
  setAccountNumber: Function;
  referenceNumber: string;
  setReferenceNumber: Function;
  userStatedAmount: number;
  setUserStatedAmount: Function;
  additionalNote: string;
  setAdditionalNote: Function;
  transaction: Maybe<TransactionActivitiesType> | any;
  updateUserStatedAmount: Function;
  updateNotes: Function;
  onUploadImage?;
  selectedFile?;
  setSelectedFile?;
  handleSaveBankAccount: Function;
  remittanceProofs?: string[];
  setPopupMessage?;
}

const ProofOfRemittance: React.FunctionComponent<ProofOfRemittanceProps> = (
  props: ProofOfRemittanceProps
) => {
  const {
    data,
    registeredBankCode,
    setRegisteredBankCode,
    accountNumber = '',
    setAccountNumber,
    referenceNumber = '',
    setReferenceNumber,
    userStatedAmount,
    setUserStatedAmount,
    additionalNote = '',
    setAdditionalNote,
    transaction,
    updateUserStatedAmount,
    updateNotes,
    onUploadImage,
    selectedFile,
    setSelectedFile,
    handleSaveBankAccount,
    remittanceProofs,
    setPopupMessage
  } = props;
  const dispatch = useAppDispatch();
  const {
    banks,
    loadingTransaction,
    errorMessageTransaction,
    successMessageTransaction
  } = useAppSelector(state => state.transaction);

  const { profile } = useAppSelector(state => state.user);
  const [editAmount, setEditAmount] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [authorizedAdmin, setAuthorizedAdmin] = useState(false);

  const listBanks = banks.map((item: BankType) => {
    const bank = {
      label: `${item.clearingCode} ${item.bankName}`,
      value: item.clearingCode,
      bankName: item.bankName
    };
    return bank;
  });

  const warningTitle = {
    userInfo: 'Save Info - Permission Denied',
    addingNotes: 'Adding Notes - Permission Denied'
  };

  const warningMessages = {
    admin1: 'As Admin 1, you are not authorized to adding notes.',
    admin2:
      'As Admin 2, you are not authorized to edit user information. Please contact Admin 1 to change user information.'
  };

  const emptyMessage = {
    source: '',
    message: ''
  };

  function checkAdmin() {
    if (
      data?.approvedAdmins?.admin1 !== null &&
      profile.username !== data?.approvedAdmins?.admin1?.username
    ) {
      setAuthorizedAdmin(false);
    } else setAuthorizedAdmin(true);
  }

  function showWarningPopUp(title: string, message: string) {
    setPopupMessage({
      isOpen: true,
      type: 'warning',
      title: title,
      message: message,
      buttonTitle: 'Back'
    });
  }

  const handleUploadImage = () => {
    if (selectedFile !== undefined || selectedFile !== null) {
      onUploadImage();
    } else {
      dispatch(setErrorMessageTransaction(emptyMessage));
    }
  };

  function getBankCodeDetails(bankCode): string {
    const bankName = banks.find(item => item.clearingCode === bankCode);
    return bankCode ? `${bankCode} ${bankName?.bankName}` : '-';
  }

  function handleRegisteredBankCode(value) {
    if (!authorizedAdmin) {
      showWarningPopUp(warningTitle.userInfo, warningMessages.admin2);
    } else {
      onChangeRegisteredBankCode(value);
    }
  }

  function onChangeRegisteredBankCode(value) {
    setRegisteredBankCode(value);
    dispatch(setClearMessage());
  }

  function adminCheckOnBankCode() {
    if (!authorizedAdmin) {
      showWarningPopUp(warningTitle.userInfo, warningMessages.admin2);
    }
  }

  function adminCheckOnAccountNumber(value) {
    if (!authorizedAdmin) {
      showWarningPopUp(warningTitle.userInfo, warningMessages.admin2);
      value.currentTarget.blur();
    }
  }

  function onChangeAccountNumber(e) {
    setAccountNumber({
      ...accountNumber,
      value: e.target.value,
      error: ''
    });
    dispatch(setClearMessage());
  }

  const handleUpdateUserStatedAmount = () => {
    //* this condition to handle that any admin able to update deposit amount except in waiting approval detail.
    //* in waiting approval details only admin 1 able to update deposit amount
    if (
      data?.status !== TransactionTransactionRemittanceStatusChoices.Needapproval
    ) {
      onChangeUpdateUserStatedAmount();
    } else {
      if (!authorizedAdmin) {
        showWarningPopUp(warningTitle.userInfo, warningMessages.admin2);
      } else {
        onChangeUpdateUserStatedAmount();
      }
    }
  };

  async function onChangeUpdateUserStatedAmount() {
    dispatch(setSuccessMessageTransaction(emptyMessage));
    if (editAmount) {
      if (userStatedAmount > 0) {
        const response = await updateUserStatedAmount();
        if (response.type === 'updateTransactionRemittanceAction/fulfilled') {
          const successMessage = {
            source: `${response.type}/inputted_amount`,
            message: 'User Stated Amount Updated'
          };
          dispatch(setSuccessMessageTransaction(successMessage));
          setEditAmount(!editAmount);
        }
      } else {
        dispatch(
          setErrorMessageTransaction({
            source: 'updateTransactionRemittanceAction/rejected',
            message: 'User Stated Amount is 0!'
          })
        );
        setEditAmount(!editAmount);
      }
    } else {
      dispatch(setErrorMessageTransaction(emptyMessage));
    }
  }

  const handleUpdateNotes = () => {
    if (
      [
        TransactionTransactionRemittanceStatusChoices.Rejected,
        TransactionTransactionRemittanceStatusChoices.Onhold,
        TransactionTransactionRemittanceStatusChoices.Unmatched
      ].includes(data?.status!)
    ) {
      setEditNote(!editNote);
      dispatch(setSuccessMessageTransaction(emptyMessage));
      if (editNote) {
        updateNotes();
      }
    } else {
      if (
        data?.approvedAdmins?.admin1 === null ||
        profile.username === data?.approvedAdmins?.admin1?.username
      ) {
        showWarningPopUp(warningTitle.addingNotes, warningMessages.admin1);
      } else {
        setEditNote(!editNote);
        dispatch(setSuccessMessageTransaction(emptyMessage));
        if (editNote) {
          updateNotes();
        }
      }
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  const displayBankCode = () => {
    if (
      data?.accountStatus ===
      TransactionTransactionRemittanceAccountStatusChoices.Change
    ) {
      if (_.isEmpty(data.approvedAdmins?.admin1)) {
        return 'Choose bank';
      } else {
        return getBankCodeDetails(data?.bankCode);
      }
    } else {
      return getBankCodeDetails(data?.bankCode);
    }
  };

  const displayAccountNumber = () => {
    if (
      data?.accountStatus ===
      TransactionTransactionRemittanceAccountStatusChoices.Change
    ) {
      if (_.isEmpty(data.approvedAdmins?.admin1)) {
        return '';
      } else {
        return data?.accountNumber;
      }
    } else {
      return data?.accountNumber;
    }
  };

  const isBankDetailsEditable = data?.status ===
    TransactionTransactionRemittanceStatusChoices.Needapproval

  const isRejectedDr = data?.status === TransactionTransactionRemittanceStatusChoices.Rejected

  function renderEditableBankCode(): JSX.Element {
    //* only in waiting approval details, bank code able to edit by admin
    if (isBankDetailsEditable)
      return (
        <>
          <Select
            options={listBanks}
            isMulti={false}
            isSearchable
            placeholder={displayBankCode()}
            styles={{
              indicatorSeparator: base => ({
                ...base,
                display: 'none'
              }),
              control: base => ({
                ...base,
                borderRadius: '5px'
              })
            }}
            className='select-bank-box'
            classNamePrefix={data?.bankCode ? 'select-bank' : ''}
            onChange={handleRegisteredBankCode}
            onMenuOpen={adminCheckOnBankCode}
          />
          {registeredBankCode?.error ? (
            <p className='error-message text-right'>
              {registeredBankCode.error}
            </p>
          ) : null}
        </>
      )
    else return (
      <p className='value '>
        {getBankCodeDetails(data?.bankCode)}
      </p>
    )
  }

  function renderEditableBankNumber(): JSX.Element {
    //* only in waiting approval details, bank number able to edit by admin
    if (isBankDetailsEditable)
      return (
        <div className='d-flex flex-column'>
          <Input
            type='text'
            placeholder='Account number'
            defaultValue={displayAccountNumber() ?? ''}
            className='input-text'
            onChange={onChangeAccountNumber}
            onClick={adminCheckOnAccountNumber}
          />
          {accountNumber.error !== '' ? (
            <p className='error-message text-right'>
              {accountNumber.error}
            </p>
          ) : null}
        </div>
      )
    else return (
      <p className='value'>
        {data?.accountNumber ? data.accountNumber : '-'}
      </p>
    )
  }

  const renderRegisteredInformation = () => (
    <Row>
      <h6 className='title pb-3'>Registered Information</h6>
      <Col>
        <Row className='pb-3'>
          <Col xs={6} lg={3}>
            <p className='label '>User ID</p>
          </Col>
          <Col xs={6} lg={5}>
            <p className='value'>{data?.accountId}</p>
          </Col>
        </Row>
        <Row className='pb-3'>
          <Col xs={6} lg={3}>
            <p className='label'>Name</p>
          </Col>
          <Col xs={6} lg={5}>
            <p className='value'>{data?.accountName}</p>
          </Col>
        </Row>
        <Row className='pb-3'>
          <Col xs={6} lg={3}>
            <p className='label'>Registered Bank Code</p>
          </Col>
          <Col xs={6} lg={5}>
            {renderEditableBankCode()}
          </Col>
        </Row>
        <Row className='pb-3'>
          <Col xs={6} lg={3}>
            <p className='label'>Account Number (LORA)</p>
          </Col>
          <Col xs={6} lg={5}>
            {renderEditableBankNumber()}
          </Col>
        </Row>
        <Row className='pb-3'>
          <Col xs={6} lg={3}>
            <p className='label'>User Stated Amount (HKD)</p>
          </Col>
          <Col xs={6} lg={5}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Col>
                {editAmount && !isRejectedDr ? (
                  <Form onSubmit={handleUpdateUserStatedAmount}>
                    <Input
                      className='input-text'
                      value={
                        userStatedAmount !== 0
                          ? userStatedAmount
                          : '' || data?.inputtedAmount
                      }
                      placeholder='Input Amount'
                      onChange={e => setUserStatedAmount(e.target.value)}
                    />
                  </Form>
                ) : (
                  <p className='value'>
                    {formatNumber(
                      userStatedAmount != 0
                        ? userStatedAmount
                        : data?.inputtedAmount
                    )}
                  </p>
                )}
              </Col>
              <Col>
                {editAmount ? (
                  <Button
                    disabled={
                      loadingTransaction.source ===
                      'updateTransactionRemittanceAction/pending/inputted_amount' &&
                      loadingTransaction.status
                    }
                    className='modal-button justify-content-end mx-3'
                    color='primary'
                    onClick={() => handleUpdateUserStatedAmount()}
                  >
                    {loadingTransaction.source ===
                      'updateTransactionRemittanceAction/pending/inputted_amount' &&
                      loadingTransaction.status ? (
                      <Spinner
                        size='sm'
                        style={{ marginLeft: 10, marginTop: 5 }}
                      ></Spinner>
                    ) : (
                      'Confirm'
                    )}
                  </Button>
                ) :
                  //* remove edit button in rejected DR details
                  !isRejectedDr ? (
                    <p
                      className='edit-text'
                      onClick={() => {
                        setEditAmount(!editAmount);
                        dispatch(setClearMessage());
                      }}
                    >
                      Edit
                    </p>
                  ) : null}
              </Col>
            </div>
            {errorMessageTransaction.source === 'UserStatedAmount' ? (
              <p className='error-message'>{errorMessageTransaction.message}</p>
            ) : null}
            {successMessageTransaction.source ===
              'updateTransactionRemittanceAction/fulfilled/inputted_amount' ? (
              <p className='success-message'>
                {successMessageTransaction.message}
              </p>
            ) : null}
          </Col>
        </Row>
      </Col>
    </Row>
  );

  const renderTransactionDetails = () => {
    interface TransactionDetailsType {
      label: string;
      value: string | number;
    }
    const valueOfTransactionDetails: TransactionDetailsType[] = [
      {
        label: 'Transaction UID',
        value: transaction?.transactionId ?? 'N/A'
      },
      { label: 'Direction', value: transaction?.side ?? 'N/A' },
      {
        label: 'Name (DBS)',
        value: transaction?.bankAccountName ?? 'N/A'
      },
      {
        label: 'Bank Code (DBS)',
        value: transaction?.bankAccountCode ?? 'N/A'
      },
      {
        label: 'Account Number (DBS)',
        value: transaction?.bankAccountNumber ?? 'N/A'
      },
      {
        label: 'Amount (HKD)',
        value: transaction?.hkdAmount
          ? formatNumber(Number(transaction?.hkdAmount))
          : 'N/A'
      }
    ];
    return (
      <Row className='pb-4'>
        <h6 className='title pb-3'>Transaction Details(From DBS)</h6>
        <Col>
          {valueOfTransactionDetails.map((datum, index) => (
            <Row className='pb-3' key={index}>
              <Col xs='4' lg={3}>
                <p className='label'>{datum.label}</p>
              </Col>
              <Col xs='6' lg={8}>
                <p className='value'>{datum.value}</p>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    );
  };

  const renderAdditionalNotes = () => (
    <Row>
      <div className='d-flex align-item-center pb-3'>
        <h6 className='title me-4'>Additional Notes</h6>
        <p className='edit-text' onClick={handleUpdateNotes}>
          {editNote ? 'Done' : 'Edit'}
          {loadingTransaction.source ===
            'updateTransactionRemittanceAction/pending/notes' &&
            loadingTransaction.status ? (
            <Spinner size='sm' style={{ marginLeft: 10, marginTop: 5 }}>
              Loading...
            </Spinner>
          ) : null}
        </p>
      </div>
      <Col>
        <Input
          name='text'
          type='textarea'
          disabled={
            !editNote ||
            (loadingTransaction.source ===
              'updateTransactionRemittanceAction/pending/notes' &&
              loadingTransaction.status)
          }
          placeholder={'Please write any comments here'}
          className={
            'additional-notes-input' + loadingTransaction.status && 'loading'
          }
          value={additionalNote !== '' ? additionalNote : '' || data?.notes!}
          onChange={e => {
            e.preventDefault();
            setAdditionalNote(e.target.value);
          }}
        />
        {errorMessageTransaction.source ===
          'updateTransactionRemittanceAction/rejected/notes' ? (
          <p className='error-message'>{errorMessageTransaction.message}</p>
        ) : null}
        {successMessageTransaction.source ===
          'updateTransactionRemittanceAction/fulfilled/notes' ? (
          <p className='success-message'>{successMessageTransaction.message}</p>
        ) : null}
      </Col>
    </Row>
  );

  return (
    <Row id='proof-remittance-container'>
      <Col xs={12} xl={4} className='pb-5 pb-xl-0'>
        <PorImageCard
          items={remittanceProofs}
          onSubmit={handleUploadImage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          data={data}
        />
      </Col>
      <Col xs={12} xl={8}>
        {renderRegisteredInformation()}
        {successMessageTransaction.source ===
          'addBankAccountAction/fulfilled' ? (
          <p className='success-message'>{successMessageTransaction.message}</p>
        ) : null}
        {successMessageTransaction.source ===
          'addBankAccountAction/rejected' ? (
          <p className='success-message'>{errorMessageTransaction.message}</p>
        ) : null}
        <Col
          className='justify-content-end'
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end'
          }}
        >
          {/* //* remove save button except in waiting approval details */}
          {isBankDetailsEditable ? (
            <Button
              disabled={
                loadingTransaction.source === 'addBankAccountAction/pending' &&
                loadingTransaction.status
              }
              className='modal-button justify-content-end'
              color='primary'
              onClick={() => handleSaveBankAccount()}
            >
              {loadingTransaction.source === 'addBankAccountAction/pending' &&
                loadingTransaction.status ? (
                <Spinner size='sm' style={{ marginLeft: 10, marginTop: 5 }}>
                  Loading...
                </Spinner>
              ) : (
                'Save'
              )}
            </Button>
          ) : (
            <div className='p-3' />
          )}
        </Col>
        {renderTransactionDetails()}
        {renderAdditionalNotes()}
      </Col>
    </Row>
  );
};
export default ProofOfRemittance;
