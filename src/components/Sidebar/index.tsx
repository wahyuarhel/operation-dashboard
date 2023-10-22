import React, { useState, useEffect } from 'react';
import {
  AiOutlineLineChart,
  AiOutlineTeam,
  AiOutlineLike,
  AiOutlineStar,
  AiOutlineLogout
} from 'react-icons/ai';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import PopupMessage from '../PopupMessage';
import { AiOutlineDollar } from 'react-icons/ai';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './styles.scss';
import askloraLogoUrl from '../../assets/asklora_logo.svg';
import { refreshTokenAction } from '../../redux/action/userAction';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';

type decodeToken = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
};

const Sidebar: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { profile, authorized } = useAppSelector(state => state.user);

  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowLogoutPopUp, setShouldShowLogoutPopUp] = useState(false);
  const [openUnauthorised, setOpenUnauthorised] = useState(false);
  const ledgers: { icon: any; name: string; path: string }[] = [
    {
      icon: <AiOutlineDollar size={20} />,
      name: 'Waiting Approval',
      path: '/'
    },
    {
      icon: <AiOutlineStar size={20} />,
      name: 'Deposits',
      path: '/deposits'
    },
    {
      icon: <AiOutlineStar size={20} />,
      name: 'Withdrawals',
      path: '/withdrawals'
    },
    {
      icon: <AiOutlineStar size={20} />,
      name: 'Transaction History',
      path: '/transaction-history'
    },
    {
      icon: <AiOutlineStar size={20} />,
      name: 'Transactions IBKR',
      path: '/transactions-ibkr'
    }
  ];

  const showLogoutPopUp = () => {
    setShouldShowLogoutPopUp(!shouldShowLogoutPopUp);
  };

  const tabMenus: { icon: any; name: string; path: string }[] = [
    {
      icon: <AiOutlineTeam size={20} />,
      name: 'User Management',
      path: '/user-management'
    },
    {
      icon: <AiOutlineLineChart size={20} />,
      name: 'Order Management',
      path: '/order-management'
    },
    {
      icon: <AiOutlineLike size={20} />,
      name: 'Customer Support Tickets',
      path: '/customer-support'
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const onLedgerClick = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const isUmsAdmin = localStorage.getItem('authorized');
    if (location.pathname === '/user-management') {
      if (isUmsAdmin === 'false') {
        setOpenUnauthorised(true);
      }
    }
  }, [location.pathname]);

  return (
    <>
      <PopupMessage
        isOpen={shouldShowLogoutPopUp}
        toggle={() => showLogoutPopUp()}
        title='Confirm Logout?'
        message='Are you sure you wish to logout?'
        onClick={handleLogout}
      />
      <PopupMessage
        isOpen={openUnauthorised}
        toggle={() => setOpenUnauthorised(!openUnauthorised)}
        title='Unauthorised User'
        message='You are not authorised to view this page. Please contact the system
      administrator'
        onClick={() => setOpenUnauthorised(!openUnauthorised)}
      />

      <div id='sidebar'>
        <div className='logo-wrapper'>
          <img
            src={askloraLogoUrl}
            alt='Asklora Logo'
            className='asklora-logo'
          />
        </div>
        <div className='sidebar-wrap'>
          <div className='menu-container'>
            <div className='top-ledger-menu-container'>
              <div
                className='ledger-menu-container'
                onClick={() => onLedgerClick()}
              >
                <AiOutlineDollar size={20} color='white' />
                <div className='payments-label'>
                  <div className='payments-label-container'>
                    <p className='font-mobile-menu color-white'>Payments</p>
                    {isExpanded ? (
                      <FiChevronUp color='white' className='icon-menu' />
                    ) : (
                      <FiChevronDown color='white' className='icon-menu' />
                    )}
                  </div>
                </div>
              </div>

              {isExpanded &&
                ledgers.map((tab, i) => {
                  return (
                    <NavLink
                      end
                      key={i}
                      to={tab.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'menu-sidebar sub-menu px-3 selected'
                          : 'menu-sidebar sub-menu px-3'
                      }
                    >
                      <p
                        className='font-mobile-menu color-light-text'
                        style={{ textAlign: 'center' }}
                      >
                        {tab.name}
                      </p>
                    </NavLink>
                  );
                })}
            </div>
            {tabMenus.map((tab, i) => {
              return (
                <NavLink
                  end
                  key={i}
                  to={tab.path}
                  className={({ isActive }) => {
                    let status = isActive;
                    if (
                      location.pathname.includes('/user-detail/') &&
                      tab.name === 'User Management'
                    ) {
                      status = true;
                    }
                    return status
                      ? 'menu-sidebar px-3 selected'
                      : 'menu-sidebar px-3';
                  }}
                >
                  {tab.icon}
                  <p
                    className='font-mobile-menu color-light-text'
                    style={{ textAlign: 'center' }}
                  >
                    {tab.name}
                  </p>
                </NavLink>
              );
            })}
          </div>
          <div
            className='menu-sidebar px-3'
            onClick={showLogoutPopUp}
            style={{ cursor: 'pointer' }}
          >
            <AiOutlineLogout size={20} color='white' />
            <p className='font-mobile-menu color-light-text'>Logout</p>
          </div>
        </div>
        <p style={{ color: 'white', textAlign: 'center', fontSize: '12px' }}>
          Version {process.env.REACT_APP_VERSION}
        </p>
        <p
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: '12px',
            marginBottom: '20px'
          }}
        >
          {process.env.REACT_APP_ENV}
        </p>
      </div>
    </>
  );
};

export default Sidebar;
