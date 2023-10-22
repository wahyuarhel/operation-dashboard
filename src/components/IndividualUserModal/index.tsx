import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import {
  TransactionActivitiesType,
  TransactionTransactionActivitiesSideChoices
} from '../../graphql/generated/types';
import { useGetRemittanceLazyQuery } from '../../graphql/queries.generated';
import {
  updateTransactionAction,
  uploadRemittanceAction
} from '../../redux/action/transactionAction';
import {
  setErrorMessageTransaction,
  setSuccessMessageTransaction
} from '../../redux/slice/transactionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import {
  UpdateTransactionParams,
  UploadRemittance,
  tab
} from '../../types/transaction_types';
import { convertToBase64 } from '../../utils/convertImgBase64';
import AlertMessage, { AlertMessageProps } from '../AlertMessage';
import IndividualUser from '../IndividualUser';
import LoadingOverlay from '../LoadingOverlay';
import ModalPreviewImage from '../ModalPreviewImage';
import './styles.scss';

interface IndividualUserModalProps {
  openIndividualUser: boolean;
  setOpenIndividualUser?: any;
  transactionName?: string;
  transaction?: TransactionActivitiesType;
  selectedTabMenu: tab;
}

const IndividualUserModal: React.FunctionComponent<IndividualUserModalProps> = (
  props: IndividualUserModalProps
) => {
  const {
    openIndividualUser,
    setOpenIndividualUser,
    transactionName,
    transaction,
    selectedTabMenu
  } = props;

  const dispatch = useAppDispatch();
  const {
    loadingUploadImg,
    successUploadImg,
    uploadedProofFile,
    loadingTransaction
  } = useAppSelector(state => state.transaction);
  const [openConversation, setOpenConversation] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [additionalNote, setAdditionalNote] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({
    isOpen: false
  });

  const [getRemittance, { loading, error, data: remittanceData }] =
    useGetRemittanceLazyQuery({
      variables: {
        id: transaction?.transactionRemittances?.id!
      }
    });

  const conversationImages: any =
    transaction?.transactionRemittances?.remittanceId !== undefined
      ? transaction?.transactionRemittances?.remittanceProofs.map(
          item => item?.proofFile
        )
      : [];

  const handleModalConversation = () => {
    setOpenConversation(!openConversation);
    setTimeout(() => setActiveImgIdx(0), 500);
  };

  const onNextImage = () => {
    if (activeImgIdx < conversationImages!.length - 1) {
      setActiveImgIdx(activeImgIdx + 1);
      return;
    }
  };

  const onPrevious = () => {
    if (activeImgIdx > 0) {
      setActiveImgIdx(activeImgIdx - 1);
      return;
    }
  };

  const onCloseModal = () => {
    const emptyMessage = {
      source: '',
      message: ''
    };
    onCloseAlertMessage();
    setAdditionalNote('');
    setSelectedFile(null);
    setOpenIndividualUser(!openIndividualUser);
    dispatch(setErrorMessageTransaction(emptyMessage));
    dispatch(setSuccessMessageTransaction(emptyMessage));
  };

  const handleConfirmTransaction = () => {
    onCloseModal();
  };

  const handleUpdateTransaction = async () => {
    if (transaction?.transactionId && additionalNote) {
      const updatedTransactionParams: UpdateTransactionParams = {
        transaction_id: transaction?.transactionId!,
        notes: additionalNote
      };
      const response = await dispatch(
        updateTransactionAction(updatedTransactionParams)
      );
      if (response.type == 'updateTransactionAction/fulfilled') {
        const successMessage = {
          source: response.type,
          message: 'Successfully update Additional notes!'
        };
        dispatch(setSuccessMessageTransaction(successMessage));
      }
    } else {
      let message = '';
      if (!transaction?.transactionId && additionalNote == '') {
        message = 'Additional notes and Transaction Id are empty!';
      }
      if (transaction?.transactionId && additionalNote == '') {
        message = 'Additional notes is empty!';
      }
      if (!transaction?.transactionId && additionalNote != '') {
        message = 'No Transaction ID!';
      }
      dispatch(
        setErrorMessageTransaction({
          source: 'updateTransactionAction/rejected',
          message
        })
      );
    }
  };
  function handleAlertMessage(alertMessage: AlertMessageProps) {
    setAlertMessage({
      ...alertMessage,
      isOpen: alertMessage.isOpen,
      type: alertMessage.type,
      title: alertMessage.title,
      message: alertMessage.message,
      toggle: onCloseAlertMessage
    });
  }

  const onCloseAlertMessage = () =>
    setAlertMessage({ ...alertMessage, isOpen: false });

  const isUploadingImage: boolean =
    loadingTransaction.source === 'uploadRemittanceAction/pending';

  async function handleUploadImage(): Promise<void> {
    const base64 = await convertToBase64(selectedFile);
    const file: UploadRemittance = {
      file: `${base64}`,
      remittance_id: transaction?.transactionRemittances?.remittanceId!
    };
    if (transaction?.transactionRemittances?.remittanceId) {
      const response = await dispatch(uploadRemittanceAction(file));
      if (response.type === 'uploadRemittanceAction/fulfilled') {
        const successAlertMessage: AlertMessageProps = {
          isOpen: true,
          type: 'success',
          title: 'Uploaded Image Success',
          message: 'Successfully upload image on remittance!'
        };
        handleAlertMessage(successAlertMessage);
        setSelectedFile(null);
      }
      if (response.type === 'uploadRemittanceAction/rejected') {
        const failedAlertMessage: AlertMessageProps = {
          isOpen: true,
          type: 'alert',
          title: 'Uploaded Image Failed',
          message: 'Failed upload image on remittance!'
        };
        handleAlertMessage(failedAlertMessage);
      }
    } else {
      const failedAlertMessage: AlertMessageProps = {
        isOpen: true,
        type: 'alert',
        title: 'Uploaded Image Failed',
        message: 'This transaction has no remittance id!'
      };
      handleAlertMessage(failedAlertMessage);
      setSelectedFile(null);
    }
  }

  function modalHeader(): string {
    switch (transaction?.side) {
      case TransactionTransactionActivitiesSideChoices.Withdraw:
        return 'Withdrawal Details';
      case TransactionTransactionActivitiesSideChoices.Deposit:
        return 'Deposit Details';
      default:
        return '';
    }
  }

  useEffect(() => {
    if (!_.isEmpty(uploadedProofFile)) getRemittance();
  }, [uploadedProofFile]);

  return (
    <>
      <LoadingOverlay
        active={isUploadingImage}
        placeholder={'Uploading Image...'}
      />
      <Modal
        isOpen={openIndividualUser}
        toggle={onCloseModal}
        centered
        size='xl'
        id='modal-container'
      >
        <ModalHeader toggle={onCloseModal} className='modal-header pb-0'>
          {modalHeader()}
        </ModalHeader>
        <ModalBody>
          <AlertMessage
            isOpen={alertMessage.isOpen}
            type={alertMessage.type}
            title={alertMessage.title}
            message={alertMessage.message}
            toggle={onCloseAlertMessage}
          />
          <ModalPreviewImage
            isOpen={openConversation}
            onClose={handleModalConversation}
            items={
              remittanceData?.remittanceNode
                ? remittanceData?.remittanceNode.remittanceProofs.map(
                    r => r.proofFile!
                  )!
                : conversationImages
            }
            activeIdx={activeImgIdx}
            onNext={onNextImage}
            onPrevious={onPrevious}
          />
          <IndividualUser
            onViewConversation={setOpenConversation}
            transactionName={transactionName}
            transaction={transaction}
            additionalNote={additionalNote}
            setAdditionalNote={setAdditionalNote}
            updateNotes={handleUpdateTransaction}
            onUploadImag={handleUploadImage}
            selectedFile={selectedFile!}
            setSelectedFile={setSelectedFile}
            status={transaction?.transactionStatusCode!}
            selectedTabMenu={selectedTabMenu}
          />
        </ModalBody>
        <ModalFooter className='modal-footer justify-content-end'>
          <Button
            className='modal-button'
            onClick={() => handleConfirmTransaction()}
            color='primary'
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default IndividualUserModal;
