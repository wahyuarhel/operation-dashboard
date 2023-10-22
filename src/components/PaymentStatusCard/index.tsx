import React, { useEffect } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import './styles.scss';
import { statusTabs } from '../../types/user_types';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { useGetQueueQuery } from '../../graphql/queries.generated';
import { setQueue } from '../../redux/slice/transactionSlice';

interface PaymentStatusCardProps {
  page?: string;
  statusTabs: statusTabs[];
}

const PaymentStatusCard: React.FunctionComponent<PaymentStatusCardProps> = (
  props: PaymentStatusCardProps
) => {
  const { page = 'waiting approval', statusTabs } = props;
  const {
    depositTransactions,
    withdrawalTransactions,
    queue,
    waitingApprovalTransactions,
    actionRequiredWithdrawalTransactions,
    unMatchedTransactions
  } = useAppSelector(state => state.transaction);

  function statusTextColor(status: string) {
    switch (status) {
      case 'YELLOW':
      case 'Withdrawals Action Required':
      case 'Waiting Approval Action Required':
        return 'text-yellow';
      case 'RED':
      case 'Unmatched':
        return 'text-red';
      case 'PURPLE':
        return 'text-purple';
      case 'BLACK':
      case 'Returned':
        return 'text';
    }
  }

  useEffect(() => {}, [queue]);

  return (
    <Card id='payment-status-container' className=''>
      <CardBody className='card-body d-flex flex-column justify-content-between'>
        <CardTitle className='card-title'>PAYMENT STATUS</CardTitle>
        <div className='status-container'>
          <div className='d-flex pb-3 mx-3'>
            <p className='action-text pe-5'>Automation</p>
            <p className='action-text text-bold text-green pe-5'>
              {queue.status}
            </p>
            <p className='action-text pe-5 ms-3'>
              Error (if Automation = INACTIVE)
            </p>
            {page === 'waiting approval' && (
              <p className='action-text text-bold text'>{queue.action ?? ''}</p>
            )}
          </div>

          <div className='status-progress-container pb-3'>
            <div className='status-progress-wrapper pe-3'>
              {[
                {
                  status: 'Waiting Approval',
                  total: waitingApprovalTransactions.length
                },
                {
                  status: 'Waiting Approval Action Required',
                  total: unMatchedTransactions.length
                },
                {
                  status: 'Withdrawals Action Required',
                  total: actionRequiredWithdrawalTransactions.length
                }
              ].map((s, i) => (
                <div key={i} className='pe-8 me-3'>
                  <p className='amount-text text-center'>{s.total}</p>
                  <p
                    className={`status-text text-center ${statusTextColor(
                      s?.status!
                    )}`}
                    style={{ width: '75px' }}
                  >
                    {s.status}
                  </p>
                </div>
              ))}
            </div>

            {/* <div className='status-complete-wrapper'>
              {page !== 'waiting approval' && (
                <>
                  <div className='pe-3'>
                    <p className='amount-text text-center'>
                      {depositTransactions.length}
                    </p>
                    <p className='status-text text-center'>Deposits Complete</p>
                  </div>
                  <div>
                    <p className='amount-text text-center'>
                      {withdrawalTransactions.length}
                    </p>
                    <p className='status-text text-center'>
                      Withdrawals Complete
                    </p>
                  </div>
                </>
              )}
            </div> */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PaymentStatusCard;
