import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input
} from 'reactstrap';
import { Maybe } from 'graphql/jsutils/Maybe';

import LoadingOverlay, { LoadingOverlayProps } from '../LoadingOverlay/';
import ProofOfRemittance from '../ProofOfRemittance';
import PopupMessage, { PopupMessageProp } from '../PopupMessage';
import {
  RemittanceTypeEdge,
  TransactionActivitiesType,
  TransactionTransactionRemittanceStatusChoices
} from '../../graphql/generated/types';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import {
  matchTransactionRemittanceAction,
  updateTransactionRemittanceAction,
  uploadRemittanceAction,
  addBankAccountAction,
  approveTransactionAction
} from '../../redux/action/transactionAction';
import {
  MatchTransactionRemittanceParams,
  SelectedBank,
  UpdateTransactionRemittanceParams,
  UploadRemittance,
  AddBankAccount,
  ApproveTransactionParams,
  AlertMessageType
} from '../../types/transaction_types';
import './styles.scss';
import { convertToBase64 } from '../../utils/convertImgBase64';
import AlertMessage, { AlertMessageProps } from '../AlertMessage';
import {
  setClearMessage,
  setErrorMessageTransaction,
  setSuccessMessageTransaction
} from '../../redux/slice/transactionSlice';
import { useGetRemittanceLazyQuery } from '../../graphql/queries.generated';
import _ from 'lodash';

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value]);
  return debounceValue;
};

interface ProofOfRemittanceModalProps {
  isProofOfRemittanceOpen: boolean;
  setIsProofOfRemittanceOpen: any;
  isLoading: boolean;
  remittance?: RemittanceTypeEdge;
}

const ProofOfRemittanceModal: React.FunctionComponent<
  ProofOfRemittanceModalProps
> = (props: ProofOfRemittanceModalProps) => {
  const dispatch = useAppDispatch();
  const { isProofOfRemittanceOpen, setIsProofOfRemittanceOpen, remittance } =
    props;
  const {
    loadingUploadImg,
    successUploadImg,
    loadingTransaction,
    successMessageTransaction,
    errorMessageTransaction,
    matchedRemittanceTransaction,
    uploadedProofFile,
    banks
  } = useAppSelector(state => state.transaction);

  const [getRemittance, { loading, error, data: remittanceData }] =
    useGetRemittanceLazyQuery({
      variables: {
        id: remittance?.node?.id!
      }
    });
  const { profile } = useAppSelector(state => state.user);

  const isAdmin1Exist = remittance?.node?.approvedAdmins?.admin1 !== null;
  const isAdmin2Exist = remittance?.node?.approvedAdmins?.admin2 !== null;
  const admin1 = remittance?.node?.approvedAdmins?.admin1?.username;
  const admin2 = remittance?.node?.approvedAdmins?.admin2?.username;
  const asAdmin1 =
    remittance?.node?.approvedAdmins?.admin1?.username === profile.username;
  const asAdmin2 =
    remittance?.node?.approvedAdmins?.admin2?.username === profile.username;

  // *STATES
  const [doMatch, setDoMatch] = useState(false);
  const [registeredBankCode, setRegisteredBankCode] =
    useState<SelectedBank | null>(null);
  const [accountNumber, setAccountNumber] = useState({
    value: '',
    error: ''
  });

  const [referenceNumber, setReferenceNumber] = useState('');
  const [userStatedAmount, setUserStatedAmount] = useState(0);
  const [additionalNote, setAdditionalNote] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [transactionActivity, setTransactionActivity] = useState<
    Maybe<TransactionActivitiesType> | any
  >(remittance?.node?.transactionActivity);

  const [popupMessage, setPopupMessage] = useState<PopupMessageProp>({
    isOpen: false,
    title: '',
    message: ''
  });

  const [loadingOverLay, setLoadingOverLay] = useState<LoadingOverlayProps>({
    active: false,
    placeholder: ''
  });

  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({
    isOpen: false
  });

  const onCloseModal = () => {
    setReferenceNumber('');
    setAdditionalNote('');
    setUserStatedAmount(0);
    setIsProofOfRemittanceOpen(!isProofOfRemittanceOpen);
    dispatch(setClearMessage());
    setTimeout(() => {
      dispatch(setClearMessage());
    }, 3500);
    setRegisteredBankCode({
      ...registeredBankCode,
      value: '',
      label: '',
      bankName: '',
      error: ''
    });
    setAccountNumber({
      ...accountNumber,
      value: '',
      error: ''
    });
    setPopupMessage({
      isOpen: false,
      title: '',
      message: ''
    });
    setAlertMessage({
      isOpen: false,
      title: '',
      message: ''
    });
  };

  function openWarningPopupMessage(title: string, message: string) {
    setPopupMessage({
      isOpen: true,
      type: 'warning',
      title: title,
      message: message,
      buttonTitle: 'Back'
    });
  }

  function openConfirmPopupMessage(title: string, message: string) {
    setPopupMessage({
      isOpen: true,
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

  function onCloseAlertMessage() {
    setAlertMessage({ ...alertMessage, isOpen: false });
  }

  function handleButtonInPopupMessage() {
    if (
      popupMessage.title?.toLowerCase().includes('denied') ||
      popupMessage.title?.toLowerCase().includes('unable')
    ) {
      onClosePopupMessage();
    }
    if (popupMessage.title?.toLowerCase().includes('matching')) {
      handleMatchRemittance();
    }
  }
  const debounceValue = useDebounce(referenceNumber, 1000);

  const handleMatchRemittance = async () => {
    if (popupMessage.isOpen) {
      onClosePopupMessage();
    }
    setLoadingOverLay({
      active: true,
      placeholder: 'Matching Transaction...'
    });
    const matchedRemittanceParams: MatchTransactionRemittanceParams = {
      remittance_id: Number(remittance?.node?.remittanceId!),
      account_number: remittance?.node?.accountNumber!,
      inputted_amount: String(remittance?.node?.inputtedAmount!)
    };
    const response = await dispatch(
      matchTransactionRemittanceAction(matchedRemittanceParams)
    );
    if (response.type === 'matchTransactionRemittanceAction/fulfilled') {
      handleApproveTransaction(
        response.payload.transaction_data.transaction_id
      );
    }
    if (response.type === 'matchTransactionRemittanceAction/rejected') {
      setLoadingOverLay({
        ...loadingOverLay,
        active: false
      });
      setTimeout(
        () => openWarningPopupMessage('Unable to Match',
          response?.payload.includes('not found')
            ? 'The system is unable to match the transaction. The transaction will be moved to Unmatched'
            : response?.payload),
        300
      );
    }
  };

  const handleUpdateTransaction = async () => {
    if (additionalNote !== '') {
      const updatedTransactionParams: UpdateTransactionRemittanceParams = {
        remittance_id: remittance?.node?.remittanceId!,
        notes: additionalNote
      };
      const response = await dispatch(
        updateTransactionRemittanceAction(updatedTransactionParams)
      );
      if (
        response.type == 'updateTransactionRemittanceAction/fulfilled/notes'
      ) {
        const successMessage = {
          source: `${response.type}/notes`,
          message: 'Successfully update Additional notes!'
        };
        dispatch(setSuccessMessageTransaction(successMessage));
      }
    } else {
      dispatch(
        setErrorMessageTransaction({
          source: 'updateTransactionRemittanceAction/rejected/notes',
          message: 'Notes is empty!'
        })
      );
    }
  };

  const handleUpdateTransactionRemittance = async () => {
    const updatedTransactionRemittanceParams: UpdateTransactionRemittanceParams =
    {
      remittance_id: remittance?.node?.remittanceId!,
      inputted_amount: String(userStatedAmount),
      account_number: accountNumber.value ? accountNumber.value : ''
    };
    const response = await dispatch(
      updateTransactionRemittanceAction(updatedTransactionRemittanceParams)
    );
    return response;
  };

  function getBankName(bankCode) {
    const bankName = banks.find(item => item.clearingCode === bankCode);
    return bankName?.bankName;
  }

  const handleSaveBankAccount = async () => {
    if (isAdmin1Exist) {
      if (!asAdmin1) {
        openWarningPopupMessage(
          'Save Info - Permission Denied',
          'As Admin 2, you are not authorized to edit user information. Please contact Admin 1 to change user information.'
        );
      } else {
        dispatch(setClearMessage());
        const bankAccount: AddBankAccount = {
          remittance_id: String(remittance?.node?.remittanceId!),
          account_id: String(remittance?.node?.accountId!),
          account_name: remittance?.node?.accountName!,
          account_number:
            accountNumber.value !== ''
              ? accountNumber.value
              : remittance?.node?.accountNumber!,
          bank_code: registeredBankCode?.value!
            ? registeredBankCode?.value!
            : String(remittance?.node?.bankCode),
          bank_name: registeredBankCode?.bankName!
            ? registeredBankCode?.bankName!
            : getBankName(remittance?.node?.bankCode)
        };
        const response = await dispatch(addBankAccountAction(bankAccount));
        if (response.type == 'addBankAccountAction/fulfilled') {
          const successMessage = {
            source: response.type,
            message: response?.payload?.detail
          };
          dispatch(setSuccessMessageTransaction(successMessage));
        }
      }
    } else {
      if (
        remittance?.node?.bankCode === null &&
        registeredBankCode?.value === ''
      ) {
        setRegisteredBankCode({
          ...registeredBankCode,
          error: 'Empty field'
        });
      }
      if (
        remittance?.node?.accountNumber === '' &&
        accountNumber.value === ''
      ) {
        setAccountNumber({
          ...accountNumber,
          error: 'Empty field'
        });
      } else {
        dispatch(setClearMessage());
        const bankAccount: AddBankAccount = {
          remittance_id: String(remittance?.node?.remittanceId!),
          account_id: String(remittance?.node?.accountId!),
          account_name: remittance?.node?.accountName!,
          account_number:
            accountNumber.value !== ''
              ? accountNumber.value
              : remittance?.node?.accountNumber!,
          bank_code: registeredBankCode?.value!
            ? registeredBankCode?.value!
            : String(remittance?.node?.bankCode),
          bank_name: registeredBankCode?.bankName!
            ? registeredBankCode?.bankName!
            : getBankName(remittance?.node?.bankCode)
        };
        const response = await dispatch(addBankAccountAction(bankAccount));
        if (response.type == 'addBankAccountAction/fulfilled') {
          const successMessage = {
            source: response.type,
            message: response?.payload?.detail
          };
          dispatch(setSuccessMessageTransaction(successMessage));
        }
      }
    }
  };

  async function handleUploadImage() {
    setLoadingOverLay({
      active: true,
      placeholder: 'Uploading Image...'
    });
    const base64 = await convertToBase64(selectedFile);
    const file: UploadRemittance = {
      file: `${base64}`,
      remittance_id: remittance?.node?.remittanceId!
    };
    const response: any = await dispatch(uploadRemittanceAction(file));
    if (response.type === 'uploadRemittanceAction/fulfilled') {
      setLoadingOverLay({
        ...loadingOverLay,
        active: false
      });
      openSuccessAlertMessage('Success Upload Image');
      setTimeout(() => onCloseAlertMessage(), 5000);
      const successMessage = {
        source: response.type,
        message: 'Uploaded Image Success'
      };
      dispatch(setSuccessMessageTransaction(successMessage));
    } else {
      setLoadingOverLay({
        ...loadingOverLay,
        active: false
      });
      openFailedAlertMessage('Failed Upload Image', response?.payload?.detail);
      setTimeout(() => onCloseAlertMessage(), 5000);
      const errorMessage = {
        source: 'uploadRemittanceAction/rejected',
        message: response?.payload?.detail
      };
      dispatch(setErrorMessageTransaction(errorMessage));
    }
    setSelectedFile(undefined);
  }

  const handleContinueUnmatchedTransaction = () => {
    const emptyMessage = {
      source: '',
      message: ''
    };
    dispatch(setErrorMessageTransaction(emptyMessage));
  };
  const handleToggleMatchSuccess = () => {
    const emptyMessage = {
      source: '',
      message: ''
    };
    dispatch(setSuccessMessageTransaction(emptyMessage));
  };

  async function handleApproveTransaction(transactionId: string) {
    const approveParams: ApproveTransactionParams = {
      transaction_id: transactionId,
      notes: remittance?.node?.notes ?? ''
    };
    const response = await dispatch(approveTransactionAction(approveParams));
    if (response.type === 'approveTransactionAction/fulfilled') {
      setLoadingOverLay({
        ...loadingOverLay,
        active: false
      });
      const successMessage = {
        source: response.type,
        message: response?.payload?.detail
      };
      dispatch(setSuccessMessageTransaction(successMessage));
      openSuccessAlertMessage(response?.payload?.detail);
      setTimeout(() => onCloseAlertMessage(), 10000);
    } else {
      setLoadingOverLay({
        ...loadingOverLay,
        active: false
      });
      const errorMessage = {
        source: 'approveTransactionAction/rejected',
        message: response?.payload
      };
      dispatch(setErrorMessageTransaction(errorMessage));
      openWarningPopupMessage('Approve - Permission Denied', response?.payload);
      setTimeout(() => onCloseAlertMessage(), 10000);
    }
    return response;
  }

  function handleMatchButton() {
    if (isAdmin1Exist) {
      if (asAdmin1) {
        openWarningPopupMessage(
          'Match - Permission Denied',
          'As Admin 1, you are not authorized to Match.'
        );
      } else {
        openConfirmPopupMessage(
          'Confirm Matching Process',
          'Are you sure you wish to match? Please double check to see if the user’s bank account details are correct'
        );
      }
    } else {
      openWarningPopupMessage(
        'Match - Permission Denied',
        'As Admin 1, you are not authorized to Match.'
      );
    }
  }

  const newProofFilesData =
    remittanceData?.remittanceNode?.remittanceProofs.map(i => {
      const remittances = {
        created: i.created,
        proofFile: i.proofFile
      };
      return remittances;
    });

  const newProofFiles = remittance?.node?.remittanceProofs.map(i => {
    const remittances = {
      created: i.created,
      proofFile: i.proofFile
    };
    return remittances;
  });

  useEffect(() => {
    const updatedTransactionActivity = {
      transactionId:
        matchedRemittanceTransaction?.transaction_data?.transaction_id,
      side: matchedRemittanceTransaction?.transaction_data?.side,
      bankAccountName:
        matchedRemittanceTransaction?.transaction_data?.bank_account_name,
      bankAccountCode:
        matchedRemittanceTransaction?.transaction_data?.bank_account_code,
      bankAccountNumber:
        matchedRemittanceTransaction?.transaction_data?.bank_account_number,
      hkdAmount: matchedRemittanceTransaction?.transaction_data?.hkd_amount
    };
    setTransactionActivity(updatedTransactionActivity);
  }, [matchedRemittanceTransaction]);

  useEffect(() => {
    if (!_.isEmpty(uploadedProofFile)) getRemittance();
  }, [uploadedProofFile]);

  const isUnmatchableRemittance = [
    TransactionTransactionRemittanceStatusChoices.Rejected,
    TransactionTransactionRemittanceStatusChoices.Unmatched,
    TransactionTransactionRemittanceStatusChoices.Onhold
  ].includes(remittance?.node?.status!);

  return (
    <>
      <LoadingOverlay
        active={loadingOverLay.active}
        placeholder={loadingOverLay.placeholder}
      />
      <AlertMessage
        isOpen={alertMessage.isOpen}
        type={alertMessage.type}
        title={alertMessage.title}
        message={alertMessage.message ?? ''}
        toggle={onCloseAlertMessage}
      />
      <PopupMessage
        isOpen={popupMessage.isOpen}
        type={popupMessage.type}
        title={popupMessage.title ?? ''}
        message={popupMessage.message ?? ''}
        toggle={onClosePopupMessage}
        onClick={handleButtonInPopupMessage}
        buttonTitle={popupMessage.buttonTitle}
        onBack={onClosePopupMessage}
      />
      <Modal
        id='proof-remittance-modal-container'
        isOpen={isProofOfRemittanceOpen}
        toggle={onCloseModal}
        size='xl'
        backdrop
        centered
      >
        <ModalHeader toggle={onCloseModal} className='modal-header pb-0' />
        <ModalBody className='pt-0'>
          <ProofOfRemittance
            data={remittance?.node}
            registeredBankCode={registeredBankCode}
            setRegisteredBankCode={setRegisteredBankCode}
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            referenceNumber={referenceNumber}
            setReferenceNumber={setReferenceNumber}
            userStatedAmount={userStatedAmount}
            setUserStatedAmount={setUserStatedAmount}
            additionalNote={additionalNote}
            setAdditionalNote={setAdditionalNote}
            transaction={
              remittance?.node?.transactionActivity != null
                ? remittance?.node?.transactionActivity!
                : transactionActivity
            }
            updateUserStatedAmount={handleUpdateTransactionRemittance}
            updateNotes={handleUpdateTransaction}
            onUploadImage={handleUploadImage}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            handleSaveBankAccount={handleSaveBankAccount}
            remittanceProofs={
              remittanceData?.remittanceNode
                ? newProofFilesData?.map(r => r.proofFile!)!
                : newProofFiles?.map(r => r.proofFile!)!
            }
            setPopupMessage={setPopupMessage}
          />
        </ModalBody>
        <ModalFooter className='modal-footer justify-content-end'>
          <Button
            className='modal-button'
            color='primary'
            onClick={isUnmatchableRemittance ? onCloseModal : handleMatchButton}
          >
            {isUnmatchableRemittance ? 'Confirm' : 'Match'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ProofOfRemittanceModal;
