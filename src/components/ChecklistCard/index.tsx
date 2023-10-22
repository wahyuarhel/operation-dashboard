import { FC } from 'react';
import { FormGroup, Input } from 'reactstrap';
import _ from 'lodash';

import { ChecklistItemType } from '../../context/EditUserProvider';
import styles from './styles.module.scss';
import useEditUser from '../../hooks/useEditUser';
import { useAppDispatch, useAppSelector } from 'redux/store/hooks';
import { checklistFieldAction } from 'redux/action/userAction';
import { AccountChecklistParam } from '../../types/user_types';
import { AccountLoraAccountLoraStatusChoices } from 'graphql/generated/types';

interface AccountInformationProp {
  userId: string;
}

const ChecklistCard: FC<AccountInformationProp> = (
  props: AccountInformationProp
) => {
  const { accountInformationList } = useEditUser();
  const dispatch = useAppDispatch();
  const { userId } = props;
  const { accountChecklist, account } = useAppSelector(state => state.user);
  const { loraAccount } = account;

  async function handleCheckboxChange(selectedItem: ChecklistItemType) {
    let updateCheckListParam: AccountChecklistParam = {
      user_id: userId
    };
    updateCheckListParam[_.snakeCase(selectedItem!.key)] =
      !accountChecklist[selectedItem!.key];

    const response = await dispatch(checklistFieldAction(updateCheckListParam));
  }

  const disableCheckBox = (): boolean =>
    loraAccount
      ? [
          AccountLoraAccountLoraStatusChoices.PendingIbkr,
          AccountLoraAccountLoraStatusChoices.RejectedIbkr,
          AccountLoraAccountLoraStatusChoices.RejectedLora
        ].includes(loraAccount!.loraStatus)
      : false;

  return (
    <div className={styles.checklist_card}>
      <h4 className='mb-4'>Checklist</h4>
      {accountInformationList.map((item, i) => {
        return (
          <div key={i} className='mb-2 d-flex gap-4'>
            <div className='d-flex align-items-start'>
              <div
                className='d-flex flex-column align-items-center'
                style={{ width: '70px' }}
              >
                {item.icon}
                <p className={styles.label}>{item.label}</p>
              </div>
            </div>
            <div className='flex-grow-1'>
              <FormGroup check>
                <Input
                  id={`${i}`}
                  type='checkbox'
                  value={accountChecklist[item.key] ?? ''}
                  checked={accountChecklist[item.key]}
                  onChange={() => handleCheckboxChange(item)}
                  disabled={disableCheckBox()}
                />
              </FormGroup>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChecklistCard;
