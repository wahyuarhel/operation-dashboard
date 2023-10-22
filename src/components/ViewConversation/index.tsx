import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs/';
import { IoClose } from 'react-icons/io5/';
import { Col, Modal, ModalBody, Row } from 'reactstrap';

import images from '../../constants/images';
import './styles.scss';

interface ViewConversationProps {
  active?: boolean;
  // onViewConversation?: any;
  toggle: () => void;
}

const ViewConversation: React.FunctionComponent<ViewConversationProps> = (
  props: ViewConversationProps
) => {
  const { active, toggle } = props;
  const [activeImageIdx, setActiveImage] = useState(0);
  const conversationImages = [
    // images.download,
    // images.checked,
    // images.alpaca,
    // images.por
  ];

  const onNextImage = () => {
    if (activeImageIdx < conversationImages.length - 1) {
      setActiveImage(activeImageIdx + 1);
    }

    // *for loop next image
    // else {
    //   setActiveImage(0)
    // }
  };

  const onBackImage = () => {
    if (activeImageIdx > 0) {
      setActiveImage(activeImageIdx - 1);
    }
    // *for loop back image
    // else {
    //   setActiveImage(conversationImages.length - 1);
    // }
  };

  // *function for next and previous image with press left and right arrow keyboard
  useEffect(() => {
    function keyPressHandler(e) {
      let key = e.key;
      if (key === 'ArrowLeft' && activeImageIdx > 0) {
        setActiveImage(activeImageIdx - 1);
      } else if (
        key === 'ArrowRight' &&
        activeImageIdx < conversationImages.length - 1
      ) {
        setActiveImage(activeImageIdx + 1);
      }
    }
    document.addEventListener('keydown', keyPressHandler);
    return () => document.removeEventListener('keydown', keyPressHandler);
  }, []);

  return (
    <Modal
      isOpen={active}
      toggle={toggle}
      centered
      size='xl'
      id='conversation-container'
      style={{ userSelect: 'none' }}
    >
      <ModalBody>
        <div className='h-100'>
          <Row className='h-100'>
            <Col
              xs={2}
              className='d-flex justify-content-end align-items-center'
            >
              <div
                className='p-3'
                onClick={() => onBackImage()}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <BsArrowLeftCircle
                  size={30}
                  color={
                    activeImageIdx < 1 || conversationImages.length === 0
                      ? '#B8B8B8'
                      : 'white'
                  }
                />
              </div>
            </Col>

            <Col xs={8} className='d-flex flex-column'>
              <div className='flex-grow-2 d-flex justify-content-end'>
                <div
                  className='p-2'
                  style={{ cursor: 'pointer' }}
                  onClick={toggle}
                >
                  <IoClose size={30} color='white' />
                </div>
              </div>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <div style={{ width: '250px' }}>
                  {conversationImages.length !== 0 ? (
                    <img
                      className='w-100'
                      src={conversationImages[activeImageIdx]}
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <p className='text-white'>
                      No Proof of Remittance Available
                    </p>
                  )}
                </div>
              </div>
            </Col>

            <Col xs={2} className='d-flex align-items-center'>
              <div
                className='p-2 '
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={onNextImage}
              >
                <BsArrowRightCircle
                  size={30}
                  color={
                    activeImageIdx === conversationImages.length - 1 ||
                    conversationImages.length === 0
                      ? '#B8B8B8'
                      : 'white'
                  }
                />
              </div>
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewConversation;
