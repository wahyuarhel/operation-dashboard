import { gql } from '@apollo/client';
import {
  TRANSACTION_REMITTANCE_FIELDS,
  PAGE_INFO,
  REMITTANCE_PROOF,
  ACCOUNT_RESPONSE_TYPE,
  TRANSACTION_ACTIVITIES_TYPE
} from './fragment';

export const GET_TRANSACTIONS = gql`
  ${PAGE_INFO}
  ${TRANSACTION_REMITTANCE_FIELDS}
  query GetTransactions(
    $accountId: Int
    $after: String
    $bankAccountName: String
    $bankAccountNumber: String
    $before: String
    $first: Int
    $last: Int
    $offset: Int
    $orderBy: String
    $paymentMethod: ID
    $side: TransactionTransactionActivitiesSideChoices
    $transactionId: String
    $transactionStatusCode: ID
  ) {
    transactions(
      accountId: $accountId
      after: $after
      bankAccountName: $bankAccountName
      bankAccountNumber: $bankAccountNumber
      before: $before
      first: $first
      last: $last
      offset: $offset
      orderBy: $orderBy
      paymentMethod: $paymentMethod
      side: $side
      transactionId: $transactionId
      transactionStatusCode: $transactionStatusCode
    ) {
      pageInfo {
        ...pageInfoFields
      }
      edges {
        cursor
        node {
          accountId
          bankAccountCode
          bankAccountCode
          bankAccountName
          bankAccountNumber
          notes
          customerReference
          deletedAt
          exchangeRate
          finishTime
          hkdAmount
          id
          isDeleted
          isNewDeposit
          isRefunded
          journalId
          journalTime
          paymentId
          paymentTime
          recipientAccountName
          recipientAccountCode
          recipientAccountNumber
          rejectedTime
          sendbackTime
          side
          transactionId
          transactionStatusCode {
            id
            statusCode
            statusColor
            statusName
            statusPoint
            description
            side
          }
          transactionRemittances {
            ...transactionRemittanceFields
          }
          usdAmount
          updated
          created
          userType
          accountName
          accountNumber
          accountBankCode
        }
      }
    }
  }
`;

export const GET_TRANSACTION_NODE = gql`
  ${TRANSACTION_REMITTANCE_FIELDS}
  query GetTransactionNode($id: ID!) {
    transactionNode(id: $id) {
      accountId
      bankAccountCode
      bankAccountName
      bankAccountNumber
      created
      customerReference
      deletedAt
      exchangeRate
      finishTime
      hkdAmount
      id
      isDeleted
      isNewDeposit
      journalId
      journalTime
      paymentId
      paymentTime
      recipientAccountName
      recipientAccountCode
      recipientAccountNumber
      rejectedTime
      sendbackTime
      side
      transactionId
      transactionRemittances {
        ...transactionRemittanceFields
      }
      updated
      usdAmount
      accountName
      accountNumber
      accountBankCode
    }
  }
`;

export const GET_REMITTANCES = gql`
  ${REMITTANCE_PROOF}
  ${TRANSACTION_ACTIVITIES_TYPE}
  query GetRemittances(
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
    $accountId: Int
    $accountNumber: String
    $accountStatus: TransactionTransactionRemittanceAccountStatusChoices
    $fundType: TransactionTransactionRemittanceFundTypeChoices
    $transactionActivityId: ID
    $orderBy: String
  ) {
    remittances(
      offset: $offset
      before: $before
      after: $after
      first: $first
      last: $last
      accountId: $accountId
      accountNumber: $accountNumber
      accountStatus: $accountStatus
      fundType: $fundType
      transactionActivityId: $transactionActivityId
      orderBy: $orderBy
    ) {
      pageInfo {
        ...pageInfoFields
      }
      edges {
        cursor
        node {
          id
          accountId
          accountName
          accountNumber
          accountStatus
          bankCode
          askloraRequestId
          ledgerRequestId
          fundType
          inputtedAmount
          remittanceProofs {
            ...remittanceProofFields
          }
          transactionActivity {
            ...transactionActivitiesTypeFields
          }
          approvedAdmins {
            admin1 {
              date
              name
              email
              username
            }
            admin2 {
              date
              name
              email
              username
            }
          }
          remittanceId
          notes
          status
          updated
          created
        }
      }
    }
  }
`;

export const GET_REMITTANCE = gql`
  ${REMITTANCE_PROOF}
  ${TRANSACTION_ACTIVITIES_TYPE}
  query GetRemittance($id: ID!) {
    remittanceNode(id: $id) {
      id
      accountId
      accountName
      accountNumber
      accountStatus
      bankCode
      askloraRequestId
      ledgerRequestId
      fundType
      inputtedAmount
      remittanceProofs {
        ...remittanceProofFields
      }
      transactionActivity {
        ...transactionActivitiesTypeFields
      }
      approvedAdmins {
        admin1 {
          date
          name
          email
          username
        }
        admin2 {
          date
          name
          email
          username
        }
      }
      remittanceId
      notes
      status
      updated
      created
    }
  }
`;

export const GET_HKD_ENQUIRY = gql`
  ${ACCOUNT_RESPONSE_TYPE}
  query GetHkdEnquiry {
    hkdEnquiry {
      accountBalResponse {
        accountNo
        accountCcy
        halfDayHold
        oneDayHold
        twoDaysHold
        clsLedgerBal
        clsAvailableBal
        businessDate
        enqStatus
        accountName
        accountBalResponseDtl {
          ...accountResponseTypeFields
        }
      }
    }
  }
`;

export const GET_MULTI_CURRENCY_ENQUIRY = gql`
  ${ACCOUNT_RESPONSE_TYPE}
  query GetMultiCurrencyEnquiry {
    multiCcyEnquiry {
      accountBalResponse {
        accountNo
        accountCcy
        halfDayHold
        oneDayHold
        twoDaysHold
        clsLedgerBal
        clsAvailableBal
        businessDate
        enqStatus
        accountName
        accountBalResponseDtl {
          ...accountResponseTypeFields
        }
      }
    }
  }
`;

export const GET_TRANSACTION_STATUSES = gql`
  query GetTransactionStatuses {
    transactionStatuses {
      id
      statusCode
      statusColor
      statusName
      statusPoint
      description
      side
    }
  }
`;

export const GET_BANKS = gql`
  query GetBanks {
    banks {
      id
      clearingCode
      bankName
      chineseName
      swiftBic
    }
  }
`;

export const GET_UNMATCHED_TRANSACTIONS = gql`
  ${PAGE_INFO}
  ${TRANSACTION_ACTIVITIES_TYPE}
  query GetUnmatchedTransactions(
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
    $bankAccountNumber: String
    $hkdAmount: Float
    $orderBy: String
  ) {
    unmatchedTransactions(
      offset: $offset
      before: $before
      after: $after
      first: $first
      last: $last
      bankAccountNumber: $bankAccountNumber
      hkdAmount: $hkdAmount
      orderBy: $orderBy
    ) {
      pageInfo {
        ...pageInfoFields
      }
      edges {
        cursor
        node {
          ...transactionActivitiesTypeFields
        }
      }
    }
  }
`;

export const GET_FIRM_BALANCE = gql`
  query GetFirmBalance {
    firmBalance {
      cash
      cashWithdrawable
      cashTransferable
      accruedFees
      pendingTransferOut
      pendingTransferIn
    }
  }
`;

export const GET_EXCHANGE_RATE = gql`
  query GetExchangeRate {
    exchangeRate {
      deposit {
        id
        computedRate
        rate
        spread
        url
        headers
        path
      }
      withdrawal {
        id
        computedRate
        rate
        spread
        url
        headers
        path
      }
    }
  }
`;

export const GET_ALL_EXCHANGE_RATES = gql`
  query getAllExchangeRates {
    allExchangeRates {
      id
      created
      updated
      fxType
      name
      isActive
      objectId
      configuration {
        id
        computedRate
        rate
        spread
        url
        headers
        path
      }
    }
  }
`;

export const GET_QUEUE = gql`
  query getQueue {
    queue {
      status
      action
    }
  }
`;

export const GET_ACCOUNTS = gql`
  query getAccounts {
    accounts {
      id
      email
      username
      tradeStatus
      dateJoined
      lastLogin
      isActive
      fullName
      status
    }
  }
`;

export const GET_ACCOUNT_COMMENT = gql`
  query getAccountComment($accountId: Int) {
    accountComment(accountId: $accountId) {
      id
      accountId
      comment
      noteType
      noteStatus
      extraField
      created
      updated
      isDeleted
      deletedAt
      user {
        name
        email
        username
      }
    }
  }
`;

export const GET_ACCOUNT_CHECKLIST = gql`
  query getAccountChecklist($userId: Int) {
    accountChecklist(userId: $userId) {
      userId
      legalName
      gender
      dob
      idNumber
      address
      occupation
      riskInfo
    }
  }
`;

export const GET_PPI_ACCOUNT_BY_ID = gql`
  query getPpiAccountById($accountId: String) {
    ppiAccountById(accountId: $accountId) {
      name
      accountId
      deviceId
      snapshots {
        privacy
        openness
        neuroticism
        investmentStyle
        conscientiousness
        extrovert
        currentQuestionId
        objective
        maxRiskScore
        suitability
      }
    }
  }
`;

export const GET_KYC_REPORTS_BY_ID = gql`
  query getKycReportsById($userId: ID!) {
    kycReportsById(userId: $userId) {
      checkId
      checkDate
      applicant {
        uid
        applicantId
        created
        updated
      }
      status
      result
      resultUriDashboard
      resultUriApi
      reportIds
    }
  }
`;

export const GET_ACCOUNT_DETAIL = gql`
  query getAccountDetail($accountId: Int) {
    accountWithDetailsById(accountId: $accountId) {
      account {
        ...accountType
      }
      bankAccount {
        ...bankAccount
      }
      onfidoInfo {
        ...userOnfidoKyc
      }
      personalInfo {
        ...personalInfoType
      }
      employmentInfo {
        ...employmentInfoType
      }
      tradingAccount {
        ...tradingAccountType
      }
      sourceOfWealth {
        ...sourceOfWealthType
      }
      residenceInfo {
        ...residenceInfoType
      }
      proofOfAddressFile {
        proofFile
      }
      loraAccount {
        ...loraAccount
      }
    }
  }
`;

export const GET_PPI_ANSWERS = gql`
  query getPpiAnswers($accountId: String) {
    ppiAnswers(accountId: $accountId) {
      name
      score
      answer
      question {
        questionId
        questionType
        hints
        hintsZh
        section
        question
        questionZh
      }
    }
  }
`;

export const GET_PPI_ANSWERS_DETAIL = gql`
  query getPpiAnswersDetail($accountId: String) {
    ppiAnswersDetail(accountId: $accountId) {
      detail {
        id
        created
        updated
      }
      answer {
        name
        score
        answer
        question {
          questionId
          questionType
          hints
          hintsZh
          section
          question
          questionZh
        }
      }
    }
  }
`;
