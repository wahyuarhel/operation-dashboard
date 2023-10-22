import React, { FC } from 'react';
import { Col, Row } from 'reactstrap';
import styles from './styles.module.scss';

interface PortfolioDetailProps {
  data;
}

const PortfolioDetail: FC<PortfolioDetailProps> = ({ data }) => {
  return (
    <div className={styles.portfolio_detail + ' d-flex flex-column gap-3 '}>
      <Row >
        <Col className={styles.container}>
          <p className={styles.label}>Withdrawable Amount (USD)</p>
          <p className={styles.value + ' my-1'}>1,200.00</p>
        </Col>
        <Col className={styles.container}>
          <p className={styles.label}>Buying Power (USD){'\n'}</p>
          <p className={styles.value + ' my-1'}>1,200.00</p>
        </Col>
      </Row>
      <Row >
        <Col className={styles.container}>
          <p className={styles.label}>Total Botstock Value (USD)</p>
          <p className={styles.value + ' my-1'}>800.00</p>
        </Col>
        <Col className={styles.container}>
          <p className={styles.label}>Total P/L</p>
          <p className={styles.value + ' my-1'}>10.02%</p>
        </Col>
      </Row>
    </div>
  );
};

export default PortfolioDetail;
