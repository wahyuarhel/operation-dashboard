import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Progress,
  UncontrolledTooltip
} from 'reactstrap';
import { images } from '../../constants';
import { useAppSelector } from '../../redux/store/hooks';
import './styles.scss';

interface ImageUploaderProps {
  onSubmit?;
  selectedFile?;
  setSelectedFile?;
}

const ImageUploader: React.FunctionComponent<ImageUploaderProps> = (
  props: ImageUploaderProps
) => {
  const { onSubmit, selectedFile, setSelectedFile } = props;

  const fileRef = useRef<any>(null);

  const [previewImage, setPreviewImage] = useState<any>();
  const [isModalImgOpen, setIsModalImgOpen] = useState<boolean>(false);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event?.target?.files?.[0]);
  };

  const onClear = () => {
    setSelectedFile(undefined);
  };

  const onUpdate = () => {
    fileRef.current?.click();
  };

  function handleModalImg() {
    setIsModalImgOpen(!isModalImgOpen);
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreviewImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const fontStyle = {
    fontFamily: 'Ubuntu',
    fontSize: '14px'
  };

  function ModalPreviewImage(): JSX.Element {
    return (
      <Modal
        isOpen={isModalImgOpen}
        toggle={handleModalImg}
        centered
        size='lg'
        contentClassName='modal-on-image-preview'
      >
        <ModalHeader
          toggle={handleModalImg}
          className='modal-header-image-preview'
          close={
            <AiOutlineCloseCircle
              size={30}
              color='white'
              onClick={handleModalImg}
              style={{ cursor: 'pointer' }}
            />
          }
        />
        <ModalBody className='d-flex justify-content-center'>
          <div className='img-view-wrapper'>
            <img
              className='rounded'
              src={previewImage}
              alt={`${selectedFile?.name}`}
              width={'100%'}
              height={'100%'}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </ModalBody>
      </Modal>
    );
  }
  return (
    <div id='image-uploader-container'>
      {/* //* preview image on modal popup */}
      <ModalPreviewImage />
      <div className={'d-flex flex-column align-items-center'}>
        <input
          type='file'
          ref={fileRef}
          multiple={true}
          hidden
          accept='.png,.jpg,.jpeg'
          onChange={onChangeFile}
        />

        {/* //* Preview name selected file  */}
        <div className='pb-2'>
          {selectedFile?.name ? (
            <div className='d-flex gap-2 align-items-center selected-file-wrapper'>
              <div>
                <p
                  className='edit-text'
                  id='selected-file-text'
                  onClick={handleModalImg}
                >
                  {selectedFile?.name}
                </p>
                <UncontrolledTooltip
                  placement='top'
                  target='selected-file-text'
                >
                  click to preview
                </UncontrolledTooltip>
              </div>
              <AiOutlineCloseCircle size={20} onClick={onClear} />
            </div>
          ) : null}
        </div>
        {selectedFile?.name ? (
          <label htmlFor='image-uploader' style={fontStyle}>
            <Button
              className='d-flex flex-column align-items-center upload-button'
              color='white'
              onClick={onSubmit}
              style={fontStyle}
            >
              <div style={{ width: '30px' }}>
                <img src={images.upload} alt='upload-image' width={'100%'} />
              </div>
              Upload Image
            </Button>
          </label>
        ) : (
          <label htmlFor='image-uploader' style={fontStyle}>
            <Button
              className='d-flex flex-column align-items-center'
              color='white'
              onClick={onUpdate}
              style={fontStyle}
            >
              <div style={{ width: '30px' }}>
                <img src={images.upload} alt='upload-image' width={'100%'} />
              </div>
              Upload Image
            </Button>
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
