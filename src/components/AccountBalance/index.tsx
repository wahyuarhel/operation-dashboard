import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';

import AccountBalanceCard from '../AccountBalanceCard/index';
import PaymentStatusCard from '../PaymentStatusCard/index';
import AccountBalanceModal from 'components/AccountBalanceModal';
import './styles.scss';
import { images } from '../../constants';
import { statusTabs } from '../../types/user_types';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { setDbsLora } from 'redux/slice/transactionSlice';

interface AccountBalanceProps {
  page?: string;
  statusTabs: statusTabs[];
}

const ENV = process.env.REACT_APP_ENV;

const AccountBalance: React.FunctionComponent<AccountBalanceProps> = (
  props: AccountBalanceProps
) => {
  const dispatch = useAppDispatch();
  const { page, statusTabs } = props;
  const { hkdEnquiry, multiCcyEnquiry, firmBalance, dbsLora } = useAppSelector(
    state => state.transaction
  );

  const [accountBalance, setAccountBalance] = useState<{
    isOpen: boolean;
    value: string;
    title: string;
    accountName: string;
  }>({ isOpen: false, value: '', title: '', accountName: '' });

  const generateDbsLoraAmount = () => {
    if (ENV != 'Production') {
      return (
        Number(
          dbsLora === '0' && hkdEnquiry?.clsAvailableBal
            ? hkdEnquiry?.clsAvailableBal
            : dbsLora
        ) ?? 0
      );
    } else {
      return hkdEnquiry ? Number(hkdEnquiry?.clsAvailableBal) : 0;
    }
  };

  const onToggleAccountBalance = () => {
    setAccountBalance({ ...accountBalance, isOpen: false });
  };

  const handleClickAccountBalance = (accountName: string) => {
    if (ENV != 'Production' && accountName === 'DBS - LORA') {
      setAccountBalance({
        ...accountBalance,
        isOpen: true,
        title: `Set ${accountName} Value`,
        accountName: accountName
      });
    }
  };

  const onSave = value => {
    dispatch(setDbsLora(value));
    setAccountBalance({ ...accountBalance, isOpen: false });
  };

  return (
    <Container id='account-balance-container'>
      <h2>Accounts</h2>
      {ENV != 'Production' ? (
        <AccountBalanceModal
          isOpen={accountBalance.isOpen}
          toggle={onToggleAccountBalance}
          title={accountBalance.title}
          onSave={onSave}
        />
      ) : null}

      <Row className='mt-3'>
        <Col className='d-flex gap-3'>
          {[
            {
              accountName: 'DBS - LORA',
              accountNo: hkdEnquiry?.accountNo,
              accountLogo: images.dbs,
              currency: hkdEnquiry?.accountCcy ?? 'HKD',
              amount: generateDbsLoraAmount()
            },
            {
              accountName: 'DBS - Client',
              accountNo: multiCcyEnquiry?.accountNo,
              accountLogo: images.dbs,
              currency: multiCcyEnquiry?.accountCcy ?? 'HKD',
              amount: multiCcyEnquiry
                ? Number(multiCcyEnquiry?.clsAvailableBal)
                : 0
            }
          ].map((account, index) => (
            <AccountBalanceCard
              key={index}
              accountName={account.accountName!}
              accountNo={account.accountNo!}
              accountIcon={account.accountLogo!}
              currency={account.currency!}
              amount={account.amount!}
              handleClick={() => handleClickAccountBalance(account.accountName)}
            />
          ))}
        </Col>
        <Col>
          <PaymentStatusCard page={page} statusTabs={statusTabs} />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountBalance;
