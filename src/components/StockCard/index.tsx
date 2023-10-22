import { FC } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai/';
import styles from './styles.module.scss';

interface StockCardProps {
  data;
}

const Stock = ({ stock }) => (
  <div className={styles.stock_card + ' my-3'}>
    <div>
      <p className={styles.stock_name}>{stock.name}</p>
      <p className={styles.stock_company}>{stock.company}</p>
    </div>
    <div className='d-flex flex-column py-2'>
      <div className='d-flex flex-row justify-content-between'>
        <p className={styles.stock_price}>{stock.price}</p>
        <p
          className={styles.stock_price}
          style={{ color: stock.percentage < 0 ? '#C33335' : '#008753' }}
        >
          {stock.percentage}%
        </p>
      </div>
      <p className={styles.stock_deviation}>{stock.deviation}</p>
    </div>
    <div className='d-flex flex-row'>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className={styles.icon_oval + ' my-1'} />
        <AiOutlineCalendar size={15} />
      </div>
      <div className='px-1'>
        <p className={styles.stock_date + ' my-1'}>{stock.expired}</p>
        <p className={styles.stock_date}>{stock.start}</p>
      </div>
    </div>
  </div>
);

const StockCard: FC<StockCardProps> = ({ data }) => {
  return (
    <div
      className={
        styles.stock_container + ' d-flex flex-column align-items-center'
      }
    >
      {data.map((datum, i) => (
        <Stock stock={datum} key={i} />
      ))}
    </div>
  );
};

export default StockCard;
