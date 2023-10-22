import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import './styles.scss';
export interface LoadingOverlayProps {
  active: boolean;
  placeholder?: string;
}

const LoadingOverlay: React.FunctionComponent<LoadingOverlayProps> = (
  props: LoadingOverlayProps
) => {
  const { active = false, placeholder = '' } = props;

  return (
    <div
      id='loading-overlay-container'
      className='loading-class-container'
      style={{
        display: active ? 'block' : 'none'
      }}
    >
      <div className='loading-wrapper'>
        <FadeLoader color={'#FFF'} margin={5} height={15} radius={5} />
        <p className='text-white'>{placeholder}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
