import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Container
} from 'reactstrap';
import { GrClose } from 'react-icons/gr/';
import { images } from '../../constants/';
import './styles.scss';

interface MessageCardProp {
  type: string;
  title: string;
  message: string;
  isOpen: boolean;
}

const MessageCard: React.FunctionComponent<MessageCardProp> = (
  props: MessageCardProp
) => {
  const { type, title, message, isOpen } = props;
  return (
    <Container id='message-container'>
      <Modal isOpen={isOpen} centered backdrop={false} size='md'>
        <Card
          style={{
            backgroundColor: type == 'success' ? '#EAFFEE' : ''
          }}
        >
          <ModalHeader>
            {type == 'error' && (
              <div className='header-container'>
                <img src={images.match_failed} className='failed-icon' />
                <CardTitle tag='h5'>{title}</CardTitle>
              </div>
            )}
            <GrClose className='closed-icon' style={{ position: 'absolute' }} />
          </ModalHeader>
          <CardBody className='card-body'>
            {type == 'success' && (
              <img src={images.checked} className='failed-icon' />
            )}

            <div>
              <CardText tag='h6' className='message-text'>
                {message}
              </CardText>
            </div>
          </CardBody>
          {type == 'error' && (
            <ModalFooter className='justify-content-end'>
              <Button style={{ backgroundColor: '#920202' }}>Confirm</Button>
            </ModalFooter>
          )}
        </Card>
      </Modal>
    </Container>
  );
};

export default MessageCard;
