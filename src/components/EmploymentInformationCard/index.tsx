import React, { FC, useState } from 'react';
import { Col, Row, Button, Input, Spinner } from 'reactstrap';
import _ from 'lodash';
import {
  EmploymentStatus,
  NatureOfBusiness,
  Region,
  District
} from '../../types/user_types';
import PopupMessage, {
  PopupMessageProp,
  PopupMessageType
} from 'components/PopupMessage';
import { updateEmploymentInformationAction } from 'redux/action/userAction';
import { useAppDispatch, useAppSelector } from 'redux/store/hooks';
import useEditUser from 'hooks/useEditUser';
import styles from './styles.module.scss';
import { generateNationalityValue, generateSelectedCountry } from 'constants/';

interface EmploymentInformationCardProps {
  data;
}

const EmploymentInformationCard: FC<EmploymentInformationCardProps> = (
  props: EmploymentInformationCardProps
) => {
  const dispatch = useAppDispatch();
  const { loading, error, successMessage, account, countries } = useAppSelector(
    state => state.user
  );
  const { employmentInfo } = account;
  const {
    userEmploymentInformation,
    updateUserEmploymentInformation,
    resetUserEmploymentInformation
  } = useEditUser();

  const [popupMessage, setPopupMessage] = useState<PopupMessageProp>({
    isOpen: false,
    title: '',
    message: '',
    buttonTitle: ''
  });

  const { data } = props;
  const [isEdit, setIsEdit] = useState(false);
  const details = [
    {
      label: 'Employment Status:',
      value: employmentInfo?.employmentStatus,
      inputType: 'select',
      options: Object.values(EmploymentStatus),
      key: 'employment_status'
    },
    {
      label: 'Employer Address:',
      value: employmentInfo?.employerAddressLine1,
      key: 'employer_address_line_1'
    },
    {
      label: 'Nature of Business:',
      value: employmentInfo?.employerBusiness,
      inputType: 'select',
      options: Object.values(NatureOfBusiness),
      key: 'employer_business'
    },
    {
      label: 'Employer District:',
      value: employmentInfo?.district,
      inputType: 'select',
      options: Object.values(District),
      key: 'district'
    },
    {
      label: 'Employer:',
      value: employmentInfo?.employer,
      key: 'employer'
    },

    {
      label: 'Employer Region:',
      value: employmentInfo?.region,
      inputType: 'select',
      options: Object.values(Region),
      key: 'region'
    },
    {
      label: '',
      value: ''
    },
    {
      label: 'Employer Country:',
      value: employmentInfo?.country
        ? generateNationalityValue(employmentInfo?.country)
        : '',
      inputType: 'select',
      options: countries,
      key: 'country'
    }
  ];

  const onChangeEmploymentInformation = (key: string, value: any) => {
    updateUserEmploymentInformation({ key, value });
  };

  const onConfirmChangesEmploymentInfo = async () => {
    const userEmploymentInformationParams = userEmploymentInformation;
    userEmploymentInformationParams.account_id = data?.id;
    if (userEmploymentInformation.country) {
      userEmploymentInformationParams.country = generateSelectedCountry(
        userEmploymentInformation.country!
      );
    }
    setIsEdit(false);
    const response = await dispatch(
      updateEmploymentInformationAction(userEmploymentInformationParams)
    );
    if (response.type === 'updateEmploymentInformationAction/fulfilled') {
      resetUserEmploymentInformation();
      setTimeout(() => {
        openPopupMessage(
          'Changes Saved',
          'Your changes have been saved.',
          'success',
          'Continue'
        );
      }, 1000);
    }
    if (response.type === 'updateEmploymentInformationAction/rejected') {
      resetUserEmploymentInformation();
      setTimeout(() => {
        openPopupMessage(
          'Changes Failed',
          response.payload ?? 'Changes Employment Information failed.',
          'warning',
          'Continue'
        );
      }, 1000);
    }
  };

  const openPopupMessage = (
    title: string,
    message: string,
    type?: string,
    buttonTitle?: string
  ): void => {
    setPopupMessage({
      isOpen: true,
      type: type as PopupMessageType,
      title: title,
      message: message,
      buttonTitle: buttonTitle ?? 'Save'
    });
  };

  const onCancelEmploymentInfo = () => {
    resetUserEmploymentInformation();
    openPopupMessage(
      'Cancel Changes',
      'Are you sure you wish to discard all changes? Your info will not be saved',
      'warning',
      'Cancel'
    );
  };

  const onSaveEmploymentInfo = () => {
    openPopupMessage(
      'Confirm Changes',
      'Are you sure you wish to save all changes?'
    );
  };

  function renderField(item) {
    return isEdit ? (
      <>
        {item.label ? (
          <Col key={item.label} xs={6} className={'mb-3'}>
            <Row className='mb-2'>
              <Col className='d-flex align-items-center' xs={4}>
                <p className={styles.label}>{item.label}</p>
              </Col>
              <Col
                key={item.label}
                xs={8}
                className={'d-flex align-items-center'}
              >
                <Input
                  type={item.inputType ?? 'text'}
                  className={styles.value}
                  value={userEmploymentInformation[item.key] ?? item.value}
                  onChange={e => {
                    onChangeEmploymentInformation(item.key, e.target.value);
                  }}
                >
                  {item?.options &&
                    item?.options.map((opt, i) => {
                      return (
                        <>
                          {_.isEmpty(item.value) ? (
                            <option value='' selected disabled hidden key={i}>
                              {`Select ${item.label.replace(':', '')}`}
                            </option>
                          ) : null}
                          <option
                            key={i}
                            value={item.key === 'country' ? opt.label : opt}
                          >
                            {item.key === 'country' ? opt.label : opt}
                          </option>
                        </>
                      );
                    })}
                </Input>
              </Col>
            </Row>
          </Col>
        ) : (
          <Col></Col>
        )}
      </>
    ) : (
      <Col key={item.label} xs={6} className={'mb-3'}>
        <Row className='d-flex align-items-center'>
          <Col xs={4}>
            <p className={styles.label}>{item.label}</p>
          </Col>
          <Col xs={8}>
            <p className={styles.value}>{item.value}</p>
          </Col>
        </Row>
      </Col>
    );
  }
  const onCloseModal = () => {
    setPopupMessage({ ...popupMessage, isOpen: false });
    if (popupMessage.title === 'Cancel Changes') {
      setIsEdit(false);
    }
  };
  const onClickButtonPopupMessage = () => {
    setPopupMessage({ ...popupMessage, isOpen: false });
    if (popupMessage.title === 'Cancel Changes') {
      setIsEdit(false);
    } else if (popupMessage.title === 'Confirm Changes') {
      onConfirmChangesEmploymentInfo();
    }
  };
  return (
    <div className={styles.employment_information_card}>
      <PopupMessage
        isOpen={popupMessage.isOpen}
        title={popupMessage.title}
        message={popupMessage.message}
        type={popupMessage.type}
        toggle={onCloseModal}
        onClick={onClickButtonPopupMessage}
        buttonTitle={popupMessage.buttonTitle}
      />
      <div className='d-flex gap-3 mb-3 justify-content-between'>
        <h4 className='mb-3'>Employment Information</h4>
        {!isEdit && !_.isEmpty(employmentInfo) ? (
          <span
            className={styles.edit_button}
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </span>
        ) : null}
      </div>
      <div>
        <Row>
          {details.map((item, i) => (
            <React.Fragment key={i}>{renderField(item)}</React.Fragment>
          ))}
        </Row>
        {isEdit ? (
          <div className='d-flex justify-content-end gap-3'>
            <Button
              style={{ background: '#74283E' }}
              onClick={onCancelEmploymentInfo}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: '#0156D6',
                bottom: '10%',
                right: '2%',
                zIndex: 1
              }}
              onClick={onSaveEmploymentInfo}
            >
              {loading.source === 'updateEmploymentInformationAction/pending' &&
              loading.status ? (
                <Spinner size='sm'>Loading...</Spinner>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmploymentInformationCard;
