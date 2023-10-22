import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from 'reactstrap';
import { useAppSelector } from '../../redux/store/hooks';
import './styles.scss';

interface FXRateModalProp {
  title: string;
  isOpen: boolean;
  toggle?: () => void;
  onClickContinue?: () => void;
  depositRate: { value: number | null; error: string };
  withdrawalRate: { value: number | null; error: string };
  setDepositRate?: (e: any) => void;
  setWithdrawalRate?: (e: any) => void;
}

const FXRateModal: React.FunctionComponent<FXRateModalProp> = (
  props: FXRateModalProp
) => {
  const {
    title,
    isOpen = false,
    toggle,
    onClickContinue,
    depositRate,
    withdrawalRate,
    setDepositRate,
    setWithdrawalRate
  } = props;
  const { loadingTransaction, successMessageTransaction, exchangeRate } =
    useAppSelector(state => state.transaction);

  const [isEditDepositRate, setIsEditDepositRate] = useState(false);
  const [isEditWithdrawalRate, setIsEditWithdrawalRate] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      scrollable
      centered
      backdrop={false}
      toggle={toggle}
      id='message-container'
      size='lg'
    >
      <ModalHeader style={{ border: 0 }} toggle={toggle}>
        {title}
      </ModalHeader>
      <ModalBody className='modal-body'>
        <div className='fx-rate-main-container'>
          <div className='fx-rate-sub-container'>
            <div className='fx-rate-small-title'></div>
            <div className='fx-rate-small-title'>
              <h6>Reuters</h6>
            </div>
            <div className='fx-rate-small-title'>
              <h6>LORA</h6>
            </div>
            <div className='fx-rate-medium-title'>
              <h6>Spread(bps)</h6>
            </div>
          </div>
          <div className='fx-rate-sub-container'>
            <div className='fx-rate-small-title'>
              <p style={{ textAlign: 'left' }}>
                Deposit
                <br />
                USD{'->'}HKD
              </p>
            </div>
            <div className='fx-rate-small-title'>
              {exchangeRate &&
                Number.parseFloat(exchangeRate?.deposit?.rate)
                  .toFixed(4)
                  .toString()}
            </div>
            <div className='fx-rate-small-title'>
              {exchangeRate &&
                Number.parseFloat(exchangeRate?.deposit?.computedRate)
                  .toFixed(4)
                  .toString()}
            </div>
            <div className='fx-rate-medium-title'>
              {isEditDepositRate ? (
                <>
                  <div className='input-rate-container'>
                    <Input
                      className='edit-fx-input'
                      type='number'
                      value={depositRate.value!}
                      placeholder={String(depositRate.value)}
                      onChange={setDepositRate}
                    />
                    {depositRate.error && (
                      <p className='error-text '>{depositRate.error}</p>
                    )}
                  </div>

                  <Button
                    style={{
                      backgroundColor: '#0156D6'
                    }}
                    className='confirm-button'
                    onClick={() => setIsEditDepositRate(!isEditDepositRate)}
                  >
                    Confirm
                  </Button>
                </>
              ) : (
                <>
                  <p>
                    {depositRate.value
                      ? depositRate.value
                      : exchangeRate?.deposit?.spread}
                  </p>
                  <p
                    className='edit-text'
                    onClick={() => setIsEditDepositRate(!isEditDepositRate)}
                  >
                    Edit
                  </p>{' '}
                </>
              )}
            </div>
          </div>

          <div className='fx-rate-sub-container'>
            <div className='fx-rate-small-title'>
              <p style={{ textAlign: 'left' }}>
                Withdrawal
                <br />
                HKD{'->'}USD
              </p>
            </div>
            <div className='fx-rate-small-title'>
              {exchangeRate &&
                Number.parseFloat(exchangeRate?.withdrawal?.rate)
                  .toFixed(4)
                  .toString()}
            </div>
            <div className='fx-rate-small-title'>
              {exchangeRate &&
                Number.parseFloat(exchangeRate?.withdrawal?.computedRate)
                  .toFixed(4)
                  .toString()}
            </div>
            <div className='fx-rate-medium-title'>
              {isEditWithdrawalRate ? (
                <>
                  <div className='input-rate-container'>
                    <Input
                      className='edit-fx-input'
                      type='number'
                      value={withdrawalRate.value!}
                      placeholder={String(withdrawalRate.value)}
                      onChange={setWithdrawalRate}
                    />
                    {withdrawalRate.error && (
                      <p className='error-text '>{withdrawalRate.error}</p>
                    )}
                  </div>

                  <Button
                    style={{
                      backgroundColor: '#0156D6'
                    }}
                    className='confirm-button'
                    onClick={() =>
                      setIsEditWithdrawalRate(!isEditWithdrawalRate)
                    }
                  >
                    Confirm
                  </Button>
                </>
              ) : (
                <>
                  <p>
                    {withdrawalRate.value
                      ? withdrawalRate.value
                      : exchangeRate?.withdrawal?.spread}
                  </p>
                  <p
                    className='edit-text'
                    onClick={() =>
                      setIsEditWithdrawalRate(!isEditWithdrawalRate)
                    }
                  >
                    Edit
                  </p>{' '}
                </>
              )}
            </div>
          </div>
        </div>
      </ModalBody>
      {successMessageTransaction.source ===
        'updateExchangeRateAction/fulfilled' ? (
        <p className='success-message'>{successMessageTransaction.message}</p>
      ) : null}

      <ModalFooter className='justify-content-end' style={{ border: 0 }}>
        <Button
          style={{ backgroundColor: '#0156D6', width: '100px' }}
          onClick={onClickContinue}
          disabled={
            (loadingTransaction.source === 'updateExchangeRateAction/pending' &&
              loadingTransaction.status) ||
            isEditDepositRate ||
            isEditWithdrawalRate ||
            (depositRate.value === 0 && withdrawalRate.value === 0)
          }
        >
          {loadingTransaction.source === 'updateExchangeRateAction/pending' &&
            loadingTransaction.status ? (
            <Spinner size='sm' color='light'>
              Loading...
            </Spinner>
          ) : (
            'Continue'
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FXRateModal;
