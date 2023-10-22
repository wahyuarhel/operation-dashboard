import React from 'react';
import { BsBell } from 'react-icons/bs/';
import { FaUserCircle } from 'react-icons/fa/';
import { UncontrolledTooltip } from 'reactstrap';
import { COLORS } from '../../constants';
import { useAppSelector } from '../../redux/store/hooks';
import './styles.scss';
import PushNotification from 'components/PushNotification';
import { useNotification } from 'hooks/useNotification';
interface HeaderProps {
  title?: string;
}

const ENV = process.env.REACT_APP_ENV;

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { profile } = useAppSelector(state => state.user);
  const { onOpenNotification, state } = useNotification();

  return (
    <div id='header'>
      <h2 style={{ flexGrow: 1, fontFamily: 'Ubuntu', fontWeight: 700 }}>
        {props.title}
      </h2>
      <div className='container-icon'>
        <FaUserCircle
          size={28}
          color={COLORS.brand2}
          id='user-avatar'
          style={{ cursor: 'pointer' }}
        />
        <UncontrolledTooltip placement='left' target='user-avatar'>
          {profile.username}
        </UncontrolledTooltip>
        <BsBell size={28} onClick={onOpenNotification} />
        {ENV === 'DEV' ? (
          <PushNotification
            toggle={onOpenNotification}
            isOpen={state.isOpen}
            isLoading={false}
            onSendMessage={() => console.log('Send message!')}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
