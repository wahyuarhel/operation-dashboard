import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Auth from './routes';
import Login from './pages/Login/';
import UserManagement from './pages/UserManagement';
import UserDetail from './pages/UserDetail';
import TradeManagement from './pages/TradeManagement';
import CustomerSupportTicket from './pages/CustomerSupportTicket';

//New Dashboard
import WaitingApproval from './pages/WaitingApproval';
import Deposits from './pages/Deposits';
import Withdrawals from './pages/Withdrawals';
import TransactionHistory from './pages/TransactionHistory';
import TransactionsIbkr from './pages/TransactionsIbkr';
import { EditUserProvider } from './context/EditUserProvider';
import { UsersProvider } from './context/UsersProvider';

function App() {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Auth.AuthOutlet />}>
            <Route path='' element={<WaitingApproval />} />
            <Route path='/deposits' element={<Deposits />} />
            <Route path='/withdrawals' element={<Withdrawals />} />
            <Route
              path='/transaction-history'
              element={<TransactionHistory />}
            />
            <Route path='/transactions-ibkr' element={<TransactionsIbkr />} />

            <Route
              path='/user-management'
              element={
                <Auth.AuthorizedRoute>
                  <UsersProvider>
                    <UserManagement />
                  </UsersProvider>
                </Auth.AuthorizedRoute>
              }
            />
            <Route
              path='/user-detail/:userId'
              element={
                <EditUserProvider>
                  <UserDetail />
                </EditUserProvider>
              }
            />

            <Route path='/order-management' element={<TradeManagement />} />
            <Route
              path='/customer-support'
              element={<CustomerSupportTicket />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
