import React, { useEffect } from 'react';

import { BsFillCheckCircleFill, BsFillCircleFill } from 'react-icons/bs';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { images } from '../../constants';
import { Maybe, TransactionStatusCodeType, TransactionTransactionActivitiesSideChoices } from '../../graphql/generated/types';
import ImageUploader from '../ImageUploader';
import './styles.scss';
import StatusTab from 'components/StatusTab';
import { tab } from 'types/transaction_types';

interface StatusTimelineProps {
  onViewConversation: any;
  transactionName?: string;
  onSubmit: () => void;
  selectedFile: File;
  setSelectedFile: Function;
  status: TransactionStatusCodeType;
  selectedTabMenu: tab;
}

const StatusTimeline: React.FunctionComponent<StatusTimelineProps> = (
  props: StatusTimelineProps
) => {
  const {
    onViewConversation,
    transactionName,
    onSubmit,
    selectedFile,
    setSelectedFile,
    status,
    selectedTabMenu,
  } = props;

  const statusDeposit = ['DBA Checks', 'Funds Place Into DBS Client'];
  const statusWithdrawal = ['Withdrawal Sent To User'];

  function iconStatus(i: number) {
    if ([tab.rejectedWithdrawal, tab.actionRequired].includes(selectedTabMenu)) {
      return <FaTimesCircle size={20} color='#E24C4B' />;
    }
    if ([tab.deposits, tab.withdrawals, tab.completedDeposits].includes(selectedTabMenu)) {
      return <FaCheckCircle size={20} color='#32ba7c' />;
    }
    if ([tab.unMatched, tab.rejectedOrReturnedDeposit].includes(selectedTabMenu)) {
      if (i < statusDeposit.length - 1) {
        return <FaTimesCircle size={20} color='#E24C4B' />;
      }
    }
    return <BsFillCircleFill size={20} color='#c8c8c8' />;
  }

  function statusMessage(i: number): Maybe<string> | undefined {
    if (selectedTabMenu === tab.unMatched)
      return i < statusDeposit.length - 1 ? status.statusName : '';
    if (selectedTabMenu === tab.actionRequired)
      return status.statusName
    return null;
  }

  function renderTransactionDescriptionStatus(): JSX.Element | null {
    if (selectedTabMenu === tab.rejectedOrReturnedDeposit)
      return (
        <div className='px-5 pb-4'>
          <p className='text-danger text-center'>
            <b>RETURNED</b>
          </p>
        </div>
      )
    else if (selectedTabMenu === tab.rejectedWithdrawal)
      return (
        <div className='px-5 pb-4'>
          <p className='text-danger text-center'>
            <b>REJECTED</b>
          </p>
        </div>
      )
    return null
  }

  return (
    <div id='timeline-container' className='d-flex flex-column h-100'>
      <div>
        <h6 className='title mb-4'>Status</h6>
      </div>
      <div className='d-flex flex-column h-100 pe-xl-4'>
        <div className='h-100 timeline-wrapper'>
          {transactionName === 'deposits'
            ? statusDeposit.map((sts, i) => (
              <div
                key={i}
                className='line-container ms-2'
                style={{
                  height:
                    i !== statusDeposit.length - 1
                      ? `${100 / statusDeposit.length}%`
                      : 0
                }}
              >
                <div className='d-flex'>
                  <div className='img-checked'>{iconStatus(i)}</div>
                  <div className='d-flex w-100 gap-3'>
                    <div className='status-progress-wrapper'>
                      <p className='status-progress-text'>{sts}</p>
                    </div>
                    <div className='status-info-wrapper'>
                      <p className='status-info-text'>{statusMessage(i)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
            : statusWithdrawal.map((sts, i) => (
              <div
                key={i}
                className='line-container ms-2'
                style={{
                  height:
                    i !== statusWithdrawal.length - 1
                      ? `${100 / statusWithdrawal.length}%`
                      : 0
                }}
              >
                <div className='d-flex'>
                  <div className='img-checked'>{iconStatus(i)}</div>
                  <div className='d-flex w-100 gap-3'>
                    <div className='status-progress-wrapper'>
                      <p className='status-progress-text'>{sts}</p>
                    </div>
                    <div className='status-info-wrapper'>
                      <p className='status-info-text'>{statusMessage(i)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className='d-flex flex-column align-items-center'>
          {renderTransactionDescriptionStatus()}
          <ImageUploader
            onSubmit={onSubmit}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
          <span
            className='view-conversation-label'
            onClick={() => onViewConversation(true)}
          >
            View Conversation
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusTimeline;
