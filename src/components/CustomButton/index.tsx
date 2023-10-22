import React from 'react';
import {
  AiOutlineCloseCircle,
  AiOutlinePauseCircle,
  AiOutlinePlayCircle
} from 'react-icons/ai';
import { BiChevronUpCircle } from 'react-icons/bi/';
import { BsFillCircleFill } from 'react-icons/bs/';
import {
  IoCheckmarkCircleOutline,
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
  IoCloseOutline
} from 'react-icons/io5/';
import { Button, Spinner } from 'reactstrap';
import { actionButton } from 'types/transaction_types';
import './styles.scss';

interface CustomButtonProps {
  title: string;
  titleStyle?: string;
  onPressButton: Function;
  disabled?: boolean;
  isLoading?: boolean;
}

const CustomButton: React.FunctionComponent<CustomButtonProps> = (
  props: CustomButtonProps
) => {
  const { title, titleStyle, onPressButton, disabled, isLoading } = props;
  const generatedColor = title.toLowerCase().includes('return')
    ? '#000'
    : title.toLowerCase().includes('yellow')
      ? '#F29100'
      : title.toLowerCase().includes('red')
        ? '#C33335'
        : '#800080';
  const handleClickButton = e => {
    e.preventDefault();
    onPressButton();
  };
  return (
    <div id='custom-btn-container'>
      <Button
        disabled={disabled ? disabled : false}
        className='d-flex align-items-center'
        onClick={e => handleClickButton(e)}
      >
        <div className='me-0 d-flex align-items-center'>
          {(title === actionButton.restart ||
            title === actionButton.processWithdrawal) && (
              <AiOutlinePlayCircle size={20} color='#6B6B6B' />
            )}
          {title === 'Pause Automation' && (
            <AiOutlinePauseCircle size={20} color='#6B6B6B' />
          )}
          {title.toLowerCase().includes('on hold') && (
            <IoChevronDownCircleOutline size={20} color='#6B6B6B' />
          )}
          {(title.toLowerCase().includes('waiting approval') ||
            title.toLowerCase().includes('force match') ||
            title.toLowerCase().includes('move to queue')) && (
              <IoChevronUpCircleOutline size={20} color='#6B6B6B' />
            )}
          {title.includes('top') && (
            <BiChevronUpCircle size={20} color='#6B6B6B' />
          )}
          {title === 'Approve' && (
            <IoCheckmarkCircleOutline size={20} color='#6B6B6B' />
          )}
          {title.includes('Code') && (
            <BsFillCircleFill size={20} color={generatedColor} />
          )}
          {title.toLowerCase().includes('return') && (
            <BsFillCircleFill size={20} color={'black'} />
          )}
          {title.toLowerCase().includes('delete') && (
            <AiOutlineCloseCircle size={20} color='#6B6B6B' />
          )}
          {title.toLowerCase().includes('reject') && (
            <IoCloseOutline size={20} color='#6B6B75' />
          )}
        </div>
        <div style={{ textAlign: 'left' }}>
          <p className={`button-text ${titleStyle}`}>{title}</p>
        </div>
        {isLoading ? (
          <Spinner size='sm' style={{ marginLeft: 10 }} color='primary'>
            {title}
          </Spinner>
        ) : null}
      </Button>
    </div>
  );
};

export default CustomButton;
