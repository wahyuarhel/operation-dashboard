import React, { FC } from 'react';
import { useAppSelector } from 'redux/store/hooks';
import styles from './styles.module.scss';

interface RiskInformationCardProps {
  data;
}
const RiskInformationCard: FC<RiskInformationCardProps> = (
  props: RiskInformationCardProps
) => {
  const { data } = props;
  const { ppiAccount } = useAppSelector(state => state.ppi);

  const tableRiskInformation = [
    {
      label: 'Suitability',
      value: ppiAccount?.snapshots?.suitability
        ? Number(ppiAccount?.snapshots?.suitability!).toFixed(1)
        : 0
    },
    {
      label: 'Objective',
      value: ppiAccount?.snapshots?.objective
        ? Number(ppiAccount?.snapshots?.objective!).toFixed(1)
        : 0
    },
    {
      label: 'MRS',
      value: ppiAccount?.snapshots?.maxRiskScore
        ? Number(ppiAccount?.snapshots?.maxRiskScore!).toFixed(1)
        : 0
    }
  ];

  function fontColor(number: number, index: number): Object {
    if (
      (index === 0 && number < 3.1) ||
      (index === 1 && number < 3) ||
      (index === 2 && number < 3.1)
    ) {
      return { color: '#C33335' };
    }
    return { color: '#009821' };
  }
  return (
    <div className={styles.risk_information_card}>
      <div>
        <h4 className='mb-2'>Risk information</h4>
        <p className={styles.risk_desc}>
          System will flag as WARNING if a user’s
        </p>
        <ul className={styles.risk_desc}>
          <li>Suitability Score is less than 3.1</li>
          <li>Objective Score is less than 3</li>
          <li>MRS is less than 3.1</li>
        </ul>
      </div>
      <div className='flex-grow-1'>
        <table>
          <tbody>
            {tableRiskInformation.map((item, i) => (
              <tr key={i}>
                <td>{item.label}</td>
                <td style={fontColor(Number(item.value), i)}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskInformationCard;
