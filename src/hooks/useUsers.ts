import { useContext } from 'react';
import { UseUsersHookType, UsersContext } from '../context/UsersProvider';

const useUsers = (): UseUsersHookType => {
  const {
    state: { searchKeyword, selectedStatus, users },
    searchUsers,
    sortUsers
  } = useContext(UsersContext);

  return {
    searchKeyword,
    selectedStatus,
    users,
    searchUsers,
    sortUsers
  };
};

export default useUsers;
