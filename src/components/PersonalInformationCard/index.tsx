import React, { FC, useState, useRef, useEffect } from 'react';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { Button, Col, FormGroup, Input, Row, Spinner } from 'reactstrap';
import dayjs from 'dayjs';
import LoadingOverlay, { LoadingOverlayProps } from 'components/LoadingOverlay';
import _ from 'lodash';

import Icon from 'components/Icons';
import ModalPreviewImage from 'components/ModalPreviewImage';
import PopupMessage, { PopupMessageProp } from 'components/PopupMessage';
import icons from 'constants/icons';
import useEditUser from '../../hooks/useEditUser';
import {
  postCommentAction,
  getOnfidoIdentityCardByHKID,
  reUploadProofOfAddressAction,
  mergeCommentAction
} from 'redux/action/userAction';
import { useAppDispatch, useAppSelector } from 'redux/store/hooks';
import styles from './styles.module.scss';
import { District, Region } from 'types/user_types';
import { convertToBase64 } from '../../utils/convertImgBase64';
import { AccountAccountCommentNoteTypeChoices } from 'graphql/generated/types';
import {
  generateCountryCodes,
  generateNationalityValue,
  generateSelectedCountry
} from 'constants/';
import {
  useInputText,
  INPUT_REDUCER_ACTION_TYPE
} from '../../hooks/useInputText';

interface PersonalInformationCardProps {
  data;
}

const PersonalInformationCard: FC<PersonalInformationCardProps> = (
  props: PersonalInformationCardProps
) => {
  const dispatch = useAppDispatch();
  const { data } = props;
  const {
    loading,
    accountComment,
    account,
    accountData,
    countries,
    profile,
    identities
  } = useAppSelector(state => state.user);
  const {
    personalInfo,
    residenceInfo,
    proofOfAddressFile,
    loraAccount,
    bankAccount
  } = account;

  const {
    notes,
    handleInputNotes,
    userPersonalInformation,
    updateUserPersonalInformation,
    resetUserPersonalInformation
  } = useEditUser();

  const [isEditNote, setIsEditNote] = useState<boolean>(false);
  const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [isPreviewImageOpen, setIsPreviewImageOpen] = useState<boolean>(false);
  const [documentFile, setDocumentFile] = useState<string[]>([]);
  const [activeDocumentIndex, setActiveDocumentIndex] = useState<number>(0);
  const addressProofFile = useRef<any>();

  const phoneNumber = useInputText();
  const firstName = useInputText();
  const lastName = useInputText();

  useEffect(() => {
    if (isEditUser) {
      phoneNumber.dispatch({
        type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
        payload: `+${personalInfo?.phoneCountryCode ?? ''}${
          personalInfo?.phoneNumber ?? ''
        }`
      });
      firstName.dispatch({
        type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
        payload: personalInfo?.firstName ?? ''
      });

      lastName.dispatch({
        type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
        payload: personalInfo?.lastName ?? ''
      });
    }
  }, [isEditUser]);

  const generateNote = () =>
    accountComment.length > 0
      ? accountComment
          .filter(
            el => el.noteType != AccountAccountCommentNoteTypeChoices.InitData
          )
          .map(
            c =>
              `${c.noteType} : [${c.noteStatus}]\n${
                c.extraField
                  ? generateExtraField(JSON.parse(c.extraField))
                  : c.comment
              }`
          )
          .toString()
          .replaceAll(',', '\n')
      : '';

  const generateExtraFieldProperty = (oldProperty, extraField) => {
    let extraFieldLetter = '';
    for (const el in extraField) {
      let oldValue = oldProperty ? oldProperty[_.camelCase(el)] : 'Empty';
      let newValue = extraField ? extraField[el] : 'Empty';

      if (el == 'phone_number') {
        oldValue = oldValue != 'Empty' ? `+852${oldValue}` : oldValue;
        newValue = newValue != 'Empty' ? `+852${newValue}` : newValue;
      }

      extraFieldLetter += `     ${_.startCase(el.replaceAll('_', ' '))}: ${
        el === 'nationality' ? generateNationalityValue(oldValue) : oldValue
      } -> ${
        el === 'nationality' ? generateNationalityValue(newValue) : newValue
      }\n`;
    }
    return extraFieldLetter;
  };

  const generateExtraField = fields => {
    let letter = '';
    for (const el in fields) {
      letter += `${_.startCase(
        el.replaceAll('_', ' ')
      )}:\n${generateExtraFieldProperty(
        el === 'personal_info'
          ? personalInfo
          : el === 'residence_info'
          ? residenceInfo
          : loraAccount,
        fields[el]
      )}`;
    }
    return letter;
  };

  const [loadingOverlay, setLoadingOverlay] = useState<LoadingOverlayProps>({
    active: false,
    placeholder: ''
  });

  const [popupMessage, setPopupMessage] = useState<PopupMessageProp>({
    isOpen: false,
    title: '',
    message: ''
  });

  const isAddressProofViewable = (): boolean => {
    if (
      proofOfAddressFile &&
      proofOfAddressFile.length > 0 &&
      proofOfAddressFile[0]!.proofFile
    ) {
      return true;
    }
    return false;
  };

  const details = [
    {
      icon: <Icon src={icons.legal_name} size={20} />,
      label: 'First Name',
      value: personalInfo?.firstName,
      key: 'first_name',
      editable: true,
      field: 'personal_info'
    },
    {
      icon: <Icon src={icons.legal_name} size={20} />,
      label: 'Last Name',
      value: personalInfo?.lastName,
      key: 'last_name',
      editable: true,
      field: 'personal_info'
    },
    {
      icon: <Icon src={icons.email} size={20} />,
      label: 'Email',
      value: data?.email,
      key: 'email',
      editable: false,
      field: 'personal_info'
    },
    {
      icon: <Icon src={icons.phone} size={20} />,
      label: 'Phone',
      value: `${personalInfo?.phoneCountryCode ? '+' : ''}${
        personalInfo?.phoneCountryCode ?? ''
      }${personalInfo?.phoneNumber ?? ''}`,
      key: 'phone_number',
      editable: true,
      field: 'personal_info'
    },
    {
      icon: <BsGenderAmbiguous size={20} color='#838383' />,
      label: 'Gender',
      value: personalInfo?.gender,
      inputType: 'select',
      options: ['Male', 'Female'],
      key: 'gender',
      editable: true,
      field: 'personal_info'
    },
    {
      icon: <Icon src={icons.dob} size={20} />,
      label: 'Date of Birth',
      value: personalInfo?.dateOfBirth
        ? dayjs(personalInfo?.dateOfBirth).format('DD/MM/YYYY')
        : null,
      editable: false
    },
    {
      icon: <Icon src={icons.us_resident} size={20} />,
      label: 'US Resident',
      value: loraAccount?.usResident ? 'Yes' : 'No',
      key: 'us_resident',
      inputType: 'select',
      options: ['Yes', 'No'],
      editable: true,
      field: 'lora_account'
    },
    {
      icon: <Icon src={icons.hk_resident} size={20} />,
      label: 'HK Resident',
      value: loraAccount?.hkResident ? 'Yes' : 'No',
      key: 'hk_resident',
      inputType: 'select',
      options: ['Yes', 'No'],
      editable: true,
      field: 'lora_account'
    },
    {
      icon: <Icon src={icons.address} size={20} />,
      label: 'Address',
      value: {
        address1: residenceInfo?.addressLine1 ?? '',
        address2: residenceInfo?.addressLine2 ?? '',
        region: residenceInfo?.region ?? '',
        district: residenceInfo?.district ?? ''
      },
      key: 'address',
      editable: true,
      field: 'residence_info'
    },
    {
      label: 'Region',
      value: residenceInfo?.region,
      key: 'region',
      inputType: 'select',
      options: Object.values(Region),
      editable: true,
      field: 'residence_info'
    },
    {
      label: 'District',
      value: residenceInfo?.district,
      key: 'district',
      inputType: 'select',
      options: Object.values(District),
      editable: true,
      field: 'residence_info'
    },
    {
      icon: <Icon src={icons.address_proof} size={20} />,
      label: 'Address Proof',
      value: isAddressProofViewable()
        ? `proof_of_address_user${account?.account?.id}.png`
        : '',
      key: 'addressProof',
      editable: false,
      field: 'residence_info'
    },
    {
      icon: <Icon src={icons.id_number} size={20} />,
      label: 'ID Number',
      value: personalInfo?.hkidNumber,
      key: 'idNumber',
      field: 'personal_info'
    },
    {
      icon: <Icon src={icons.nationality} size={20} />,
      label: 'Nationality',
      value: personalInfo?.nationality
        ? generateNationalityValue(personalInfo?.nationality)
        : '',
      key: 'nationality',
      inputType: 'select',
      options: countries,
      editable: true,
      field: 'personal_info'
    },
    {
      icon: <Icon src={icons.bank_detail} size={20} />,
      label: 'Bank Detail',
      value: {
        bank_code: `${bankAccount?.bankCode ?? ''} ${bankAccount?.name ?? ''}`,
        bank_number: bankAccount?.accountNumber
      },
      editable: false,
      field: 'lora_account'
    }
  ];

  const closeModal = () => setPopupMessage({ ...popupMessage, isOpen: false });
  const onBackModal = () => setPopupMessage({ ...popupMessage, isOpen: false });
  const closeLoadingOverlay = () =>
    setLoadingOverlay({ ...loadingOverlay, active: false });

  function openConfirmPopupMessage(
    title: string,
    message: string,
    buttonTitle?: string
  ) {
    setPopupMessage({
      isOpen: true,
      title: title,
      message: message,
      buttonTitle: buttonTitle ?? 'Save'
    });
  }

  function openWarningPopupMessage(title: string, message: string) {
    setPopupMessage({
      isOpen: true,
      type: 'warning',
      title: title,
      message: message,
      buttonTitle: 'Cancel'
    });
  }

  function openSuccessPopupMessage(title: string, message: string) {
    setPopupMessage({
      isOpen: true,
      title: title,
      message: message,
      type: 'success'
    });
  }

  function onCancelEditUser() {
    openWarningPopupMessage(
      'Cancel Changes',
      'Are you sure you wish to discard all changes? Your info will not be saved'
    );
  }
  function onConfirmUpdateUser() {
    openConfirmPopupMessage(
      'Confirm Changes',
      'Are you sure you wish to save all changes?'
    );
  }

  function onConfirmUserDataChanges() {
    const admin1 = accountComment[0].user?.username;
    if (profile.username != admin1) {
      openConfirmPopupMessage(
        'Confirm Changes',
        'Are you sure you wish to approve all new changes?'
      );
    } else {
      setPopupMessage({
        isOpen: true,
        type: 'warning',
        title: 'Not Authorised To Change',
        message:
          'You are not authorised to edit the user’s personal information',
        buttonTitle: 'Back'
      });
    }
  }

  function onCancelDataChanges() {
    const admin1 = accountComment[0].user?.username;
    if (profile.username != admin1) {
      openConfirmPopupMessage(
        'Confirm Changes',
        'Are you sure you wish to cancel the changes?',
        'Confirm'
      );
    } else {
      setPopupMessage({
        isOpen: true,
        type: 'warning',
        title: 'Not Authorised To Change',
        message:
          'You are not authorised to edit the user’s personal information',
        buttonTitle: 'Back'
      });
    }
  }

  async function onUpdatePersonalInformation() {
    let personalInfoParams = _.omit(userPersonalInformation, [
      'us_resident',
      'hk_resident',
      'address_line_1',
      'address_line_2',
      'district',
      'region',
      'city',
      'country'
    ]);
    if (userPersonalInformation.nationality) {
      personalInfoParams.nationality = generateSelectedCountry(
        userPersonalInformation.nationality!
      );
    }
    if (firstName.value != personalInfo?.firstName) {
      personalInfoParams.first_name = firstName.value;
    }
    if (lastName.value != personalInfo?.lastName) {
      personalInfoParams.last_name = lastName.value;
    }
    if (phoneNumber.value.slice(4) != personalInfo?.phoneNumber) {
      personalInfoParams.phone_number = phoneNumber.value.slice(4);
    }

    let residenceInfoParams = _.pick(userPersonalInformation, [
      'address_line_1',
      'address_line_2',
      'district',
      'region',
      'city',
      'country'
    ]);

    let loraAccountParams = _.pick(userPersonalInformation, [
      'us_resident',
      'hk_resident'
    ]);

    const commentParam = {
      user: profile?.id,
      account_id: Number(data?.id),
      comment: AccountAccountCommentNoteTypeChoices.RequestChange,
      note_type: AccountAccountCommentNoteTypeChoices.RequestChange,
      extra_field: {
        personal_info: personalInfoParams,
        lora_account: loraAccountParams,
        residence_info: residenceInfoParams
      }
    };

    const response = await dispatch(postCommentAction(commentParam));
    return response;
  }

  enum confirmChange {
    approve = 'APPROVE',
    cancel = 'CANCEL'
  }

  const onConfirmChangesPersonalInformation = async (type: string) => {
    const mergeCommentParams = {
      account_id: account?.account?.id!,
      note_id: Number(accountComment[0].id),
      is_approved: type === confirmChange.approve ? true : false
    };
    const response = await dispatch(mergeCommentAction(mergeCommentParams));
    return response;
  };

  async function onClickButtonInPopupMessage() {
    setPopupMessage({ ...popupMessage, isOpen: false });
    if (popupMessage.title === 'Cancel Changes') {
      setIsEditUser(false);
    }
    if (popupMessage.message === 'Are you sure you wish to save all changes?') {
      setIsEditUser(false);
      setLoadingOverlay({
        active: true,
        placeholder: "Updating User's Information..."
      });
      const response = await onUpdatePersonalInformation();
      if (response.type === 'postCommentAction/fulfilled') {
        resetUserPersonalInformation();
        setTimeout(() => {
          closeLoadingOverlay();
          setPopupMessage({
            isOpen: true,
            title: 'Changes Saved',
            message:
              'Your changes have been saved. Another Admin will need to approve the changes before it goes live ',
            type: 'success',
            buttonTitle: 'Continue'
          });
        }, 1000);
      } else if (response.type == 'postCommentAction/rejected') {
        setTimeout(() => {
          setIsEditUser(false);
          closeLoadingOverlay();
          setPopupMessage({
            isOpen: true,
            type: 'warning',
            title: 'Request update User failed!',
            message: response.payload,
            buttonTitle: 'Cancel'
          });
        }, 1000);
      }
    }
    if (
      popupMessage.message === 'Are you sure you wish to cancel the changes?'
    ) {
      setLoadingOverlay({
        active: true,
        placeholder: "Updating User's Information..."
      });

      const response = await onConfirmChangesPersonalInformation(
        confirmChange.cancel
      );

      if (response.type === 'mergeCommentAction/fulfilled') {
        setTimeout(() => {
          closeLoadingOverlay();
          setPopupMessage({
            isOpen: true,
            title: 'Cancel Success',
            message: 'The user’s details can be cancelled',
            type: 'success',
            buttonTitle: 'Continue'
          });
        }, 1000);
      } else if (response.type == 'mergeCommentAction/rejected') {
        setTimeout(() => {
          setIsEditUser(false);
          closeLoadingOverlay();
          setPopupMessage({
            isOpen: true,
            type: 'warning',
            title: 'Cancel Changes failed!',
            message: response.payload,
            buttonTitle: 'Cancel'
          });
        }, 1000);
      }
    }
    if (
      popupMessage.message ===
      'Are you sure you wish to approve all new changes?'
    ) {
      setLoadingOverlay({
        active: true,
        placeholder: "Updating User's Information..."
      });

      const response = await onConfirmChangesPersonalInformation(
        confirmChange.approve
      );

      if (response.type === 'mergeCommentAction/fulfilled') {
        setTimeout(() => {
          closeLoadingOverlay();
          setPopupMessage({
            isOpen: true,
            title: 'Changes Saved',
            message: 'The user’s details have been updated',
            type: 'success',
            buttonTitle: 'Continue'
          });
        }, 1000);
      } else if (response.type == 'mergeCommentAction/rejected') {
        setTimeout(() => {
          closeLoadingOverlay();
          setPopupMessage({
            isOpen: true,
            type: 'warning',
            title: 'Update User Failed!',
            message: response.payload,
            buttonTitle: 'Cancel'
          });
        }, 1000);
      }
    }
  }

  function handleEditNote() {
    setIsEditNote(!isEditNote);
  }
  async function onSubmitNote() {
    const commentParam = {
      user: profile?.id,
      account_id: Number(data?.id),
      comment: notes,
      note_type: AccountAccountCommentNoteTypeChoices.Comment
    };
    const response = await dispatch(postCommentAction(commentParam));
    setIsEditNote(!isEditNote);
  }

  async function onClickViewButton(key: string) {
    if (key === 'addressProof') {
      if (!_.isEmpty(proofOfAddressFile)) {
        const documents = proofOfAddressFile
          ?.filter(file => file!.proofFile != null)
          .map(doc => doc!.proofFile);

        setIsPreviewImageOpen(!isPreviewImageOpen);
        setDocumentFile(documents as string[]);
      }
    }
    if (key === 'idNumber') {
      if (identities!.length > 0) {
        const documentsResponse = await Promise.all(
          identities.map(async (identity: string) => {
            const identityCardParams = {
              account_id: Number(account.account?.id!),
              hkid: identity
            };
            const response = await dispatch(
              getOnfidoIdentityCardByHKID(identityCardParams)
            );
            return response;
          })
        );
        const documents = documentsResponse
          .filter(el => el.type === 'getOnfidoIdentityCardByHKID/fulfilled')
          .map(doc => doc.payload as string);
        setIsPreviewImageOpen(!isPreviewImageOpen);
        setDocumentFile(documents);
      }
    }
  }

  const onNextImage = () => {
    if (activeDocumentIndex < documentFile!.length - 1) {
      setActiveDocumentIndex(activeDocumentIndex + 1);
      return;
    }
  };

  const onPrevious = () => {
    if (activeDocumentIndex > 0) {
      setActiveDocumentIndex(activeDocumentIndex - 1);
      return;
    }
  };

  async function onReUploadAddressProof(e) {
    const files = e.target.files;

    if (files.length > 5) {
      setPopupMessage({
        isOpen: true,
        type: 'warning',
        title: 'Upload Failed!',
        message: 'The maximum images of Address Proof is 5!',
        buttonTitle: 'Cancel'
      });
      return;
    }

    const base64ProofFiles = await Promise.all(
      Object.keys(files).map(async key => {
        const image = await convertToBase64(files[key]);
        return {
          proof_file: image
        };
      })
    );

    const proofOfAddressParam = {
      account_id: String(account.account?.id!),
      proof_of_addresses: base64ProofFiles
    };
    const response = await dispatch(
      reUploadProofOfAddressAction(proofOfAddressParam)
    );
    if (response.type === 'reUploadProofOfAddressAction/fulfilled') {
      setIsEditUser(false);
      setPopupMessage({
        isOpen: true,
        title: 'Changes Saved',
        message: 'Upload success',
        type: 'success'
      });
    }
    if (response.type === 'reUploadProofOfAddressAction/rejected') {
      setIsEditUser(false);
      setPopupMessage({
        isOpen: true,
        type: 'warning',
        title: 'Upload Failed!',
        message: response.payload ?? 'Re-upload Address Proof failed!',
        buttonTitle: 'Cancel'
      });
    }
  }

  const onChangePersonalInformation = (key: string, value: string) => {
    updateUserPersonalInformation({
      key,
      value
    });
  };

  const generateConfirmationNeededValue = (extraField, item) => {
    const parseExtraField = JSON.parse(extraField);
    const pink = {
      backgroundColor: '#FEC2C2',
      padding: '5px',
      display: 'inline-block'
    };
    const snakeCaseKey = _.snakeCase(item.key);

    const fieldKey = `${item.field}.${snakeCaseKey}`;
    let extraFieldValue = _.get(parseExtraField, fieldKey);
    if (item.key === 'address') {
      extraFieldValue = `${_.get(
        parseExtraField,
        'residence_info.address_line_1'
      )} ${_.get(parseExtraField, 'residence_info.address_line_2')} ${_.get(
        parseExtraField,
        'residence_info.region'
      )}`;
    }
    if (
      fieldKey === 'lora_account.us_resident' ||
      fieldKey === 'lora_account.hk_resident'
    ) {
      if (extraFieldValue != undefined) {
        extraFieldValue = extraFieldValue ? 'Yes' : 'No';
      }
    }
    if (item)
      if (extraFieldValue) {
        if (item.key === 'phone_number') {
          extraFieldValue = `+${personalInfo?.phoneCountryCode}${extraFieldValue}`;
        }

        let itemValue;

        if (item.key === 'address') {
          itemValue = `${item.value.address1} ${item.value.address2} ${item.value.region}`;
        } else {
          itemValue = item.value;
        }
        if (itemValue != extraFieldValue) {
          return (
            <>
              {item.key === 'address' ? (
                <div className='d-flex flex-column'>
                  {_.get(parseExtraField, 'residence_info.address_line_1') ? (
                    <p style={pink}>
                      {_.get(parseExtraField, 'residence_info.address_line_1')}
                    </p>
                  ) : (
                    <p>{item.value.address1}</p>
                  )}
                  {_.get(parseExtraField, 'residence_info.address_line_2') ? (
                    <p style={pink}>
                      {_.get(parseExtraField, 'residence_info.address_line_2')}
                    </p>
                  ) : (
                    <p>{item.value.address2}</p>
                  )}
                  {_.get(parseExtraField, 'residence_info.region') ? (
                    <p style={pink}>
                      {_.get(parseExtraField, 'residence_info.region')}
                    </p>
                  ) : (
                    <p>{item.value.region}</p>
                  )}
                </div>
              ) : (
                <p style={pink}>
                  {item.key === 'nationality'
                    ? generateNationalityValue(extraFieldValue)
                    : extraFieldValue}
                </p>
              )}
            </>
          );
        } else {
          return (
            <p>
              {item.key === 'nationality'
                ? generateNationalityValue(item.value)
                : item.value}
            </p>
          );
        }
      } else {
        return (
          <>
            {['address'].includes(item.key) ? (
              <>
                <p className={styles.value}>{item.value?.address1}</p>
                <p className={styles.value}>{item.value?.address2}</p>
                <p className={styles.value}>{item.value?.region}</p>
              </>
            ) : (
              <p>
                {item.key === 'nationality'
                  ? generateNationalityValue(item.value)
                  : item.value}
              </p>
            )}
          </>
        );
      }
  };

  const generateValue = item =>
    isEditUser ? userPersonalInformation[item.key] : item.value;

  const isIdNumberViewable = (): boolean => {
    if (identities.length > 0 && isEditUser == false) {
      return true;
    }
    return false;
  };

  const renderAddressInput = () => {
    const addressFields = [
      {
        icon: <Icon src={icons.address} size={20} />,
        label: 'Address',
        value: residenceInfo?.addressLine1 ?? '',
        key: 'address_line_1',
        inputType: 'text',
        editable: true,
        field: 'residence_info'
      },
      {
        icon: <Icon src={icons.address} size={20} />,
        label: 'Address',
        value: residenceInfo?.addressLine2 ?? '',
        key: 'address_line_2',
        inputType: 'text',
        editable: true,
        field: 'residence_info'
      },
      {
        label: 'Region',
        value: residenceInfo?.region,
        key: 'region',
        inputType: 'select',
        options: Object.values(Region),
        editable: true,
        field: 'residence_info'
      }
    ];
    return addressFields.map((field, i) => (
      <div className='align-items-center w-100 my-4'>
        <Input
          type={i != 2 ? 'text' : 'select'}
          className={i != 2 ? styles.address_input : styles.input_legal_name}
          defaultValue={userPersonalInformation[field.key!] ?? field.value}
          onChange={e => {
            e.preventDefault();
            onChangePersonalInformation(field.key!, e.target.value);
          }}
        >
          {field?.options &&
            field?.options.map((opt, i) => (
              <>
                {_.isEmpty(field.value) ? (
                  <option value='' selected disabled hidden key={i}>
                    {`Select ${field.label.replace(':', '')}`}
                  </option>
                ) : null}
                <option key={i} value={opt}>
                  {opt}
                </option>
              </>
            ))}
        </Input>
      </div>
    ));
  };

  const renderField = item => (
    <Row className='align-items-center w-100 mb-2'>
      <Col
        xs={4}
        className='d-flex flex-column align-items-center'
        style={{ width: '75px' }}
      >
        {item.icon}
        <p className={styles.label_icon}>{item.label}</p>
      </Col>

      <Col xs='8' className='ps-4'>
        {isEditUser && item.editable ? (
          <>
            {['Address'].includes(item.label) ? (
              <>{renderAddressInput()}</>
            ) : (
              <Input
                type={item.inputType ?? 'text'}
                className={styles.value + ' ' + styles.input_legal_name}
                defaultValue={userPersonalInformation[item.key!] ?? item.value}
                onChange={e => {
                  e.preventDefault();
                  onChangePersonalInformation(item.key!, e.target.value);
                }}
              >
                {item?.options &&
                  item?.options.map((opt, i) => (
                    <>
                      {_.isEmpty(item.value) ? (
                        <option value='' selected disabled hidden key={i}>
                          {`Select ${item.label.replace(':', '')}`}
                        </option>
                      ) : null}
                      <option
                        key={i}
                        value={item.key === 'nationality' ? opt.label : opt}
                      >
                        {item.key === 'nationality' ? opt.label : opt}
                      </option>
                    </>
                  ))}
              </Input>
            )}
          </>
        ) : (
          <>
            {item.label == 'Bank Detail' ? (
              <div>
                <p className={styles.value}>{item.value.bank_code}</p>
                <p className={styles.value}>{item.value.bank_number}</p>
              </div>
            ) : item.label === 'Address' ? (
              <div>
                {isConfirmationNeeded() ? (
                  generateConfirmationNeededValue(
                    accountComment[0]?.extraField,
                    item
                  )
                ) : (
                  <>
                    <p className={styles.value}>{item.value?.address1}</p>
                    <p className={styles.value}>{item.value?.address2}</p>
                    <p className={styles.value}>{item.value?.district}</p>
                  </>
                )}
              </div>
            ) : item.label == 'Date of Birth' || item.label == 'Email' ? (
              <div>
                <p className={styles.value}>{item.value}</p>
              </div>
            ) : (
              <>
                {item.key === 'addressProof' ? (
                  <div className='d-flex gap-5 align-items-center'>
                    <p className={styles.value}>{item.value}</p>
                    {isAddressProofViewable() && !isEditUser ? (
                      <p
                        className={styles.view_button}
                        onClick={() => onClickViewButton(item.key)}
                      >
                        View
                      </p>
                    ) : null}
                    {isAddressProofViewable() && isEditUser ? (
                      <div style={{ width: '200px' }}>
                        <label
                          className={styles.view_button}
                          onClick={() => addressProofFile.current.click()}
                        >
                          {loading.source ===
                            'reUploadProofOfAddressAction/pending' &&
                          loading.status ? (
                            <Spinner size='sm' color='primary' type='grow' />
                          ) : (
                            'Reupload'
                          )}
                        </label>
                        <input
                          ref={addressProofFile}
                          onChange={e => onReUploadAddressProof(e)}
                          type='file'
                          hidden
                          multiple
                        />
                      </div>
                    ) : null}
                  </div>
                ) : item.key === 'idNumber' ? (
                  <div className='d-flex gap-5 align-items-center'>
                    <p className={styles.value}>{item.value}</p>
                    {isIdNumberViewable() ? (
                      <p
                        className={styles.view_button}
                        onClick={() => onClickViewButton(item.key)}
                      >
                        {loading.source ===
                          'getOnfidoIdentityCardByHKID/pending' &&
                        loading.status ? (
                          <Spinner size='sm' color='primary' type='grow' />
                        ) : (
                          'View'
                        )}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className={styles.value}>
                    {isConfirmationNeeded()
                      ? generateConfirmationNeededValue(
                          accountComment[0]?.extraField,
                          item
                        )
                      : generateValue(item)}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </Col>
    </Row>
  );

  const onEditPersonalInfo = () => {
    if (isConfirmationNeeded()) {
      if (profile?.admin_groups?.includes('editoradmin')) {
        setIsEditUser(!isEditUser);
      } else {
        setPopupMessage({
          isOpen: true,
          type: 'warning',
          title: 'Not Authorised To Change',
          message:
            'You are not authorised to edit the user’s personal information',
          buttonTitle: 'Back'
        });
      }
    } else {
      setIsEditUser(!isEditUser);
    }
  };

  const isConfirmationNeeded = () => {
    if (accountComment[0]?.noteStatus === 'REQUESTED') {
      return true;
    }
    return false;
  };

  const onChangePhoneNumber = event => {
    const regex = /^[0-9]+$/;
    let inputtedPhoneNumber = event.target.value.slice(
      4,
      event.target.value.length
    );

    if (regex.test(inputtedPhoneNumber)) {
      phoneNumber.dispatch({
        type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
        payload:
          inputtedPhoneNumber.length <= 8
            ? event.target.value
            : phoneNumber.value
      });
    } else {
      if (inputtedPhoneNumber.length === 0) {
        phoneNumber.dispatch({
          type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
          payload: '+852'
        });
      } else {
        phoneNumber.dispatch({
          type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
          payload: phoneNumber.value
        });
      }
    }
  };
  const isPhoneNumberInvalid = () => {
    const regex = /^[0-9]+$/;
    const inputtedNumber = phoneNumber.value.slice(4, phoneNumber.value.length);

    if (regex.test(inputtedNumber) && inputtedNumber.length === 8) {
      return false;
    }
    return true;
  };

  const isNameInvalid = name => {
    const env = process.env.REACT_APP_ENV;
    const productionRegex = /^[A-Za-z\s]*$/;
    const devStagingRegex = /^[-_ a-zA-Z]+$/;
    const regex = env === 'Production' ? productionRegex : devStagingRegex;
    return regex.test(name) && name.length != 0 && name.length <= 25
      ? false
      : true;
  };

  const phoneNumberField = item => {
    return (
      <Row className='d-flex flex-row align-items-center w-100 mb-2'>
        <Col
          xs={4}
          className='d-flex flex-column align-items-center'
          style={{ width: '75px' }}
        >
          {item.icon}
          <p className={styles.label_icon}>{item.label}</p>
        </Col>

        <Col xs='8' className='ps-4'>
          {isEditUser ? (
            <Input
              className={styles.value + ' ' + styles.input_legal_name}
              value={phoneNumber.value}
              onChange={e => onChangePhoneNumber(e)}
              invalid={isPhoneNumberInvalid()}
            />
          ) : (
            <p className={styles.value}>
              {isConfirmationNeeded()
                ? generateConfirmationNeededValue(
                    accountComment[0]?.extraField,
                    item
                  )
                : item.value}
            </p>
          )}
        </Col>
      </Row>
    );
  };

  const onChangeFirstName = event => {
    const env = process.env.REACT_APP_ENV;
    const productionRegex = /^[A-Za-z\s]*$/;
    const devStagingRegex = /^[-_ a-zA-Z]+$/;
    const regex = env === 'Production' ? productionRegex : devStagingRegex;
    const inputtedFirstName = event.target.value;

    if (regex.test(inputtedFirstName)) {
      firstName.dispatch({
        type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
        payload: inputtedFirstName
      });
    } else {
      firstName.dispatch({
        type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
        payload: firstName.value
      });
    }
  };

  const firstNameField = item => {
    return (
      <Row className='d-flex flex-row align-items-center w-100 mb-2'>
        <Col
          xs={4}
          className='d-flex flex-column align-items-center'
          style={{ width: '75px' }}
        >
          {item.icon}
          <p className={styles.label_icon}>{item.label}</p>
        </Col>

        <Col xs='8' className='ps-4'>
          {isEditUser ? (
            <Input
              className={styles.value + ' ' + styles.input_legal_name}
              value={firstName.value}
              onChange={e => onChangeFirstName(e)}
            />
          ) : (
            <p className={styles.value}>
              {isConfirmationNeeded()
                ? generateConfirmationNeededValue(
                    accountComment[0]?.extraField,
                    item
                  )
                : item.value}
            </p>
          )}
        </Col>
      </Row>
    );
  };

  const onChangeLastName = event => {
    const env = process.env.REACT_APP_ENV;
    const productionRegex = /^[A-Za-z\s]*$/;
    const devStagingRegex = /^[-_ a-zA-Z]+$/;
    const regex = env === 'Production' ? productionRegex : devStagingRegex;

    const inputtedLastName = event.target.value;

    if (regex.test(inputtedLastName)) {
      lastName.dispatch({
        type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
        payload: inputtedLastName
      });
    } else {
      lastName.dispatch({
        type: INPUT_REDUCER_ACTION_TYPE.SET_VALUE,
        payload: lastName.value
      });
    }
  };

  const lastNameField = item => {
    return (
      <Row className='d-flex flex-row align-items-center w-100 mb-2'>
        <Col
          xs={4}
          className='d-flex flex-column align-items-center'
          style={{ width: '75px' }}
        >
          {item.icon}
          <p className={styles.label_icon}>{item.label}</p>
        </Col>

        <Col xs='8' className='ps-4'>
          {isEditUser ? (
            <Input
              className={styles.value + ' ' + styles.input_legal_name}
              value={lastName.value}
              onChange={e => {
                e.preventDefault();
                onChangeLastName(e);
              }}
            />
          ) : (
            <p className={styles.value}>
              {isConfirmationNeeded()
                ? generateConfirmationNeededValue(
                    accountComment[0]?.extraField,
                    item
                  )
                : item.value}
            </p>
          )}
        </Col>
      </Row>
    );
  };

  const renderMoreFields = items => (
    <div className='d-flex flex-row mb-2'>
      {items.map((item, i) => {
        return (
          <React.Fragment key={i}>
            {item.key === 'phone_number'
              ? phoneNumberField(item)
              : item.key === 'last_name'
              ? lastNameField(item)
              : item.key === 'first_name'
              ? firstNameField(item)
              : renderField(item)}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <React.Fragment>
      <LoadingOverlay
        active={loadingOverlay.active}
        placeholder={loadingOverlay.placeholder}
      />
      <ModalPreviewImage
        isOpen={isPreviewImageOpen}
        onClose={() => setIsPreviewImageOpen(false)}
        items={documentFile}
        activeIdx={activeDocumentIndex}
        onNext={onNextImage}
        onPrevious={onPrevious}
        size='xl'
        isDownloadable
      />
      <PopupMessage
        isOpen={popupMessage.isOpen}
        title={popupMessage.title}
        message={popupMessage.message}
        type={popupMessage.type}
        toggle={closeModal}
        onClick={onClickButtonInPopupMessage}
        buttonTitle={popupMessage.buttonTitle}
        onBack={onBackModal}
      />
      <div className={styles.personal_information_card}>
        <div className='d-flex gap-3 mb-3'>
          <h4 className='flex-grow-1'>Personal Information</h4>
          {!isEditUser && !_.isEmpty(personalInfo) ? (
            <span className={styles.edit_button} onClick={onEditPersonalInfo}>
              Edit
            </span>
          ) : null}
        </div>
        {renderMoreFields(details.slice(0, 2))}
        {renderMoreFields(details.slice(2, 4))}
        {renderField(details[4])}
        {renderField(details[5])}
        {renderMoreFields(details.slice(6, 8))}
        {renderField(details[8])}
        {renderField(details[11])}
        {renderField(details[12])}
        {renderField(details[13])}
        {renderField(details[14])}
        <div className='mt-4 d-flex gap-4 align-items-center mb-3'>
          <h4>Changes</h4>
        </div>
        <div className='mb-5 position-relative'>
          <FormGroup onSubmit={onSubmitNote}>
            <Input
              type='textarea'
              disabled={!isEditNote}
              value={isEditNote ? notes : generateNote()}
              placeholder={generateNote() ?? ''}
              onChange={e => handleInputNotes(e)}
            />
          </FormGroup>
        </div>
        {isEditUser ? (
          <div className='d-flex justify-content-end gap-3'>
            <Button
              style={{ background: '#74283E' }}
              onClick={onCancelEditUser}
            >
              Cancel
            </Button>
            <Button
              style={{ background: '#0156D6' }}
              onClick={onConfirmUpdateUser}
              disabled={isPhoneNumberInvalid()}
            >
              {loading.source == 'updatePersonalInformationAction/pending' &&
              loading.status ? (
                <Spinner size='sm'>Loading...</Spinner>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        ) : null}
        {isConfirmationNeeded() && !isEditUser ? (
          <div className='d-flex justify-content-end'>
            <div className='d-flex flex-column'>
              <Button
                style={{ background: '#c43335', marginBottom: '10px' }}
                onClick={onCancelDataChanges}
              >
                Cancel Changes
              </Button>
              <Button
                style={{ background: '#0156D6' }}
                onClick={onConfirmUserDataChanges}
              >
                Confirm Changes
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default PersonalInformationCard;
