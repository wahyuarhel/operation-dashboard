import React, { useState, ReactNode } from 'react';
import { IoMdInformationCircle } from 'react-icons/io';
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import './styles.scss';

export type PopupMessageType =
  | 'success'
  | 'warning'
  | 'text-box'
  | 'export'
  | 'scrollable-message'
  | 'other';
export interface PopupMessageProp {
  isOpen: boolean;
  type?: PopupMessageType;
  title: string;
  message: string;
  toggle?: () => void;
  onClick?: () => void;
  onBack?: () => void;
  buttonTitle?: string | null;
  children?: ReactNode;
  disabled?: boolean;
}

const PopupMessage: React.FunctionComponent<PopupMessageProp> = (
  props: PopupMessageProp
) => {
  const {
    type,
    title,
    message,
    isOpen = false,
    toggle,
    onClick,
    buttonTitle,
    onBack,
    children,
    disabled = false
  } = props;

  function iconColor(): string {
    switch (type) {
      case 'warning':
      case 'text-box':
        return '#EF846D';
      case 'success':
        return '#87E180';
      case 'other':
        return '#C4C4C4';
      default:
        return '#B8A6FF';
    }
  }
  function buttonColor(): string {
    switch (type) {
      case 'warning':
      case 'text-box':
        return '#920202';
      case 'success':
        return '#008753';
      case 'other':
        return '#737373';
      default:
        return '#0156D6';
    }
  }
  function bodyMessageStyle(): string {
    switch (type) {
      case 'export':
      case 'text-box':
        return 'modal-body_text-box';
      case 'scrollable-message':
        return 'modal-body_scrollable-message';
      default:
        return 'modal-body';
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      scrollable
      centered
      backdrop={false}
      toggle={toggle}
      id='message-container'
    >
      <ModalHeader
        style={type !== 'scrollable-message' ? { border: 0 } : {}}
        toggle={type === 'scrollable-message' ? undefined : toggle}
      >
        {type !== 'scrollable-message' && (
          <IoMdInformationCircle
            size={50}
            className='icon'
            color={iconColor()}
          />
        )}
        {title}
      </ModalHeader>
      <ModalBody className={bodyMessageStyle()}>
        {message}
        {children}
        {type === 'text-box' && <Input type='textarea' />}
        {type === 'export' && (
          <Form>
            <Label for='from-date' className='col-form-label'>
              From :
            </Label>
            <Input type='text' id='from-date' />
            <Label className='col-form-label' for='to-date'>
              To :
            </Label>
            <Input type='text' id='to-date' />
          </Form>
        )}
      </ModalBody>
      <ModalFooter
        className='justify-content-end'
        style={type !== 'scrollable-message' ? { border: 0 } : {}}
      >
        {type === 'scrollable-message' && <Button color='white'>Cancel</Button>}
        {title != 'Select Return Method' ? (
          <Button
            style={{ backgroundColor: buttonColor() }}
            onClick={buttonTitle === 'Back' ? onBack : onClick}
            disabled={disabled}
          >
            {buttonTitle
              ? buttonTitle
              : type === 'scrollable-message'
              ? 'Close'
              : 'Continue'}
          </Button>
        ) : null}
      </ModalFooter>
    </Modal>
  );
};

export default PopupMessage;
