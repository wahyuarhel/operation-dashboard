import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { Spinner } from 'reactstrap';

import {
  TransactionTransactionRemittanceAccountStatusChoices,
  TransactionTransactionRemittanceStatusChoices
} from 'graphql/generated/types';
import ImageUploader from '../ImageUploader';
import ModalPreviewImage from '../ModalPreviewImage';
import './styles.scss';
type ImageLoad = {
  src: string;
  placeholder: string;
  alt: string;
  onClick: any;
};
const ImageLoad = React.memo((props: ImageLoad) => {
  const { src, placeholder, alt, onClick } = props;
  const [loading, setLoading] = useState(true);
  const [currentSrc, updateSrc] = useState(placeholder);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setLoading(false);
      updateSrc(src);
    };
  }, [src]);

  return loading ? (
    <Spinner className='m-5' color='primary'>
      Loading Proof Of Remittance image...
    </Spinner>
  ) : (
    <img
      src={currentSrc}
      style={{
        opacity: loading ? 0.5 : 1,
        transition: 'opacity .15s linear',
        cursor: 'pointer'
      }}
      alt={alt}
      className='por-image'
      onClick={onClick}
    />
  );
});

interface PorImageCardProps {
  items;
  onSubmit?;
  selectedFile?;
  setSelectedFile?;
  data?;
}

const PorImageCard: React.FunctionComponent<PorImageCardProps> = (
  props: PorImageCardProps
) => {
  const { items, onSubmit, selectedFile, setSelectedFile, data } = props;
  const [isModalImgOpen, setIsModalImgOpen] = useState<boolean>(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [newImgIdx, setNewImgIdx] = useState(0);

  const onNextImage = () => {
    if (activeImageIdx < items!.length - 1) {
      setActiveImageIdx(activeImageIdx + 1);
      return;
    }
  };

  const onBackImage = () => {
    if (activeImageIdx > 0) {
      setActiveImageIdx(activeImageIdx - 1);
      return;
    }
  };

  function onNextModalImg() {
    if (newImgIdx < items!.length - 1) {
      setNewImgIdx(newImgIdx + 1);
      return;
    }
  }
  const onPreviousModalImg = () => {
    if (newImgIdx > 0) {
      setNewImgIdx(newImgIdx - 1);
      return;
    }
  };

  function handleModalImg() {
    setIsModalImgOpen(!isModalImgOpen);
    isModalImgOpen
      ? setActiveImageIdx(newImgIdx)
      : setNewImgIdx(activeImageIdx);
  }

  function openInNewTab(url: string): void {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }

  return (
    <>
      <ModalPreviewImage
        isOpen={isModalImgOpen}
        items={items!}
        activeIdx={newImgIdx}
        onClose={handleModalImg}
        onNext={onNextModalImg}
        onPrevious={onPreviousModalImg}
      />
      <div id='por-container' className='d-flex flex-column h-100'>
        <div>
          <h6 className='title'>Proof of Remittance</h6>
        </div>
        <div className='h-100 d-flex'>
          <div className='d-flex align-items-center justify-content-around w-100 preview-image-wrapper'>
            <div
              className='h-100 d-flex align-items-center p-2'
              onClick={() => onBackImage()}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <IoIosArrowDropleft
                size={35}
                color={
                  activeImageIdx < 1 || items.length === 0
                    ? '#D6D6D6'
                    : '#6B6B6C'
                }
              />
            </div>
            {items.length !== 0 ? (
              <ImageLoad
                src={items[activeImageIdx]}
                alt={items}
                placeholder=''
                onClick={() => openInNewTab(items[activeImageIdx])}
              />
            ) : (
              <p className='text-center px-4'>
                No Proof of Remittance Available
              </p>
            )}
            <div
              className='h-100 d-flex align-items-center p-2'
              style={{ cursor: 'pointer', userSelect: 'none' }}
              onClick={() => onNextImage()}
            >
              <IoIosArrowDropright
                size={35}
                color={
                  activeImageIdx === items.length - 1 || items.length === 0
                    ? '#D6D6D6'
                    : '#6B6B6C'
                }
              />
            </div>
          </div>
        </div>
        <div className='d-flex flex-column align-items-center'>
          <ImageUploader
            onSubmit={onSubmit}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </div>
        {data?.status ===
        TransactionTransactionRemittanceStatusChoices.Rejected ? (
          <p className='remittance-status'>
            REQUEST
            <br />
            REJECTED
          </p>
        ) : null}
      </div>
    </>
  );
};

export default PorImageCard;
