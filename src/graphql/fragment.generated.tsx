import * as Types from './generated/types';

import { gql } from '@apollo/client';
export type TransactionRemittanceFieldsFragment = { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, remittanceId?: string | null, notes?: string | null, created: any, updated: any, transactionActivity?: { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, created: any, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountCode?: string | null, recipientAccountName?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, updated: any, usdAmount?: number | null, userType?: string | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null } | null } | null, transactionStatusCode?: { __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null } | null, remittanceProofs: Array<{ __typename?: 'RemittanceDataType', id: string, proofFile?: string | null, created: any, updated: any }>, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null } | null };

export type PageInfoFieldsFragment = { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null };

export type RemittanceProofFieldsFragment = { __typename?: 'RemittanceDataType', id: string, proofFile?: string | null, created: any, updated: any };

export type AccountResponseTypeFieldsFragment = { __typename?: 'EnquiryBalanceDetailType', accountNo?: string | null, accountCcy?: string | null, halfDayHold?: string | null, oneDayHold?: string | null, twoDaysHold?: string | null, clsLedgerBal?: string | null, clsAvailableBal?: string | null };

export type TransactionActivitiesTypeFieldsFragment = { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, created: any, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountCode?: string | null, recipientAccountName?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, updated: any, usdAmount?: number | null, userType?: string | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null } | null } | null, transactionStatusCode?: { __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null };

export type AccountTypeFragment = { __typename?: 'AccountType', id: number, email: string, username: string, tradeStatus: boolean, dateJoined?: any | null, lastLogin?: any | null, isActive: boolean, fullName?: string | null, status?: string | null };

export type PersonalInfoTypeFragment = { __typename?: 'PersonalInfoType', id: string, firstName: string, lastName: string, gender?: any | null, hkidNumber: string, nationality: string, dateOfBirth?: any | null, phoneCountryCode: string, phoneNumber: string, countryOfBirth: string };

export type EmploymentInfoTypeFragment = { __typename?: 'EmploymentInfoType', id: string, postalCode?: string | null, city?: string | null, country?: string | null, employmentStatus?: any | null, employerBusiness?: string | null, employerBusinessDescription?: string | null, occupation?: string | null, employer?: string | null, employerAddressLine1?: string | null, employerAddressLine2?: string | null, district?: string | null, region?: string | null, differentCountryReason?: string | null };

export type TradingAccountTypeFragment = { __typename?: 'TradingAccountType', uid: string, tradingAccountId?: string | null, tradingAccountType: Types.AskloraTradingAccountTradingAccountTypeChoices, currentStatus?: any | null, kycStatus?: any | null };

export type SourceOfWealthTypeFragment = { __typename?: 'SourceOfWealthType', wealthSource: string, otherWealth?: string | null, percentage: number };

export type ResidenceInfoTypeFragment = { __typename?: 'ResidenceInfoType', addressLine1: string, addressLine2?: string | null, city?: string | null, district: string, region: string, country?: string | null, postalCode?: string | null };

export type UserOnfidoKycFragment = { __typename?: 'OnfidoKycUserType', uid: string, applicantId?: string | null, created: any, updated: any, kycCheckResult: Array<{ __typename?: 'OnfidoKycReportType', checkId: string, checkDate?: any | null, status?: any | null, result?: any | null, resultUriDashboard?: string | null, resultUriApi?: string | null, reportIds: Array<string> }> };

export type LoraAccountFragment = { __typename?: 'LoraAccountType', id: string, created: any, updated: any, accountId: number, activeSince?: any | null, finalApprovalGiven?: any | null, dateSuspended?: any | null, dateRejected?: any | null, loraStatus: Types.AccountLoraAccountLoraStatusChoices, usResident: boolean, hkResident: boolean, ibUserId?: string | null, ibStatus?: Types.BrokerAccountStatus | null, approvedBy?: { __typename?: 'UserType', lastLogin?: any | null, name?: string | null, email: string, username: string, dateJoined: any, adminComment: Array<{ __typename?: 'AccountCommentType', comment: string, created: any, updated: any }> } | null, history?: Array<{ __typename?: 'LoraHistoricalType', createdAt?: any | null, updatedAt?: any | null, loraStatus?: string | null } | null> | null };

export type BankAccountFragment = { __typename?: 'BankAccountType', created: any, updated: any, country?: string | null, stateProvince?: string | null, postalCode?: string | null, city?: string | null, streetAddress?: string | null, name?: string | null, bankId?: string | null, bankCode?: string | null, accountNumber?: string | null, accountName?: string | null };

export const TransactionActivitiesTypeFieldsFragmentDoc = gql`
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
export const RemittanceProofFieldsFragmentDoc = gql`
    fragment remittanceProofFields on RemittanceDataType {
  id
  proofFile
  created
  updated
}
    `;
export const TransactionRemittanceFieldsFragmentDoc = gql`
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
    ${TransactionActivitiesTypeFieldsFragmentDoc}
${RemittanceProofFieldsFragmentDoc}`;
export const PageInfoFieldsFragmentDoc = gql`
    fragment pageInfoFields on PageInfo {
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
}
    `;
export const AccountResponseTypeFieldsFragmentDoc = gql`
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
export const AccountTypeFragmentDoc = gql`
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
export const PersonalInfoTypeFragmentDoc = gql`
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
export const EmploymentInfoTypeFragmentDoc = gql`
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
export const TradingAccountTypeFragmentDoc = gql`
    fragment tradingAccountType on TradingAccountType {
  uid
  tradingAccountId
  tradingAccountType
  currentStatus
  kycStatus
}
    `;
export const SourceOfWealthTypeFragmentDoc = gql`
    fragment sourceOfWealthType on SourceOfWealthType {
  wealthSource
  otherWealth
  percentage
}
    `;
export const ResidenceInfoTypeFragmentDoc = gql`
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
export const UserOnfidoKycFragmentDoc = gql`
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
export const LoraAccountFragmentDoc = gql`
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
export const BankAccountFragmentDoc = gql`
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