import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';
import { Alert, Container } from 'reactstrap';
import './styles.scss';

export type AlertMessageSize = 'sm' | 'md' | 'lg';
export type AlertMessageType = 'success' | 'warning' | 'alert';

export interface AlertMessageProps {
  isOpen: boolean;
  type?: AlertMessageType;
  title?: string;
  message?: string | null;
  size?: AlertMessageSize;
  toggle?: () => void;
}

const AlertMessage: React.FunctionComponent<AlertMessageProps> = (
  props: AlertMessageProps
) => {
  const {
    isOpen = false,
    type,
    title = '',
    message,
    size = 'md',
    toggle
  } = props;

  function backgroundColor(): string | undefined {
    switch (type) {
      case 'success':
        return '#EAFFEE';
      case 'warning':
        return '#FEFFDF';
      case 'alert':
        return '#FFDFDF';
    }
  }
  function alertContainerSize(): string {
    switch (size) {
      case 'sm':
        return 'alert_sm';
      case 'lg':
        return 'alert_lg';
      default:
        return 'alert';
    }
  }
  function titleFontsize(): string {
    if (size === 'sm') {
      if (type !== 'success') {
        return 'title title_sm title_other';
      }
      return 'title title_sm';
    } else if (type !== 'success') {
      return 'title title_other';
    }
    return 'title';
  }
  function messageFontSize(): string {
    switch (size) {
      case 'sm':
        return 'message message_sm';
      default:
        return 'message';
    }
  }

  useEffect(() => {
    function keyPressHandler(event) {
      if (isOpen && event.key === 'Escape') {
        toggle!();
        return;
      }
    }
    document.addEventListener('keydown', keyPressHandler);
    return () => document.removeEventListener('keydown', keyPressHandler);
  }, [isOpen, toggle]);

  return (
    <Container id='alert-message'>
      <Alert
        isOpen={isOpen}
        toggle={toggle}
        style={{ background: backgroundColor() }}
        className={alertContainerSize()}
      >
        {type === 'alert' || type === 'warning' ? (
          <div>
            <IoIosWarning
              size={30}
              className='me-3'
              color={type === 'alert' ? '#EE404C' : '#FFD21E'}
            />
          </div>
        ) : type === 'success' ? (
          <div>
            <FaCheckCircle size={30} className='me-3' color='#32BA7C' />
          </div>
        ) : null}
        <div className='message-wrapper'>
          <p className={titleFontsize()}>{title}</p>
          {type !== 'success' && <p className={messageFontSize()}>{message}</p>}
        </div>
      </Alert>
    </Container>
  );
};

export default AlertMessage;
