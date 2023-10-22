import { useContext } from 'react';
import { EditUserContext, UseEditUserType } from '../context/EditUserProvider';

const useEditUser = (): UseEditUserType => {
  const {
    state: {
      notes,
      user,
      accountInformationList,
      totalCheckedAccountInformation,
      userEmploymentInformation,
      userPersonalInformation
    },
    handleInputNotes,
    handleEditUser,
    handleCheckAccountInformation,
    handleResetAccountInformation,
    updateUserEmploymentInformation,
    updateUserPersonalInformation,
    resetUserPersonalInformation,
    resetUserEmploymentInformation
  } = useContext(EditUserContext);
  return {
    notes,
    user,
    accountInformationList,
    totalCheckedAccountInformation,
    userEmploymentInformation,
    userPersonalInformation,
    handleInputNotes,
    handleEditUser,
    handleCheckAccountInformation,
    handleResetAccountInformation,
    updateUserEmploymentInformation,
    updateUserPersonalInformation,
    resetUserPersonalInformation,
    resetUserEmploymentInformation
  };
};

export default useEditUser;
