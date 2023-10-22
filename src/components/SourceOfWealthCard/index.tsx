import React, { FC } from 'react';
import { Col, Row } from 'reactstrap';
import { useAppSelector } from 'redux/store/hooks';
import styles from './styles.module.scss';

interface FinancialInformationCardProps {
  data;
}
const FinancialInformationCard: FC<FinancialInformationCardProps> = (
  props: FinancialInformationCardProps
) => {
  const { data } = props;
  const { account } = useAppSelector(state => state.user);
  const { sourceOfWealth } = account;

  const sourceOfWealthObject = {
    INCOME: 'Income from Employment',
    INHERITANCE: 'Inheritance/Gift',
    INTEREST: 'Interest/Dividend Income',
    MARKETPROFIT: 'Market Trading Profits',
    DISABILITY: 'Disability / Severance / Unemployment',
    PENSION: 'Pension / Government Retirement benefit',
    PROPERTY: 'Property',
    ALLOWANCE: 'Allowance / Spousal Income',
    OTHER: 'Other'
  };

  return (
    <div className={styles.source_of_wealth_card}>
      <h4 className='mb-3'>Source Of Wealth</h4>
      <div>
        <Row>
          {sourceOfWealth?.map((item, i) => (
            <Col key={i} xs={6} className={'mb-3'}>
              <Row>
                <Col xs={8}>
                  <p className={styles.label}>
                    {sourceOfWealthObject[item?.wealthSource!]}
                  </p>
                </Col>
                <Col xs={4}>
                  <p className={styles.value}>{`${item?.percentage}%`}</p>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FinancialInformationCard;
