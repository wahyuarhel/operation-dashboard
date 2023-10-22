import React, { FC } from 'react';
import styles from './styles.module.scss';
import PortfolioCard from 'components/PortfolioCard/index';
import PortfolioDetail from 'components/PortfolioDetail/index';
import StockCard from 'components/StockCard/index';

interface PortfolioProps {
  data;
}
const Portfolio: FC<PortfolioProps> = ({ data }) => {
  return (
    <div className={styles.portfolio}>
      <PortfolioCard data={{}} />
      <PortfolioDetail data={{}} />
      <StockCard
        data={[
          {
            name: 'Plank AMZN - 2M',
            company: 'Vanguard Total Stock Market Index Fund ETF',
            price: '$1,000.00',
            percentage: 4.2,
            deviation: 50,
            expired: 'Active - Expires: 10:00EST, 30/03/2023',
            start: 'Start: 10:00EST, 30/01/2023'
          }
        ]}
      />
    </div>
  );
};

export default Portfolio;
