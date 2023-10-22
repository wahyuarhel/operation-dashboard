import ModalPreviewImage from 'components/ModalPreviewImage';
import icons from 'constants/icons';
import React, { useState } from 'react';
import { Spinner } from 'reactstrap';
import { getOnfidoLivePhotos } from 'redux/action/userAction';
import { useAppDispatch, useAppSelector } from 'redux/store/hooks';
import styles from './styles.module.scss';
import { kycResult } from 'types/transaction_types';

interface KycInformationCardProps {
  data;
}
const KycInformationCard: React.FC<KycInformationCardProps> = (
  props: KycInformationCardProps
) => {
  const dispatch = useAppDispatch();
  const { data } = props;
  const { kycReports, account, accountData, photoSelfie, loading } =
    useAppSelector(state => state.user);
  const [isPreviewImageOpen, setIsPreviewImageOpen] = useState(false);
  const [photoSelfieUrl, setPhotoSelfieUrl] = useState<any>();

  const fontColor = (status: string): Object => {
    switch (status) {
      case kycResult.clear:
        return { color: '#009821' };
      case kycResult.caution:
        return { color: '#F29100' };
      case kycResult.suspected:
        return { color: '#FF5C00' };
      case kycResult.consider:
        return { color: '#FF5C00' };
      case kycResult.rejected:
        return { color: '#C33335' };
      default:
        return { color: 'black' };
    }
  };

  function getReportResult(reportName: string): string {
    if (accountData?.account_kyc === null) return '-';
    if (accountData?.account_kyc?.kyc_report?.reports.length > 0) {
      let report = accountData?.account_kyc?.kyc_report?.reports.find(
        item => item?.name === reportName
      );
      if (report?.result) return report?.result.toUpperCase();
      else return '-';
    } else return '-';
  }

  const kycTableInformation = [
    {
      label: 'DOCUMENT',
      value: getReportResult('document')
    },
    {
      label: 'SELFIE',
      value: getReportResult('facial_similarity_photo')
    },
    {
      label: 'WATCHLIST',
      value: getReportResult('watchlist_standard')
    }
  ];

  const onViewSelfie = async () => {
    const response = await dispatch(
      getOnfidoLivePhotos(String(account.account?.id))
    );
    if (response.type === 'getOnfidoLivePhotos/fulfilled') {
      setIsPreviewImageOpen(true);
      setPhotoSelfieUrl(response.payload);
    }
  };
  return (
    <div className={styles.kyc_information_card}>
      <ModalPreviewImage
        isOpen={isPreviewImageOpen}
        onClose={() => setIsPreviewImageOpen(false)}
        items={[photoSelfieUrl]}
        activeIdx={0}
        size='xl'
        isDownloadable
      />
      <div className='mb-3 d-flex align-items-center gap-3'>
        <h4 className='flex-grow-1'>KYC Information</h4>
        <a
          className={styles.go_to_onfido}
          target='_blank'
          href={
            kycReports?.length && kycReports[0].resultUriDashboard
              ? kycReports[0].resultUriDashboard
              : 'https://dashboard.onfido.com/users/sign_in'
          }
          rel='noreferrer'
        >
          Go to Onfido Dashboard
        </a>
      </div>
      <div className='d-flex'>
        <div className='d-flex flex-column align-items-center gap-2'>
          <div className={styles.icon_wrapper}>
            <img src={icons.onfido} alt='onfido' />
          </div>
          <p className={styles.icon_label}>Onfido</p>
        </div>
        <div className='flex-grow-1 ps-4'>
          <p className={styles.icon_label + ' mb-4'}>
            User Id:{' '}
            <span className={styles.label_text + ' ps-2'}>{data?.id}</span>
          </p>
          <div>
            <table>
              <tbody>
                {kycTableInformation.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {item.label}
                      {i === 1 &&
                      accountData?.account_kyc?.kyc_live_photo?.live_photos
                        .length > 0 ? (
                        <>
                          {loading.source === 'getOnfidoLivePhotos/pending' &&
                          loading.status ? (
                            <div>
                              <Spinner size='sm' color='primary' type='grow' />
                            </div>
                          ) : (
                            <p
                              className={styles.view_selfie}
                              onClick={() => onViewSelfie()}
                            >
                              View
                            </p>
                          )}
                        </>
                      ) : null}
                    </td>
                    <td style={fontColor(item.value)}>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycInformationCard;
