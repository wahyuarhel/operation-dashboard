import dayjs from 'dayjs';
import React from 'react';
import { RiPulseLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import styles from './styles.module.scss';
import Icons from 'constants/icons';
import Icon from 'components/Icons';
import { useAppSelector } from 'redux/store/hooks';

interface AccountInformationProp {
  data;
}
const AccountInformationCard: React.FC<AccountInformationProp> = (
  props: AccountInformationProp
) => {
  const { account } = useAppSelector(state => state.user);
  const { ppiAccount } = useAppSelector(state => state.ppi);
  const { loraAccount } = account;

  const accountInformation = [
    {
      icon: <Icon src={Icons.userId} size={25} />,
      label: 'User ID',
      value: account.account?.id
    },
    {
      icon: <Icon src={Icons.IbUserId} size={25} />,
      label: 'IB User ID',
      value: loraAccount?.ibUserId ?? 'N/A'
    },
    {
      icon: <RiPulseLine size={25} color='#838383' />,
      label: 'Status',
      value: loraAccount?.loraStatus ?? 'ONBOARDING',
      subValue: loraAccount?.updated
    },
    {
      icon: <RiPulseLine size={25} color='#838383' />,
      label: 'IB Status',
      value: loraAccount?.ibStatus ?? 'N/A',
      subValue: loraAccount?.ibStatus ? loraAccount?.updated : ''
    },
    {
      // icon: <Icon src={Icons.nickName} size={25} />,
      // label: 'Nickname',
      // value: ppiAccount?.name
    },
    {
      icon: <Icon src={Icons.subscription} size={25} />,
      label: 'Subscription',
      value: 'Inactive'
    }
    // SKIP IT FIRST
    // {
    //   icon: <Icon src={Icons.buying_power} size={25} />,
    //   label: 'Buying Power',
    //   value: ''
    // }
  ];

  const statusStyle = {
    orange: {
      color: '#F29100',
      fontWeight: 'bold'
    },
    red: {
      color: '#C33335',
      fontWeight: 'bold'
    },
    green: {
      color: '#009821',
      fontWeight: 'bold'
    },
    black: {
      color: 'black',
      fontWeight: 'bold'
    },
    blue: {
      color: '#006EF2',
      fontWeight: 'bold'
    }
  };
  const fontColor = (status: string) => {
    const formattedStatus = status ? status.replace(/_/g, ' ') : '';
    if (
      [
        'ONBOARDING',
        'PENDING LORA',
        'PENDING IBKR',
        'AWAITING USER ACTION'
      ].includes(formattedStatus)
    ) {
      return statusStyle.orange;
    }
    if (
      [
        'SUSPENDED',
        'PENDING SUSPEND',
        'REJECTED IBKR',
        'REJECTED LORA'
      ].includes(formattedStatus)
    ) {
      return statusStyle.red;
    }

    if (
      ['REQUESTED CLOSE', 'PENDING CLOSE', 'CLOSED'].includes(formattedStatus)
    ) {
      return statusStyle.black;
    }

    if (formattedStatus === 'FINAL APPROVAL REQUIRED') {
      return statusStyle.blue;
    }

    if (formattedStatus === 'ACTIVE' || formattedStatus === 'OPEN') {
      return statusStyle.green;
    }
  };
  return (
    <div className={styles.account_information}>
      <h4 className='mb-3'> Account Information</h4>
      <Row>
        {accountInformation.map((item, i) => (
          <Col xs='6' key={i} className='pb-3'>
            <div className='d-flex gap-3 align-items-center'>
              <div className={styles.label_icon_wrapper}>
                <div className='d-flex flex-column gap-1 align-items-center justify-content-start'>
                  {item.icon}
                  <p className={styles.label}>{item.label}</p>
                </div>
              </div>
              <div className={styles.value_wrapper}>
                <p
                  className={styles.value}
                  style={
                    item.label === 'Status' || item.label === 'IB Status'
                      ? fontColor(item.value as string)
                      : {}
                  }
                >
                  {item.label === 'Status' && item.value
                    ? String(item.value).replace(/_/g, ' ')
                    : item.value}
                </p>
                {item.subValue && (
                  <p className={styles.sub_value}>
                    Last Updated:{' '}
                    {dayjs(item?.subValue).format('DD/MM/YYYY HH:mm:ss')}
                  </p>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AccountInformationCard;
