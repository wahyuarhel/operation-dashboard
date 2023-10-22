import { gql } from '@apollo/client';

export const TRANSACTION_REMITTANCE_FIELDS = gql`
  fragment transactionRemittanceFields on RemittanceType {
    id
    accountId
    accountNumber
    accountStatus
    askloraRequestId
    fundType
    inputtedAmount
    ledgerRequestId
    remittanceId
    notes
    transactionActivity {
      ...transactionActivitiesTypeFields
    }
    remittanceProofs {
      ...remittanceProofFields
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
    created
    updated
  }
`;

export const PAGE_INFO = gql`
  fragment pageInfoFields on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;

export const REMITTANCE_PROOF = gql`
  fragment remittanceProofFields on RemittanceDataType {
    id
    proofFile
    created
    updated
  }
`;

export const ACCOUNT_RESPONSE_TYPE = gql`
  fragment accountResponseTypeFields on EnquiryBalanceDetailType {
    accountNo
    accountCcy
    halfDayHold
    oneDayHold
    twoDaysHold
    clsLedgerBal
    clsAvailableBal
  }
`;

export const TRANSACTION_ACTIVITIES_TYPE = gql`
  fragment transactionActivitiesTypeFields on TransactionActivitiesType {
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
    recipientAccountCode
    recipientAccountName
    recipientAccountNumber
    rejectedTime
    sendbackTime
    side
    transactionId
    transactionRemittances {
      id
      accountId
      accountNumber
      accountStatus
      askloraRequestId
      fundType
      inputtedAmount
      ledgerRequestId
      approvedAdmins {
        admin1 {
          date
          name
          username
          email
        }
        admin2 {
          date
          name
          username
          email
        }
      }
    }
    transactionStatusCode {
      id
      statusCode
      statusColor
      statusName
      statusPoint
      description
      side
    }
    updated
    usdAmount
    userType
    accountName
    accountNumber
    accountBankCode
  }
`;

export const ACCOUNT_TYPE = gql`
  fragment accountType on AccountType {
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
`;

export const PERSONAL_INFO_TYPE = gql`
  fragment personalInfoType on PersonalInfoType {
    id
    firstName
    lastName
    gender
    hkidNumber
    nationality
    dateOfBirth
    phoneCountryCode
    phoneNumber
    countryOfBirth
  }
`;

export const EMPLOYMENT_INFO_TYPE = gql`
  fragment employmentInfoType on EmploymentInfoType {
    id
    postalCode
    city
    country
    employmentStatus
    employerBusiness
    employerBusinessDescription
    occupation
    employer
    employerAddressLine1
    employerAddressLine2
    district
    region
    differentCountryReason
  }
`;

export const TRADING_ACCOUNT_TYPE = gql`
  fragment tradingAccountType on TradingAccountType {
    uid
    tradingAccountId
    tradingAccountType
    currentStatus
    kycStatus
  }
`;

export const SOURCE_OF_WEALTH_TYPE = gql`
  fragment sourceOfWealthType on SourceOfWealthType {
    wealthSource
    otherWealth
    percentage
  }
`;

export const RESIDENCE_INFO_TYPE = gql`
  fragment residenceInfoType on ResidenceInfoType {
    addressLine1
    addressLine2
    city
    district
    region
    country
    postalCode
  }
`;

export const ONFIDO_KYC_USER_TYPE = gql`
  fragment userOnfidoKyc on OnfidoKycUserType {
    uid
    applicantId
    created
    updated
    kycCheckResult {
      checkId
      checkDate
      status
      result
      resultUriDashboard
      resultUriApi
      reportIds
    }
  }
`;

export const LORA_ACCOUNT_TYPE = gql`
  fragment loraAccount on LoraAccountType {
    id
    created
    updated
    accountId
    activeSince
    finalApprovalGiven
    dateSuspended
    dateRejected
    loraStatus
    usResident
    hkResident
    ibUserId
    ibStatus
    approvedBy {
      lastLogin
      name
      email
      username
      dateJoined
      adminComment {
        comment
        created
        updated
      }
    }
    history {
      createdAt
      updatedAt
      loraStatus
    }
  }
`;

export const BANK_ACCOUNT_TYPE = gql`
  fragment bankAccount on BankAccountType {
    created
    updated
    country
    stateProvince
    postalCode
    city
    streetAddress
    name
    bankId
    bankCode
    accountNumber
    accountName
  }
`;
