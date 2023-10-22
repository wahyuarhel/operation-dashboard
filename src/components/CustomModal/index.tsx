import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap';
import './styles.scss';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonTitle: string;
  placeHolder?: string;
  onPressButton?: () => {};
}

const CustomModal: React.FunctionComponent<CustomModalProps> = (
  props: CustomModalProps
) => {
  const { isOpen, title, message, buttonTitle } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const titleColor =
    title === 'Approve User'
      ? '#008753'
      : title === 'Reject User'
      ? '#AE1F00'
      : '#000';
  return (
    <div id='modal-container'>
      <Modal isOpen={isOpen} toggle={toggle} centered size='md'>
        <ModalHeader
          className='modal-header'
          style={{
            color: titleColor
          }}
        >
          {title}
        </ModalHeader>
        <ModalBody className='modal-body'>
          {message}
          {(title === 'Reject User' || title == 'Error user') && (
            <Input
              id='exampleText'
              name='text'
              type='textarea'
              className='text-area '
            />
          )}
        </ModalBody>
        <ModalFooter className='modal-footer'>
          <Button className='modal-button' onClick={toggle}>
            {buttonTitle}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;
