import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import './styles.scss';
import { saveAs } from 'file-saver';
import images from 'constants/images';
import Icon from 'components/Icons';
import { useAppSelector } from 'redux/store/hooks';

export type ModalPreviewSizeType = 'md' | 'lg' | 'xl';
interface ModalPreviewImgProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  activeIdx: number;
  onNext?: () => void;
  onPrevious?: () => void;
  size?: ModalPreviewSizeType;
  isDownloadable?: boolean;
}

const ModalPreviewImage: React.FunctionComponent<ModalPreviewImgProps> = (
  props: ModalPreviewImgProps
) => {
  const {
    isOpen,
    onClose,
    items,
    activeIdx,
    onNext,
    onPrevious,
    size = 'lg',
    isDownloadable = false
  } = props;

  const { account } = useAppSelector(state => state.user);

  useEffect(() => {
    function keyPressHandler(event) {
      if (isOpen && event.key === 'ArrowRight') {
        onNext !== undefined && onNext();
        return;
      }
      if (isOpen && event.key === 'ArrowLeft') {
        onPrevious !== undefined && onPrevious();
        return;
      }
    }
    document.addEventListener('keydown', keyPressHandler);
    return () => document.removeEventListener('keydown', keyPressHandler);
  }, [onNext, onPrevious]);

  const closeButton = (
    <div
      className='p-2 icon'
      style={{ cursor: 'pointer' }}
      onClick={closeModal}
    >
      <AiOutlineCloseCircle size={35} color='white' />
    </div>
  );

  function closeModal() {
    onClose();
  }
  function onDownloadFile() {
    saveAs(
      items[activeIdx],
      account.account?.id ? `photo_user:${account.account?.id}` : 'document'
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      centered
      size={size}
      id='image-preview-modal'
      toggle={closeModal}
    >
      <ModalHeader toggle={closeModal} close={closeButton} />
      <ModalBody>
        <Container>
          <Row className='h-100 justify-content-center'>
            <Col
              xs={2}
              lg={1}
              className=' d-flex justify-content-end align-items-center'
            >
              {onPrevious !== undefined ? (
                <div className='p-2 icon' onClick={onPrevious}>
                  <IoIosArrowDropleft
                    size={35}
                    color={
                      activeIdx < 1 || (items && items.length === 0)
                        ? '#B8B8B8'
                        : 'white'
                    }
                  />
                </div>
              ) : null}
            </Col>
            <Col xs='8' lg={10} className=''>
              {items.length !== 0 ? (
                <div className='d-flex flex-column align-items-center'>
                  <div
                    className={`image-wrapper d-flex flex-column justify-content-center align-items-center `}
                  >
                    <img
                      src={items[activeIdx]}
                      alt={`${activeIdx}-img`}
                      className='por-image'
                    />
                    {isDownloadable ? (
                      <div
                        className='d-flex  flex-column align-items-center mt-3 gap-2 download-button'
                        onClick={onDownloadFile}
                      >
                        <Icon src={images.download} size={30} />
                        <p aria-disabled='true'>Download</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div
                  className='d-flex align-items-center justify-content-center'
                  style={{ height: '500px' }}
                >
                  <p className='text-white'>No Proof of Remittance Available</p>
                </div>
              )}
            </Col>
            <Col xs={2} lg={1} className=' d-flex align-items-center'>
              {onNext !== undefined ? (
                <div className='p-2 icon' onClick={onNext}>
                  <IoIosArrowDropright
                    size={35}
                    color={
                      activeIdx === items.length - 1 || items.length === 0
                        ? '#B8B8B8'
                        : 'white'
                    }
                  />
                </div>
              ) : null}
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default ModalPreviewImage;
