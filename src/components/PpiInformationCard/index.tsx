import { FC, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { Col, Collapse, Row } from 'reactstrap';
import dayjs from 'dayjs';
import styles from './styles.module.scss';
import { useAppSelector } from 'redux/store/hooks';

interface PpiInformationCardProps {}
const PpiInformationCard: FC<PpiInformationCardProps> = (
  props: PpiInformationCardProps
) => {
  const {} = props;
  const { ppiAnswersDetail } = useAppSelector(state => state.ppi);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const handleDetails = () => setIsDetailsOpen(!isDetailsOpen);

  const personalizationQuestion = ppiAnswersDetail?.filter(
    detail => detail?.answer?.question?.section !== 'PRIVACY'
  );

  const privacyQuestion = ppiAnswersDetail?.filter(
    detail => detail?.answer?.question?.section === 'PRIVACY'
  );
  return (
    <div className={styles.ppi_information_card}>
      <div
        className={styles.detail_toggle + ' d-flex gap-3'}
        onClick={handleDetails}
      >
        <h4 className='flex-grow-1'>PPI Questions</h4>
        <div
          className={
            !isDetailsOpen
              ? styles.down_icon
              : isDetailsOpen
              ? styles.up_icon
              : ''
          }
        >
          <IoIosArrowUp size={30} />
        </div>
      </div>
      <Collapse isOpen={isDetailsOpen}>
        <div className='pt-3'>
          <Row className='mb-3'>
            <Col xs='12'>
              <p className={styles.subtitle}>
                Privacy{' '}
                <span className='ms-4'>
                  (Date Last Changed:{' '}
                  {privacyQuestion.length > 0
                    ? dayjs(
                        privacyQuestion.sort(
                          (a, b) => b.detail?.updated - a.detail?.updated
                        )[0].detail?.updated
                      ).format('DD/MM/YYYY')
                    : null}
                  )
                </span>
              </p>
            </Col>
          </Row>
          {privacyQuestion.length > 0
            ? privacyQuestion.map((privacy, i) => (
                <Row key={i} className='mb-3'>
                  <Col xs='9'>
                    <p className={styles.label}>
                      {privacy?.answer?.question?.question}
                    </p>
                  </Col>
                  <Col xs='3'>
                    <p className={styles.label}>
                      {privacy?.answer?.name == ''
                        ? privacy?.answer?.answer
                        : privacy?.answer?.name}
                    </p>
                  </Col>
                </Row>
              ))
            : null}
          <Row className='mb-3 mt-3'>
            <Col xs='12'>
              <p className={styles.subtitle}>
                Personalisation{' '}
                <span className='ms-4'>
                  (Date Last Changed:{' '}
                  {personalizationQuestion.length > 0
                    ? dayjs(
                        ppiAnswersDetail
                          ?.filter(
                            detail =>
                              detail?.answer?.question?.section !== 'PRIVACY'
                          )
                          .sort(
                            (a, b) => b.detail?.updated - a.detail?.updated
                          )[0].detail?.updated
                      ).format('DD/MM/YYYY')
                    : null}
                  )
                </span>
              </p>
            </Col>
          </Row>
          {personalizationQuestion.length > 0
            ? personalizationQuestion.map((privacy, i) => (
                <Row key={i} className='mb-3'>
                  <Col xs='9'>
                    <p className={styles.label}>
                      {privacy?.answer?.question?.question}
                    </p>
                  </Col>
                  <Col xs='3'>
                    <p className={styles.label}>
                      {privacy?.answer?.name == ''
                        ? privacy?.answer?.answer
                        : privacy?.answer?.name}
                    </p>
                  </Col>
                </Row>
              ))
            : null}
        </div>
      </Collapse>
    </div>
  );
};

export default PpiInformationCard;
