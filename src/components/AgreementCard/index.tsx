import images from 'constants/images';
import { FC } from 'react';
import { downloadFile } from 'utils';
import styles from './styles.module.scss';

interface AgreementCardProps {
  data;
}
const AgreementCard: FC<AgreementCardProps> = (props: AgreementCardProps) => {
  const { data } = props;

  function downloadW8BenDocument() {
    downloadFile(
      'http://localhost:3000/static/media/signature.c784bcd8c2426adb1e1e.png',
      `${data.name}-W8-BEN-`
    );
  }
  function downloadUserSignature() {
    downloadFile(
      'http://localhost:3000/static/media/signature.c784bcd8c2426adb1e1e.png',
      `${data.name}-signature`
    );
  }

  return (
    <div className={styles.agreement_card}>
      <h4 className='mb-5'>Agreements</h4>
      <h5 className=''>W8-BEN Form</h5>
      <div className='mb-5'>
        <p
          className={styles.download_w8 + ' mb-5'}
          onClick={downloadW8BenDocument}
        >
          Download W8-BEN
        </p>
      </div>
    </div>
  );
};

export default AgreementCard;
