import React, { FC } from 'react';
import styles from './styles.module.scss';

interface PortfolioCardProps {
  data;
}

const PortfolioCard: FC<PortfolioCardProps> = ({ data }) => {
  return (
    <div className={styles.portfolio_card}>
      <p className={styles.label}>Total Portfolio Value (USD)</p>
      <p className={styles.value}>2,000.00</p>
    </div>
  );
};

export default PortfolioCard;
