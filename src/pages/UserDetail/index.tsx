import { useEffect } from 'react';
import { TfiArrowCircleLeft } from 'react-icons/tfi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'reactstrap';
import _ from 'lodash';
import AccountInformationCard from '../../components/AccountInformationCard';
import AffiliationCard from '../../components/AffiliationCard';
import AgreementCard from '../../components/AgreementCard';
import ChecklistCard from '../../components/ChecklistCard';
import EmploymentInformationCard from '../../components/EmploymentInformationCard';
import SourceOfWealthCard from '../../components/SourceOfWealthCard';
import Header from '../../components/Header';
import KycInformationCard from '../../components/KycInformationCard';
import OverviewCard from '../../components/OverviewCard';
import PersonalInformationCard from '../../components/PersonalInformationCard';
import Portfolio from '../../components/Portfolio';
import PpiInformationCard from '../../components/PpiInformationCard';
import RiskInformationCard from '../../components/RiskInformationCard';
import styles from './styles.module.scss';
import {
  useGetAccountCommentQuery,
  useGetAccountChecklistQuery,
  useGetPpiAccountByIdQuery,
  useGetKycReportsByIdQuery,
  useGetAccountDetailQuery,
  useGetPpiAnswersDetailQuery
} from 'graphql/queries.generated';
import { useAppDispatch, useAppSelector } from 'redux/store/hooks';
import {
  setAccountComment,
  setAccountChecklist,
  setKycReports,
  setAccount
} from 'redux/slice/userSlice';
import { setPpiAccount, setPpiAnswersDetail } from 'redux/slice/ppiSlice';
import {
  getAccountDataAction,
  getOnfidoHKIDList
} from 'redux/action/userAction';
import useEditUser from 'hooks/useEditUser';

function UserDetail() {
  const dispatch = useAppDispatch();
  const { state }: any = useLocation();
  const { userId } = useParams();
  const navigation = useNavigate();
  const { successMessage, loading, account } = useAppSelector(
    state => state.user
  );

  const { resetUserPersonalInformation } = useEditUser();

  const { loraAccount } = account;

  const {
    data: dataAccountDetail,
    loading: accountDetailLoading,
    error: accountDetailError,
    refetch: accountDetailRefetch
  } = useGetAccountDetailQuery({
    variables: {
      accountId: Number(userId)
    }
  });

  const {
    data: dataAccountComment,
    loading: accountCommentLoading,
    error: accountCommentError,
    refetch: accountCommentRefetch
  } = useGetAccountCommentQuery({
    variables: {
      accountId: Number(userId)
    }
  });

  const {
    data: dataAccountChecklist,
    loading: accountChecklistLoading,
    error: accountChecklistError,
    refetch: accountChecklistRefetch
  } = useGetAccountChecklistQuery({
    variables: {
      userId: Number(userId)
    }
  });

  const {
    data: dataPpiAccount,
    loading: ppiAccountLoading,
    error: ppiAccountError,
    refetch: ppiAccountRefetch
  } = useGetPpiAccountByIdQuery({
    variables: {
      accountId: state.username
    }
  });

  const {
    data: dataKycReports,
    loading: kycReportsLoading,
    error: kycReportsError,
    refetch: kycReportsRefetch
  } = useGetKycReportsByIdQuery({
    variables: {
      userId: String(userId)
    }
  });

  const {
    data: dataPpiAnswersDetail,
    loading: ppiAnswersDetailLoading,
    error: ppiAnswersDetailError
  } = useGetPpiAnswersDetailQuery({
    variables: {
      accountId: state.username
    }
  });

  function backToUserTable() {
    navigation(-1);
  }

  useEffect(() => {
    dispatch(getAccountDataAction(String(userId)));
    dispatch(getOnfidoHKIDList(Number(userId)));
    resetUserPersonalInformation();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userId]);

  useEffect(() => {
    if (dataAccountComment?.accountComment) {
      const sortedComment = _.sortBy(dataAccountComment?.accountComment, [
        'created'
      ]).reverse();
      dispatch(setAccountComment(sortedComment));
    }
    if (dataAccountChecklist?.accountChecklist) {
      dispatch(setAccountChecklist(dataAccountChecklist.accountChecklist));
    }
    if (dataPpiAccount?.ppiAccountById) {
      dispatch(setPpiAccount(dataPpiAccount.ppiAccountById));
    }
    if (dataAccountDetail?.accountWithDetailsById) {
      dispatch(setAccount(dataAccountDetail.accountWithDetailsById));
    }
    if (dataKycReports?.kycReportsById) {
      dispatch(setKycReports(dataKycReports.kycReportsById));
    }
    if (dataPpiAnswersDetail?.ppiAnswersDetail) {
      dispatch(setPpiAnswersDetail(dataPpiAnswersDetail.ppiAnswersDetail));
    }
  }, [
    dataAccountComment,
    dataAccountChecklist,
    dataPpiAccount,
    dataAccountDetail,
    dataKycReports,
    dataPpiAnswersDetail
  ]);

  useEffect(() => {
    if (successMessage.source === 'checklistFieldAction/fulfilled') {
      accountChecklistRefetch();
    }
    if (
      successMessage.source === 'updatePersonalInformationAction/fulfilled' ||
      successMessage.source === 'updateEmploymentInformationAction/fulfilled' ||
      successMessage.source === 'suspendAccountAction/fulfilled' ||
      successMessage.source === 'approvalAccountAction/fulfilled' ||
      successMessage.source === 'reactivateAccountAction/fulfilled' ||
      successMessage.source === 'upgradeAccountAction/fulfilled' ||
      successMessage.source === 'resubmitRequestAction/fulfilled' ||
      successMessage.source === 'updateResidenceInfoAction/fulfilled' ||
      successMessage.source === 'updateLoraAccountAction/fulfilled' ||
      successMessage.source === 'reUploadProofOfAddressAction/fulfilled' ||
      successMessage.source === 'mergeCommentAction/fulfilled'
    ) {
      accountDetailRefetch();
    }
    if (
      successMessage.source === 'postCommentAction/fulfilled' ||
      successMessage.source === 'mergeCommentAction/fulfilled'
    ) {
      accountCommentRefetch();
    }
  }, [successMessage]);

  return (
    <div className={styles.user_detail_page}>
      <Header />
      <Container className='pb-3'>
        <div
          className={
            styles.back_icon + ' d-inline-flex gap-2 align-items-center my-4'
          }
          onClick={backToUserTable}
        >
          <TfiArrowCircleLeft size={20} color='#35D2E8' />
          <p className={styles.back_to_user}>Back to Users</p>
        </div>
        {(loading.source === 'getAccountDataAction/pending' &&
          loading.status) ||
        accountDetailLoading ||
        accountCommentLoading ||
        ppiAnswersDetailLoading ||
        accountChecklistLoading ? (
          <Container className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner color='primary' />
          </Container>
        ) : (
          <Row>
            <Col xs='8'>
              <OverviewCard data={state} />
              <AccountInformationCard data={state} />
              <KycInformationCard data={state} />
              <RiskInformationCard data={state} />
              <PersonalInformationCard data={state} />
              <EmploymentInformationCard data={state} />
              <SourceOfWealthCard data={state} />
              {/* SKIP IT FIRST */}
              {/* <AffiliationCard data={state} />
              <AgreementCard data={state} /> */}
              <PpiInformationCard />
            </Col>
            <Col xs='4'>
              {loraAccount?.loraStatus === 'ACTIVE' ? (
                <></>
              ) : (
                // <Portfolio data={{}} />
                <ChecklistCard userId={state?.id} />
              )}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default UserDetail;
