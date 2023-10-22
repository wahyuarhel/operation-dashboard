import LoadingOverlay, { LoadingOverlayProps } from 'components/LoadingOverlay';
import PopupMessage, { PopupMessageProp } from 'components/PopupMessage';
import TagLabel from 'components/TagLabel';
import icons from 'constants/icons';
import React, { useState, useEffect } from 'react';
import { BsTelephone } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import { Button, Col, Row, Spinner } from 'reactstrap';
import _ from 'lodash';
import {
  approvalAccountAction,
  suspendAccountAction,
  reactivateAccountAction,
  upgradeAccountAction,
  resubmitRequestAction
} from 'redux/action/userAction';
import { ApprovalParam } from '../../types/user_types';
import { useAppDispatch, useAppSelector } from 'redux/store/hooks';
import dayjs from 'dayjs';
import styles from './styles.module.scss';
import {
  AccountLoraAccountLoraStatusChoices,
  AccountType
} from 'graphql/generated/types';

interface OverviewCardProp {
  data: AccountType;
}
const OverviewCard: React.FC<OverviewCardProp> = (props: OverviewCardProp) => {
  const dispatch = useAppDispatch();

  const { accountChecklist, account, loading, profile } = useAppSelector(
    state => state.user
  );
  const { personalInfo, loraAccount } = account;

  const [isConfirmSuspendUser, setIsConfirmSuspendUser] =
    useState<boolean>(false);
  const [isConfirmReactivateUser, setIsConfirmReactivateUser] =
    useState<boolean>(false);

  const [loadingOverlay, setLoadingOverlay] = useState<LoadingOverlayProps>({
    active: false,
    placeholder: ''
  });
  const [popupMessage, setPopupMessage] = useState<PopupMessageProp>({
    isOpen: false,
    title: '',
    message: '',
    disabled: false
  });

  const closeModal = () => {
    setPopupMessage({ ...popupMessage, isOpen: false });
    if (
      loraAccount?.loraStatus === AccountLoraAccountLoraStatusChoices.Active
    ) {
      setIsConfirmSuspendUser(false);
    }
    if (
      loraAccount?.loraStatus === AccountLoraAccountLoraStatusChoices.Suspended
    ) {
      setIsConfirmReactivateUser(false);
    }
  };

  const closeLoadingOverlay = () =>
    setLoadingOverlay({ ...loadingOverlay, active: false });

  function openConfirmPopupMessage(
    title: string,
    message: string,
    disabled?: boolean
  ) {
    setPopupMessage({
      isOpen: true,
      title: title,
      message: message,
      disabled: disabled
    });
  }
  function openAlertPopupMessage(
    title: string,
    message: string,
    buttonTitle?: string
  ) {
    setPopupMessage({
      isOpen: true,
      type: 'warning',
      title: title,
      message: message,
      buttonTitle: buttonTitle
    });
  }
  function openSuccessPopupMessage(title: string, message: string) {
    setPopupMessage({
      isOpen: true,
      type: 'success',
      title: title,
      message: message
    });
  }

  const onApproveUser = (type: string) => {
    const checklist = _.omit(accountChecklist, 'userId');
    const index = Object.keys(checklist).findIndex(
      key => accountChecklist[key] == false
    );
    if (index === -1) {
      if (type === 'final_approve') {
        if (profile.username === loraAccount?.approvedBy?.username) {
          openAlertPopupMessage(
            'Not Authorised To Approve',
            'You are not authorised to approve the user'
          );
        } else {
          openConfirmPopupMessage(
            'Final Approval',
            'This will officially open the account for the user and they will be able to trade'
          );
        }
      } else {
        openConfirmPopupMessage(
          'Confirm Approve User',
          'Are you sure you want to approve this user? The user will be sent over to IB for approval'
        );
      }
    } else {
      openAlertPopupMessage(
        'Cannot Approve User',
        'You cannot approve a user until all the boxes in the checklist have been checked'
      );
    }
  };

  const onRejectUser = () => {
    openConfirmPopupMessage(
      'Reject User',
      'Are you sure you want to reject this user? This action cannot be undone'
    );
  };

  const onChangeStatusUser = () => {
    openConfirmPopupMessage('Change User Status', '', true);
  };

  function handleSuspendUser(): void {
    setIsConfirmSuspendUser(!isConfirmSuspendUser);
    setPopupMessage({ ...popupMessage, disabled: isConfirmSuspendUser });
  }

  function confirmSuspendUser(): void {
    openConfirmPopupMessage(
      'Suspend User',
      'Are you sure you wish to suspend this user’s account? This action cannot be undone.',
      !isConfirmSuspendUser
    );
  }

  function handleCloseUserAccount() {
    openAlertPopupMessage(
      'Close User Account',
      'Are you sure you wish to close this user’s account? This action cannot be undone.',
      'Close Account'
    );
  }

  function handleReactivateUser(): void {
    setIsConfirmReactivateUser(!isConfirmReactivateUser);
    setPopupMessage({ ...popupMessage, disabled: isConfirmReactivateUser });
  }

  function confirmReactiveUser(): void {
    openConfirmPopupMessage(
      'Reactivate User',
      'Are you sure you wish to reactivate this user’s account? This action cannot be undone.',
      !isConfirmReactivateUser
    );
  }

  const enum userActionParam {
    APPROVE,
    REJECT,
    FINAL_APPROVAL
  }

  async function onSubmitUserApplication(action: userActionParam) {
    setLoadingOverlay({
      active: true,
      placeholder:
        action === userActionParam.APPROVE
          ? 'Approving User Application...'
          : action === userActionParam.FINAL_APPROVAL
          ? 'Final Approval User Application...'
          : 'Rejecting User Application...'
    });

    if (action === userActionParam.APPROVE) {
      const upgradeResponse = await dispatch(
        upgradeAccountAction({ account_id: String(account?.account?.id) })
      );
      if (upgradeResponse.type === 'upgradeAccountAction/fulfilled') {
        closeLoadingOverlay();
        openSuccessPopupMessage(
          'Success',
          `${account.account?.email} successfully Approved`
        );
      } else if (upgradeResponse.type === 'upgradeAccountAction/rejected') {
        closeLoadingOverlay();
        openAlertPopupMessage('Failed', upgradeResponse.payload, 'Continue');
      }
    }

    if (
      action === userActionParam.FINAL_APPROVAL ||
      action === userActionParam.REJECT
    ) {
      const approvalParam: ApprovalParam = {
        account_id: Number(account.account?.id!),
        account_approve:
          action === userActionParam.FINAL_APPROVAL ? true : false
      };
      const response = await dispatch(approvalAccountAction(approvalParam));
      if (response.type === 'approvalAccountAction/fulfilled') {
        closeLoadingOverlay();
        openSuccessPopupMessage(
          'Success',
          `${account.account?.email} ${
            action === userActionParam.FINAL_APPROVAL
              ? 'Successfully Approved'
              : ' has been Rejected'
          }`
        );
      } else if (response.type === 'approvalAccountAction/rejected') {
        closeLoadingOverlay();
        openAlertPopupMessage(
          'Failed',
          action === userActionParam.FINAL_APPROVAL
            ? response.payload ?? 'Something Error to Approve this User'
            : response.payload ?? 'Something Error to Reject this User',
          action === userActionParam.FINAL_APPROVAL ? 'Close' : undefined
        );
      }
    }
  }

  async function onClickButtonInPopupMessage() {
    if (
      popupMessage.title === 'Cannot Approve User' ||
      popupMessage.title === 'Close User Account' ||
      popupMessage.title === 'Approved Failed' ||
      popupMessage.title === 'Failed' ||
      popupMessage.title === 'Success' ||
      popupMessage.title === 'Not Authorised To Approve'
    ) {
      closeModal();
    }
    if (popupMessage.title === 'Change User Status') {
      if (
        loraAccount?.loraStatus ===
          AccountLoraAccountLoraStatusChoices.Active &&
        isConfirmSuspendUser
      ) {
        confirmSuspendUser();
      }
      if (
        loraAccount?.loraStatus ===
          AccountLoraAccountLoraStatusChoices.Suspended &&
        isConfirmReactivateUser
      ) {
        confirmReactiveUser();
      }
    }
    if (popupMessage.title === 'Confirm Approve User') {
      onSubmitUserApplication(userActionParam.APPROVE);
    }

    if (popupMessage.title === 'Final Approval') {
      onSubmitUserApplication(userActionParam.FINAL_APPROVAL);
    }

    if (popupMessage.title === 'Reject User') {
      onSubmitUserApplication(userActionParam.REJECT);
    }
    if (popupMessage.title === 'Suspend User') {
      const response = await dispatch(
        suspendAccountAction({ account_id: String(account?.account?.id!) })
      );
      if (response.type === 'suspendAccountAction/fulfilled') {
        openSuccessPopupMessage(
          'Success',
          account.account?.email + ' has been Suspended'
        );
      }
    }

    if (popupMessage.title === 'Reactivate User') {
      const response = await dispatch(
        reactivateAccountAction({ account_id: String(account?.account?.id!) })
      );
      if (response.type === 'reactivateAccountAction/fulfilled') {
        closeModal();
        openSuccessPopupMessage(
          'Success',
          account.account?.email + ' has been Reactivated'
        );
      }
    }
  }

  const onAmendmentsNeeded = async () => {
    const response = await dispatch(
      resubmitRequestAction({ account_id: String(account?.account?.id!) })
    );
    if (response.type === 'resubmitRequestAction/fulfilled') {
      openSuccessPopupMessage('Success', response.payload?.detail);
    }
  };

  const generateDateOfLoraStatus = (
    loraStatus: AccountLoraAccountLoraStatusChoices
  ): string => {
    if (loraAccount?.history) {
      const loraStatusHistory = loraAccount?.history.find(
        account => account?.loraStatus === loraStatus
      );
      return loraStatusHistory
        ? dayjs(loraStatusHistory.createdAt).format('DD/MM/YYYY')
        : '';
    }
    return '';
  };

  const disableApproveRejectUserBtn = (): boolean =>
    loraAccount
      ? [
          AccountLoraAccountLoraStatusChoices.RejectedIbkr,
          AccountLoraAccountLoraStatusChoices.RejectedLora,
          AccountLoraAccountLoraStatusChoices.PendingIbkr
        ].includes(loraAccount!.loraStatus)
      : false;

  return (
    <>
      <LoadingOverlay
        active={loadingOverlay.active}
        placeholder={loadingOverlay.placeholder}
      />
      <PopupMessage
        isOpen={popupMessage.isOpen}
        title={popupMessage.title}
        message={popupMessage.message}
        type={popupMessage.type}
        toggle={closeModal}
        onClick={onClickButtonInPopupMessage}
        buttonTitle={popupMessage.buttonTitle}
        disabled={popupMessage.disabled}
      >
        {popupMessage.title === 'Change User Status' ? (
          <div className='w-100'>
            <p>Select which action to perform:</p>
            <div className='d-flex flex-row justify-content-around mt-4'>
              {loraAccount?.loraStatus === 'ACTIVE' ? (
                <img
                  src={
                    isConfirmSuspendUser
                      ? icons.suspend_user
                      : icons.suspend_user_uncheck
                  }
                  alt='Suspend User'
                  className={styles.change_status_icon}
                  onClick={handleSuspendUser}
                />
              ) : (
                <img
                  src={
                    isConfirmReactivateUser
                      ? icons.reactivate_user
                      : icons.reactivate_user_uncheck
                  }
                  alt='Reactivate User'
                  className={styles.change_status_icon}
                  onClick={handleReactivateUser}
                />
              )}
            </div>
          </div>
        ) : null}
      </PopupMessage>
      <div className={styles.overview_card + ' pt-4 px-3 pb-3'}>
        <div className='d-flex'>
          <div className='flex-grow-1'>
            <div>
              <div className='pb-5'>
                <p className={styles.user_name + ' mb-2'}>
                  {account?.account?.fullName ??
                    _.capitalize(account.account?.email.split('@')[0])}
                </p>
                <p className={styles.label + ' mb-2'}>
                  Member Since:{' '}
                  <span className={styles.fill_text + ' ps-2'}>
                    {account.account?.dateJoined
                      ? dayjs(account.account?.dateJoined).format('DD/MM/YYYY')
                      : '-'}
                  </span>
                </p>
                <Row className='gap-3'>
                  <Col className='d-flex gap-4 align-items-center'>
                    <div>
                      <GoMail size={25} color='#838383' />
                    </div>
                    <p>{account.account?.email}</p>
                  </Col>
                  <Col className='d-flex gap-4 align-items-center'>
                    <div>
                      <BsTelephone size={20} color='#838383' />
                    </div>
                    <p>
                      {personalInfo?.phoneNumber
                        ? `+${personalInfo?.phoneCountryCode}${personalInfo?.phoneNumber}`
                        : null}
                    </p>
                  </Col>
                </Row>
              </div>
              <div className='pb-5'>
                <p className={styles.label + ' mb-2'}>
                  Approved by IBKR At :{' '}
                  <span className={styles.fill_text + ' ps-2'}>
                    {generateDateOfLoraStatus(
                      AccountLoraAccountLoraStatusChoices.FinalApprovalRequired
                    )}
                  </span>
                </p>
                <Row className='gap-3'>
                  <Col className='d-flex gap-4 align-items-center'>
                    <p className={styles.label + ' mb-2'}>
                      Final Approval Given At :{' '}
                      <span className={styles.fill_text + ' ps-2'}>
                        {loraAccount?.finalApprovalGiven
                          ? dayjs(loraAccount?.finalApprovalGiven).format(
                              'DD/MM/YYYY'
                            )
                          : '-'}
                      </span>
                    </p>
                  </Col>
                  <Col className='d-flex gap-4 align-items-center'>
                    <p className={styles.label + ' mb-2'}>
                      Approved By :
                      <span className={styles.fill_text + ' ps-2'}>
                        {loraAccount?.approvedBy?.name}
                      </span>
                    </p>
                  </Col>
                </Row>
                <p className={styles.label + ' mb-2'}>
                  Date Suspended :{' '}
                  <span className={styles.fill_text + ' ps-2'}>
                    {generateDateOfLoraStatus(
                      AccountLoraAccountLoraStatusChoices.Suspended
                    )}
                  </span>
                </p>
                {loraAccount?.loraStatus ===
                  AccountLoraAccountLoraStatusChoices.RejectedIbkr ||
                loraAccount?.loraStatus ===
                  AccountLoraAccountLoraStatusChoices.RejectedLora ? (
                  <p className={styles.label + ' mb-2'}>
                    Date Rejected :{' '}
                    <span className={styles.fill_text + ' ps-2'}>
                      {generateDateOfLoraStatus(
                        AccountLoraAccountLoraStatusChoices.RejectedLora
                      )}
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className='d-flex flex-column gap-4 justify-content-between align-items-end'>
            <div className='d-flex flex-column gap-2 align-items-end'>
              {loraAccount?.loraStatus ===
                AccountLoraAccountLoraStatusChoices.Active ||
              loraAccount?.loraStatus ===
                AccountLoraAccountLoraStatusChoices.Suspended ? (
                <>
                  <TagLabel
                    label={loraAccount?.loraStatus}
                    bgColor={
                      loraAccount?.loraStatus ===
                      AccountLoraAccountLoraStatusChoices.Active
                        ? '#ADEBA4'
                        : ' #F3B9B9'
                    }
                    color={
                      loraAccount?.loraStatus ===
                      AccountLoraAccountLoraStatusChoices.Active
                        ? '#009821'
                        : '#C33335'
                    }
                  />
                  <TagLabel label='CORE' />
                </>
              ) : null}
            </div>
            <div className='d-flex flex-column gap-3'>
              {loraAccount?.loraStatus ===
                AccountLoraAccountLoraStatusChoices.Active ||
              loraAccount?.loraStatus ===
                AccountLoraAccountLoraStatusChoices.Suspended ? (
                <div>
                  <Button
                    className={styles.change_status}
                    onClick={onChangeStatusUser}
                  >
                    Change Status
                  </Button>
                </div>
              ) : (
                <div className='d-flex flex-column align-items-start'>
                  {loraAccount?.loraStatus ===
                  AccountLoraAccountLoraStatusChoices.PendingLora ? (
                    <div>
                      <Button
                        className={styles.reject_user}
                        onClick={onAmendmentsNeeded}
                      >
                        {loading.source === 'resubmitRequestAction/pending' &&
                        loading.status ? (
                          <Spinner color='primary' size='sm' />
                        ) : (
                          'AMENDMENTS NEEDED'
                        )}
                      </Button>
                    </div>
                  ) : null}
                  <div>
                    <Button
                      className={styles.reject_user}
                      onClick={onRejectUser}
                      disabled={disableApproveRejectUserBtn()}
                    >
                      Reject User
                    </Button>
                  </div>

                  <div>
                    {loraAccount?.loraStatus ===
                    AccountLoraAccountLoraStatusChoices.FinalApprovalRequired ? (
                      <Button
                        className={styles.final_approve_user}
                        onClick={() => onApproveUser('final_approve')}
                      >
                        Final Approval
                      </Button>
                    ) : (
                      <>
                        <Button
                          className={styles.approve_user}
                          onClick={() => onApproveUser('approve')}
                          disabled={disableApproveRejectUserBtn()}
                        >
                          Approve User
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
