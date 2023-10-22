import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { statusTabs } from '../../types/user_types';
import './styles.scss';
import { tab } from 'types/transaction_types';

interface StatusTabProps {
  statusTabs: statusTabs[];
  handleTabStatus?: any;
}

const StatusTab: React.FunctionComponent<StatusTabProps> = (
  props: StatusTabProps
) => {
  const { statusTabs, handleTabStatus } = props;

  function tabName(name: string): string {
    let newName: string;
    newName = name.split(' ').join('\n')
    switch (name) {
      case tab.reject:
      case tab.return:
      case tab.unknown:
        return newName;
      default:
        return name
    }
  }
  return (
    <Container id='status-tab-container'>
      <div className='tab-container'>
        {statusTabs.map((status: statusTabs, index: number) => (
          <div
            key={index}
            className='tab-wrapper'
            onClick={() => handleTabStatus(index)}
          >
            <span
              className='status-text'
              style={{
                borderBottom: `2px solid ${status.isActive ? 'black' : '#C0C0C0'
                  }`,
                color: status.isActive ? 'black' : '#C0C0C0'
              }}
            >
              {tabName(status.name)}
            </span>
            <div className='amount-container'>
              <p className='amount-text'>{status.total}</p>
            </div>

          </div>
        ))}
      </div>
    </Container>
  );
};

export default StatusTab;
