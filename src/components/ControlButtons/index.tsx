import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import _ from 'lodash';
import { useAppSelector } from '../../redux/store/hooks';
import { ButtonParams, actionButton, tab } from '../../types/transaction_types';

import CustomButton from '../CustomButton/index';
import './styles.scss';
import { TransactionTransactionActivitiesSideChoices } from 'graphql/generated/types';

interface ControlButtonsProps {
  page?: string;
  buttons?: ButtonParams[];
  selectedTransactionIdx?: number[];
  selectedTab?: string;
}
const ControlButtons: React.FunctionComponent<ControlButtonsProps> = (
  props: ControlButtonsProps
) => {
  const { page, buttons, selectedTransactionIdx, selectedTab } = props;
  const {
    errorMessageTransaction,
    loadingTransaction,
    successMessageTransaction,
    exchangeRate
  } = useAppSelector(state => state.transaction);

  const isInQueueWithdrawalTransaction = selectedTab === tab.inQueueWithdrawal;

  const disableButton = (button: string) => {
    if (selectedTab === tab.waitingApproval && button === actionButton.onHold) {
      return false;
    }
    if (
      selectedTab === tab.onHold &&
      (button === actionButton.return ||
        button === actionButton.waitingApproval ||
        button === actionButton.reject)
    ) {
      return false;
    }
    if (
      selectedTab === tab.unMatched &&
      (button === actionButton.forceMatch ||
        button === actionButton.return ||
        button === actionButton.onHold ||
        button === actionButton.reject)
    ) {
      return false;
    }
    if (
      selectedTab === tab.inQueueWithdrawal &&
      (button === actionButton.processWithdrawal ||
        button === actionButton.moveToTop ||
        button === actionButton.reject)
    ) {
      return false;
    }
    if (
      (selectedTab === tab.actionRequired ||
        selectedTab === tab.completedDeposits) &&
      (button === actionButton.restart ||
        button === actionButton.moveToTop ||
        button === actionButton.pause ||
        button === actionButton.processWithdrawal)
    ) {
      return false;
    }
    return true;
  };

  const renderRates = page => {
    if (page === 'deposits') {
      return (
        <div className='d-flex flex-column gap-3 pt-4 pt-lg-0'>
          <Row>
            <Col className='col-2 '>
              <p className='rates-text'>Lora FX Rates:</p>
            </Col>
            <Col className='col-xl-1 col-sm-2'>
              <p className='rates-text'>USD/HKD</p>
            </Col>
            <Col className='col-xl-1 col-sm-2'>
              <p className='rates-text'>
                {exchangeRate &&
                  Number.parseFloat(exchangeRate.withdrawal?.computedRate)
                    .toFixed(4)
                    .toString()}
              </p>
            </Col>
            <Col className='col-xl-1 col-sm-2'>
              <p className='rates-text'>HKD/USD</p>
            </Col>
            <Col className='col-xl-1 col-sm-2'>
              <p className='rates-text'>
                {exchangeRate &&
                  Number.parseFloat(exchangeRate.deposit?.computedRate)
                    .toFixed(4)
                    .toString()}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className='col-2'>
              <p className='rates-text'>REUTERS FX Rates:</p>
            </Col>
            <Col className='col-xl-1 col-sm-2'>
              <p className='rates-text'>USD/HKD</p>
            </Col>
            <Col className='col-xl-1 col-sm-2'>
              <p className='rates-text'>
                {exchangeRate &&
                  Number.parseFloat(exchangeRate.withdrawal?.rate)
                    .toFixed(4)
                    .toString()}
              </p>
            </Col>
            <Col className='col-xl-1 col-sm-2'>
              <p className='rates-text'>HKD/USD</p>
            </Col>
            <Col className='col-xl-1 col-sm-2'>
              <p className='rates-text'>
                {exchangeRate &&
                  Number.parseFloat(exchangeRate.deposit?.rate)
                    .toFixed(4)
                    .toString()}
              </p>
            </Col>
          </Row>
        </div>
      );
    }
  };

  const rejectedResponse: string[] = [
    'updateTransactionRemittanceAction/rejected/NEEDAPPROVAL',
    'updateTransactionRemittanceAction/rejected/ONHOLD',
    'updateTransactionRemittanceAction/rejected/RETURN',
    'approveTransactionAction/rejected',
    'onHoldTransactionAction/rejected',
    'forceMatchTransactionAction/rejected',
    'needApprovalTransactionAction/rejected'
  ];

  const successResponse: string[] = [
    'updateTransactionRemittanceAction/fulfilled/NEEDAPPROVAL',
    'updateTransactionRemittanceAction/fulfilled/ONHOLD',
    'updateTransactionRemittanceAction/fulfilled/RETURN',
    'approveTransactionAction/fulfilled',
    'onHoldTransactionAction/fulfilled',
    'forceMatchTransactionAction/fulfilled',
    'needApprovalTransactionAction/fulfilled'
  ];

  function renderLoadingComponent(index: number): boolean {
    if (page === 'waiting approval') {
      if (index === 0)
        return (
          loadingTransaction.source === 'onHoldTransactionAction/pending' &&
          loadingTransaction.status
        );
      if (index === 1)
        return (
          loadingTransaction.source ===
            'needApprovalTransactionAction/pending' && loadingTransaction.status
        );
      if (index === 2)
        return (
          loadingTransaction.source === 'forceMatchTransactionAction/pending' &&
          loadingTransaction.status
        );
      if (index === 3)
        return (
          loadingTransaction.source === 'deleteTransactionAction/pending' &&
          loadingTransaction.status
        );
      else return false;
    }
    return false;
  }

  const renderErrorMessage = () => {
    if (errorMessageTransaction.source === 'deleteTransactionAction/rejected') {
      return (
        <>
          {!isInQueueWithdrawalTransaction ? (
            <p className='error-message'>{errorMessageTransaction.message}</p>
          ) : null}
        </>
      );
    } else {
      return (
        <>
          {rejectedResponse.includes(errorMessageTransaction.source) ? (
            <p className='error-message'>{errorMessageTransaction.message}</p>
          ) : null}
        </>
      );
    }
  };

  const renderSuccessMessage = () => {
    if (
      successMessageTransaction.source === 'deleteTransactionAction/fulfilled'
    ) {
      return (
        <>
          {!isInQueueWithdrawalTransaction ? (
            <p className='success-message'>
              {successMessageTransaction.message}
            </p>
          ) : null}
        </>
      );
    } else {
      return (
        <>
          {successResponse.includes(successMessageTransaction.source) ? (
            <p className='success-message'>
              {successMessageTransaction.message}
            </p>
          ) : null}
        </>
      );
    }
  };

  return (
    <Container id='control-btn-container' className='py-4'>
      <div className='d-flex flex-wrap column-gap-4 row-gap-2'>
        {buttons?.map((btn: ButtonParams, index: number) => {
          return (
            <React.Fragment key={index}>
              <CustomButton
                key={index}
                disabled={disableButton(btn.title)}
                onPressButton={btn.onPressButton}
                title={btn.title}
                titleStyle='ubuntu-font_700'
                isLoading={renderLoadingComponent(index)}
              />
              {index === 1 ? <div style={{ width: '100%' }} /> : null}
            </React.Fragment>
          );
        })}
      </div>
      {renderErrorMessage()}
      {renderSuccessMessage()}
    </Container>
  );
};

export default ControlButtons;
