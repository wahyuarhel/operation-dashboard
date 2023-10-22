import React, { MouseEventHandler } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from 'reactstrap';

import './styles.scss';
import { useNotification } from 'hooks/useNotification';

interface PushNotificationProps {
  isOpen: boolean;
  isLoading: boolean;
  onSendMessage: MouseEventHandler<HTMLButtonElement>;
  toggle: () => void;
}

const MAX_TOTAL_CHARS = 1024;
const WARNING_MESSAGE =
  'Total characters of notification is exceeded (maximum limit is 1024 characters).';

const PushNotification: React.FC<PushNotificationProps> = ({
  isOpen,
  isLoading,
  onSendMessage,
  toggle,
  ...props
}) => {
  const { state, onInputTitle, onInputBody, onOpenNotification } =
    useNotification();

  const totalChars: number = state.title.length + state.body.length;

  const disableSendButton = (): boolean =>
    state.title.length == 0 || totalChars == 0 || totalChars > MAX_TOTAL_CHARS
      ? true
      : false;

  return (
    <Modal
      isOpen={isOpen}
      centered
      id='message-container'
      size='lg'
      toggle={toggle}
    >
      <ModalHeader style={{ border: 0 }}>Push Notification Form</ModalHeader>
      <ModalBody className='modal-body'>
        <Input
          type='text'
          placeholder='Title'
          className='input'
          value={state.title}
          onChange={e => onInputTitle(e)}
        />
        <Input
          type='textarea'
          placeholder='Message'
          value={state.body}
          rows={10}
          className='input'
          onChange={e => onInputBody(e)}
        />
        <div className='error-message-container '>
          {totalChars > MAX_TOTAL_CHARS ? (
            <p className='error-message'>{WARNING_MESSAGE}</p>
          ) : null}
        </div>
      </ModalBody>
      <ModalFooter className='justify-content-end' style={{ border: 0 }}>
        <Button
          color='primary'
          className='send-button'
          onClick={onSendMessage}
          disabled={disableSendButton()}
        >
          {isLoading ? <Spinner size='sm' color='light' /> : 'Send'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PushNotification;
