import React, { useEffect, useCallback } from 'react';

import Header from 'components/Header';
import UserTable from 'components/UserTable';
import { useGetAccountsQuery } from 'graphql/queries.generated';
import { useAppDispatch, useAppSelector } from 'redux/store/hooks';
import { setAccounts } from 'redux/slice/userSlice';
import { AccountType } from 'graphql/generated/types';

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error, refetch } = useGetAccountsQuery();
  const { successMessage } = useAppSelector(state => state.user);

  useEffect(() => {
    if (data?.accounts) {
      dispatch(setAccounts(data?.accounts as AccountType[]));
    }
  }, [data?.accounts]);

  useEffect(() => {
    if (
      successMessage.source === 'suspendAccountAction/fulfilled' ||
      successMessage.source === 'reactivateAccountAction/fulfilled' ||
      successMessage.source === 'upgradeAccountAction/fulfilled'
    ) {
      refetch();
    }
  }, [successMessage]);

  return (
    <>
      <Header />
      <UserTable loading={loading} />
    </>
  );
};

export default UserManagement;
