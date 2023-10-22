import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from 'reactstrap';
import _ from 'lodash';
import { useAppSelector } from '../../redux/store/hooks';
import './styles.scss';

interface AccountBalanceModalProp {
  title: string;
  isOpen: boolean;
  toggle?: () => void;
  onSave?: (value) => void;
}

const AccountBalanceModal: React.FunctionComponent<AccountBalanceModalProp> = (
  props: AccountBalanceModalProp
) => {
  const { title, isOpen = false, toggle, onSave } = props;
  const [value, setValue] = useState(0);

  const onChangeText = value => {
    if (_.isEmpty(value)) {
      setValue(0);
      return;
    }
    const regex = /^[0-9]+$/;
    if (regex.test(value)) {
      setValue(Number(value));
    }
  };

  const onSaveValue = () => onSave && onSave(value);

  return (
    <Modal
      isOpen={isOpen}
      scrollable
      centered
      backdrop={false}
      toggle={toggle}
      id='message-container'
      size='sm'
    >
      <ModalHeader style={{ border: 0 }} toggle={toggle}>
        {title}
      </ModalHeader>
      <ModalBody className='modal-body'>
        <Input
          className='edit-fx-input'
          type='text'
          value={value}
          placeholder={value.toString()}
          onChange={e => onChangeText(e.target.value)}
        />

        <Button
          style={{
            backgroundColor: '#0156D6'
          }}
          className='confirm-button'
          onClick={onSaveValue}
        >
          Save
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default AccountBalanceModal;
