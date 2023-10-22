import React from 'react';
import { CardGroup, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { formatNumber } from '../../utils/formatNumber';
import './styles.scss';

interface AccountBalanceCardProps {
  accountName: string;
  accountNo: string;
  accountIcon: any;
  currency: string;
  amount: number;
  handleClick?: (accountName: string) => void;
}

const AccountBalanceCard: React.FunctionComponent<AccountBalanceCardProps> = (
  props: AccountBalanceCardProps
) => {
  const { accountName, accountNo, accountIcon, currency, amount, handleClick } =
    props;

  function bgColorCard(accountName: string): string {
    switch (accountName) {
      case 'DBS - LORA':
        switch (true) {
          case amount >= 6000000:
            return 'card_ok';
          case amount > 5000000 && amount < 6000000:
            return 'card_min';
          case amount <= 5000000:
            return 'card_low';
        }
        return 'card_ok';
      default:
        return 'card';
    }
  }
  return (
    <CardGroup
      id='account-balance-card'
      onClick={() => handleClick && handleClick(accountName)}
    >
      <Card className={bgColorCard(accountName)}>
        <CardBody className='card-body'>
          <div>
            <div className='account-container'>
              <CardTitle className='card-title'>{accountName}</CardTitle>
              <img
                src={accountIcon}
                className={
                  accountName === 'IBKR CREDIT LINE'
                    ? 'ibkr-icon'
                    : 'account-icon'
                }
                alt={accountName}
              />
            </div>
            <p className='account-number-text'>{accountNo}</p>
          </div>
          <div className='amount-container'>
            <CardSubtitle className='currency'>{currency}</CardSubtitle>
            <CardSubtitle className='amount'>
              {formatNumber(amount)}
            </CardSubtitle>
          </div>
        </CardBody>
      </Card>
    </CardGroup>
  );
};

export default AccountBalanceCard;
