import * as Types from './generated/types';

import { gql } from '@apollo/client';
import { PageInfoFieldsFragmentDoc, TransactionRemittanceFieldsFragmentDoc, RemittanceProofFieldsFragmentDoc, TransactionActivitiesTypeFieldsFragmentDoc } from './fragment.generated';
import { AccountResponseTypeFieldsFragmentDoc } from './fragment.generated';
import { AccountTypeFragmentDoc, BankAccountFragmentDoc, UserOnfidoKycFragmentDoc, PersonalInfoTypeFragmentDoc, EmploymentInfoTypeFragmentDoc, TradingAccountTypeFragmentDoc, SourceOfWealthTypeFragmentDoc, ResidenceInfoTypeFragmentDoc, LoraAccountFragmentDoc } from './fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTransactionsQueryVariables = Types.Exact<{
  accountId?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  bankAccountName?: Types.InputMaybe<Types.Scalars['String']>;
  bankAccountNumber?: Types.InputMaybe<Types.Scalars['String']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.Scalars['String']>;
  paymentMethod?: Types.InputMaybe<Types.Scalars['ID']>;
  side?: Types.InputMaybe<Types.TransactionTransactionActivitiesSideChoices>;
  transactionId?: Types.InputMaybe<Types.Scalars['String']>;
  transactionStatusCode?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', transactions?: { __typename?: 'TransactionActivitiesTypeConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null }, edges: Array<{ __typename?: 'TransactionActivitiesTypeEdge', cursor: string, node?: { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, notes?: string | null, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, isRefunded?: boolean | null, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountName?: string | null, recipientAccountCode?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, usdAmount?: number | null, updated: any, created: any, userType?: string | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionStatusCode?: { __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, remittanceId?: string | null, notes?: string | null, created: any, updated: any, transactionActivity?: { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, created: any, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountCode?: string | null, recipientAccountName?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, updated: any, usdAmount?: number | null, userType?: string | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null } | null } | null, transactionStatusCode?: { __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null } | null, remittanceProofs: Array<{ __typename?: 'RemittanceDataType', id: string, proofFile?: string | null, created: any, updated: any }>, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null } | null } | null } | null } | null> } | null };

export type GetTransactionNodeQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetTransactionNodeQuery = { __typename?: 'Query', transactionNode?: { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, created: any, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountName?: string | null, recipientAccountCode?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, updated: any, usdAmount?: number | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, remittanceId?: string | null, notes?: string | null, created: any, updated: any, transactionActivity?: { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, created: any, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountCode?: string | null, recipientAccountName?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, updated: any, usdAmount?: number | null, userType?: string | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null } | null } | null, transactionStatusCode?: { __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null } | null, remittanceProofs: Array<{ __typename?: 'RemittanceDataType', id: string, proofFile?: string | null, created: any, updated: any }>, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null } | null } | null } | null };

export type GetRemittancesQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  accountId?: Types.InputMaybe<Types.Scalars['Int']>;
  accountNumber?: Types.InputMaybe<Types.Scalars['String']>;
  accountStatus?: Types.InputMaybe<Types.TransactionTransactionRemittanceAccountStatusChoices>;
  fundType?: Types.InputMaybe<Types.TransactionTransactionRemittanceFundTypeChoices>;
  transactionActivityId?: Types.InputMaybe<Types.Scalars['ID']>;
  orderBy?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetRemittancesQuery = { __typename?: 'Query', remittances?: { __typename?: 'RemittanceTypeConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null }, edges: Array<{ __typename?: 'RemittanceTypeEdge', cursor: string, node?: { __typename?: 'RemittanceType', id: string, accountId: number, accountName?: string | null, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, bankCode?: string | null, askloraRequestId?: string | null, ledgerRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, remittanceId?: string | null, notes?: string | null, status: Types.TransactionTransactionRemittanceStatusChoices, updated: any, created: any, remittanceProofs: Array<{ __typename?: 'RemittanceDataType', id: string, proofFile?: string | null, created: any, updated: any }>, transactionActivity?: { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, created: any, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountCode?: string | null, recipientAccountName?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, updated: any, usdAmount?: number | null, userType?: string | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null } | null } | null, transactionStatusCode?: { __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null } | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null } | null } | null } | null> } | null };

export type GetRemittanceQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetRemittanceQuery = { __typename?: 'Query', remittanceNode?: { __typename?: 'RemittanceType', id: string, accountId: number, accountName?: string | null, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, bankCode?: string | null, askloraRequestId?: string | null, ledgerRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, remittanceId?: string | null, notes?: string | null, status: Types.TransactionTransactionRemittanceStatusChoices, updated: any, created: any, remittanceProofs: Array<{ __typename?: 'RemittanceDataType', id: string, proofFile?: string | null, created: any, updated: any }>, transactionActivity?: { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, created: any, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountCode?: string | null, recipientAccountName?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, updated: any, usdAmount?: number | null, userType?: string | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null } | null } | null, transactionStatusCode?: { __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null } | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, email?: string | null, username?: string | null } | null } | null } | null };

export type GetHkdEnquiryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetHkdEnquiryQuery = { __typename?: 'Query', hkdEnquiry?: { __typename?: 'HkdEnquiryBalanceType', accountBalResponse: { __typename?: 'AccountResponseType', accountNo?: string | null, accountCcy?: string | null, halfDayHold?: string | null, oneDayHold?: string | null, twoDaysHold?: string | null, clsLedgerBal?: string | null, clsAvailableBal?: string | null, businessDate?: string | null, enqStatus: string, accountName: string, accountBalResponseDtl?: Array<{ __typename?: 'EnquiryBalanceDetailType', accountNo?: string | null, accountCcy?: string | null, halfDayHold?: string | null, oneDayHold?: string | null, twoDaysHold?: string | null, clsLedgerBal?: string | null, clsAvailableBal?: string | null } | null> | null } } | null };

export type GetMultiCurrencyEnquiryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMultiCurrencyEnquiryQuery = { __typename?: 'Query', multiCcyEnquiry?: { __typename?: 'MultiEnquiryBalanceType', accountBalResponse: { __typename?: 'AccountResponseType', accountNo?: string | null, accountCcy?: string | null, halfDayHold?: string | null, oneDayHold?: string | null, twoDaysHold?: string | null, clsLedgerBal?: string | null, clsAvailableBal?: string | null, businessDate?: string | null, enqStatus: string, accountName: string, accountBalResponseDtl?: Array<{ __typename?: 'EnquiryBalanceDetailType', accountNo?: string | null, accountCcy?: string | null, halfDayHold?: string | null, oneDayHold?: string | null, twoDaysHold?: string | null, clsLedgerBal?: string | null, clsAvailableBal?: string | null } | null> | null } } | null };

export type GetTransactionStatusesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTransactionStatusesQuery = { __typename?: 'Query', transactionStatuses?: Array<{ __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null> | null };

export type GetBanksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBanksQuery = { __typename?: 'Query', banks?: Array<{ __typename?: 'BankType', id: string, clearingCode?: string | null, bankName?: string | null, chineseName?: string | null, swiftBic?: string | null } | null> | null };

export type GetUnmatchedTransactionsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  bankAccountNumber?: Types.InputMaybe<Types.Scalars['String']>;
  hkdAmount?: Types.InputMaybe<Types.Scalars['Float']>;
  orderBy?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetUnmatchedTransactionsQuery = { __typename?: 'Query', unmatchedTransactions?: { __typename?: 'TransactionActivitiesTypeConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null }, edges: Array<{ __typename?: 'TransactionActivitiesTypeEdge', cursor: string, node?: { __typename?: 'TransactionActivitiesType', accountId?: number | null, bankAccountCode?: string | null, bankAccountName?: string | null, bankAccountNumber?: string | null, created: any, customerReference?: string | null, deletedAt?: any | null, exchangeRate?: any | null, finishTime?: any | null, hkdAmount?: number | null, id: string, isDeleted: boolean, isNewDeposit: boolean, journalId?: string | null, journalTime?: any | null, paymentId?: string | null, paymentTime?: any | null, recipientAccountCode?: string | null, recipientAccountName?: string | null, recipientAccountNumber?: string | null, rejectedTime?: any | null, sendbackTime?: any | null, side: Types.TransactionTransactionActivitiesSideChoices, transactionId: string, updated: any, usdAmount?: number | null, userType?: string | null, accountName?: string | null, accountNumber?: string | null, accountBankCode?: string | null, transactionRemittances?: { __typename?: 'RemittanceType', id: string, accountId: number, accountNumber?: string | null, accountStatus: Types.TransactionTransactionRemittanceAccountStatusChoices, askloraRequestId?: string | null, fundType: Types.TransactionTransactionRemittanceFundTypeChoices, inputtedAmount: any, ledgerRequestId?: string | null, approvedAdmins?: { __typename?: 'UserApprovalType', admin1?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null, admin2?: { __typename?: 'UserApprovalItemType', date?: any | null, name?: string | null, username?: string | null, email?: string | null } | null } | null } | null, transactionStatusCode?: { __typename?: 'TransactionStatusCodeType', id: string, statusCode: number, statusColor?: string | null, statusName?: string | null, statusPoint: Types.TransactionTransactionStatusCodeStatusPointChoices, description?: string | null, side: Types.TransactionTransactionStatusCodeSideChoices } | null } | null } | null> } | null };

export type GetFirmBalanceQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFirmBalanceQuery = { __typename?: 'Query', firmBalance?: { __typename?: 'EnquiryBalanceAlpacaType', cash: string, cashWithdrawable: string, cashTransferable: string, accruedFees: string, pendingTransferOut: string, pendingTransferIn: string } | null };

export type GetExchangeRateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetExchangeRateQuery = { __typename?: 'Query', exchangeRate?: { __typename?: 'ExchangeRateType', deposit?: { __typename?: 'ExchangeRateDataType', id?: number | null, computedRate?: any | null, rate?: any | null, spread?: number | null, url?: string | null, headers?: string | null, path?: Array<string | null> | null } | null, withdrawal?: { __typename?: 'ExchangeRateDataType', id?: number | null, computedRate?: any | null, rate?: any | null, spread?: number | null, url?: string | null, headers?: string | null, path?: Array<string | null> | null } | null } | null };

export type GetAllExchangeRatesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllExchangeRatesQuery = { __typename?: 'Query', allExchangeRates?: Array<{ __typename?: 'ConversionRateType', id: string, created: any, updated: any, fxType: Types.TransactionConversionRateFxTypeChoices, name?: string | null, isActive: boolean, objectId: number, configuration?: { __typename?: 'ExchangeRateDataType', id?: number | null, computedRate?: any | null, rate?: any | null, spread?: number | null, url?: string | null, headers?: string | null, path?: Array<string | null> | null } | null } | null> | null };

export type GetQueueQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetQueueQuery = { __typename?: 'Query', queue?: { __typename?: 'QueueType', status?: Types.QueueStatusEnum | null, action?: string | null } | null };

export type GetAccountsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAccountsQuery = { __typename?: 'Query', accounts?: Array<{ __typename?: 'AccountType', id: number, email: string, username: string, tradeStatus: boolean, dateJoined?: any | null, lastLogin?: any | null, isActive: boolean, fullName?: string | null, status?: string | null } | null> | null };

export type GetAccountCommentQueryVariables = Types.Exact<{
  accountId?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetAccountCommentQuery = { __typename?: 'Query', accountComment?: Array<{ __typename?: 'AccountCommentType', id: string, accountId: number, comment: string, noteType: Types.AccountAccountCommentNoteTypeChoices, noteStatus: Types.AccountAccountCommentNoteStatusChoices, extraField?: any | null, created: any, updated: any, isDeleted: boolean, deletedAt?: any | null, user?: { __typename?: 'UserType', name?: string | null, email: string, username: string } | null } | null> | null };

export type GetAccountChecklistQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetAccountChecklistQuery = { __typename?: 'Query', accountChecklist?: { __typename?: 'AccountChecklistType', userId: number, legalName: boolean, gender: boolean, dob: boolean, idNumber: boolean, address: boolean, occupation: boolean, riskInfo: boolean } | null };

export type GetPpiAccountByIdQueryVariables = Types.Exact<{
  accountId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetPpiAccountByIdQuery = { __typename?: 'Query', ppiAccountById?: { __typename?: 'AccountPPIType', name: string, accountId: string, deviceId?: string | null, snapshots?: { __typename?: 'UserSnapshotType', privacy: number, openness: number, neuroticism: number, investmentStyle: number, conscientiousness: number, extrovert: number, currentQuestionId?: string | null, objective: number, maxRiskScore: number, suitability: number } | null } | null };

export type GetKycReportsByIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
}>;


export type GetKycReportsByIdQuery = { __typename?: 'Query', kycReportsById?: Array<{ __typename?: 'OnfidoKycReportType', checkId: string, checkDate?: any | null, status?: any | null, result?: any | null, resultUriDashboard?: string | null, resultUriApi?: string | null, reportIds: Array<string>, applicant: { __typename?: 'OnfidoKycUserType', uid: string, applicantId?: string | null, created: any, updated: any } } | null> | null };

export type GetAccountDetailQueryVariables = Types.Exact<{
  accountId?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetAccountDetailQuery = { __typename?: 'Query', accountWithDetailsById?: { __typename?: 'AccountWithDetailType', account?: { __typename?: 'AccountType', id: number, email: string, username: string, tradeStatus: boolean, dateJoined?: any | null, lastLogin?: any | null, isActive: boolean, fullName?: string | null, status?: string | null } | null, bankAccount?: { __typename?: 'BankAccountType', created: any, updated: any, country?: string | null, stateProvince?: string | null, postalCode?: string | null, city?: string | null, streetAddress?: string | null, name?: string | null, bankId?: string | null, bankCode?: string | null, accountNumber?: string | null, accountName?: string | null } | null, onfidoInfo?: { __typename?: 'OnfidoKycUserType', uid: string, applicantId?: string | null, created: any, updated: any, kycCheckResult: Array<{ __typename?: 'OnfidoKycReportType', checkId: string, checkDate?: any | null, status?: any | null, result?: any | null, resultUriDashboard?: string | null, resultUriApi?: string | null, reportIds: Array<string> }> } | null, personalInfo?: { __typename?: 'PersonalInfoType', id: string, firstName: string, lastName: string, gender?: any | null, hkidNumber: string, nationality: string, dateOfBirth?: any | null, phoneCountryCode: string, phoneNumber: string, countryOfBirth: string } | null, employmentInfo?: { __typename?: 'EmploymentInfoType', id: string, postalCode?: string | null, city?: string | null, country?: string | null, employmentStatus?: any | null, employerBusiness?: string | null, employerBusinessDescription?: string | null, occupation?: string | null, employer?: string | null, employerAddressLine1?: string | null, employerAddressLine2?: string | null, district?: string | null, region?: string | null, differentCountryReason?: string | null } | null, tradingAccount?: { __typename?: 'TradingAccountType', uid: string, tradingAccountId?: string | null, tradingAccountType: Types.AskloraTradingAccountTradingAccountTypeChoices, currentStatus?: any | null, kycStatus?: any | null } | null, sourceOfWealth?: Array<{ __typename?: 'SourceOfWealthType', wealthSource: string, otherWealth?: string | null, percentage: number } | null> | null, residenceInfo?: { __typename?: 'ResidenceInfoType', addressLine1: string, addressLine2?: string | null, city?: string | null, district: string, region: string, country?: string | null, postalCode?: string | null } | null, proofOfAddressFile?: Array<{ __typename?: 'ProofOfAddressFileType', proofFile?: string | null } | null> | null, loraAccount?: { __typename?: 'LoraAccountType', id: string, created: any, updated: any, accountId: number, activeSince?: any | null, finalApprovalGiven?: any | null, dateSuspended?: any | null, dateRejected?: any | null, loraStatus: Types.AccountLoraAccountLoraStatusChoices, usResident: boolean, hkResident: boolean, ibUserId?: string | null, ibStatus?: Types.BrokerAccountStatus | null, approvedBy?: { __typename?: 'UserType', lastLogin?: any | null, name?: string | null, email: string, username: string, dateJoined: any, adminComment: Array<{ __typename?: 'AccountCommentType', comment: string, created: any, updated: any }> } | null, history?: Array<{ __typename?: 'LoraHistoricalType', createdAt?: any | null, updatedAt?: any | null, loraStatus?: string | null } | null> | null } | null } | null };

export type GetPpiAnswersQueryVariables = Types.Exact<{
  accountId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetPpiAnswersQuery = { __typename?: 'Query', ppiAnswers?: Array<{ __typename?: 'AnswerType', name?: string | null, score?: string | null, answer?: string | null, question?: { __typename?: 'QuestionType', questionId?: string | null, questionType: Types.PpiQuestionQuestionTypeChoices, hints?: string | null, hintsZh?: string | null, section: Types.PpiQuestionSectionChoices, question: string, questionZh?: string | null } | null } | null> | null };

export type GetPpiAnswersDetailQueryVariables = Types.Exact<{
  accountId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetPpiAnswersDetailQuery = { __typename?: 'Query', ppiAnswersDetail?: Array<{ __typename?: 'UserAnswerDetailType', detail?: { __typename?: 'UserAnswerType', id: string, created: any, updated: any } | null, answer?: { __typename?: 'AnswerType', name?: string | null, score?: string | null, answer?: string | null, question?: { __typename?: 'QuestionType', questionId?: string | null, questionType: Types.PpiQuestionQuestionTypeChoices, hints?: string | null, hintsZh?: string | null, section: Types.PpiQuestionSectionChoices, question: string, questionZh?: string | null } | null } | null } | null> | null };


export const GetTransactionsDocument = gql`
    query GetTransactions($accountId: Int, $after: String, $bankAccountName: String, $bankAccountNumber: String, $before: String, $first: Int, $last: Int, $offset: Int, $orderBy: String, $paymentMethod: ID, $side: TransactionTransactionActivitiesSideChoices, $transactionId: String, $transactionStatusCode: ID) {
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
    ${PageInfoFieldsFragmentDoc}
${TransactionRemittanceFieldsFragmentDoc}`;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      after: // value for 'after'
 *      bankAccountName: // value for 'bankAccountName'
 *      bankAccountNumber: // value for 'bankAccountNumber'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      paymentMethod: // value for 'paymentMethod'
 *      side: // value for 'side'
 *      transactionId: // value for 'transactionId'
 *      transactionStatusCode: // value for 'transactionStatusCode'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetTransactionNodeDocument = gql`
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
    ${TransactionRemittanceFieldsFragmentDoc}`;

/**
 * __useGetTransactionNodeQuery__
 *
 * To run a query within a React component, call `useGetTransactionNodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionNodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionNodeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTransactionNodeQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionNodeQuery, GetTransactionNodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionNodeQuery, GetTransactionNodeQueryVariables>(GetTransactionNodeDocument, options);
      }
export function useGetTransactionNodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionNodeQuery, GetTransactionNodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionNodeQuery, GetTransactionNodeQueryVariables>(GetTransactionNodeDocument, options);
        }
export type GetTransactionNodeQueryHookResult = ReturnType<typeof useGetTransactionNodeQuery>;
export type GetTransactionNodeLazyQueryHookResult = ReturnType<typeof useGetTransactionNodeLazyQuery>;
export type GetTransactionNodeQueryResult = Apollo.QueryResult<GetTransactionNodeQuery, GetTransactionNodeQueryVariables>;
export const GetRemittancesDocument = gql`
    query GetRemittances($offset: Int, $before: String, $after: String, $first: Int, $last: Int, $accountId: Int, $accountNumber: String, $accountStatus: TransactionTransactionRemittanceAccountStatusChoices, $fundType: TransactionTransactionRemittanceFundTypeChoices, $transactionActivityId: ID, $orderBy: String) {
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
    ${PageInfoFieldsFragmentDoc}
${RemittanceProofFieldsFragmentDoc}
${TransactionActivitiesTypeFieldsFragmentDoc}`;

/**
 * __useGetRemittancesQuery__
 *
 * To run a query within a React component, call `useGetRemittancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRemittancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRemittancesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      accountId: // value for 'accountId'
 *      accountNumber: // value for 'accountNumber'
 *      accountStatus: // value for 'accountStatus'
 *      fundType: // value for 'fundType'
 *      transactionActivityId: // value for 'transactionActivityId'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetRemittancesQuery(baseOptions?: Apollo.QueryHookOptions<GetRemittancesQuery, GetRemittancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRemittancesQuery, GetRemittancesQueryVariables>(GetRemittancesDocument, options);
      }
export function useGetRemittancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRemittancesQuery, GetRemittancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRemittancesQuery, GetRemittancesQueryVariables>(GetRemittancesDocument, options);
        }
export type GetRemittancesQueryHookResult = ReturnType<typeof useGetRemittancesQuery>;
export type GetRemittancesLazyQueryHookResult = ReturnType<typeof useGetRemittancesLazyQuery>;
export type GetRemittancesQueryResult = Apollo.QueryResult<GetRemittancesQuery, GetRemittancesQueryVariables>;
export const GetRemittanceDocument = gql`
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
    ${RemittanceProofFieldsFragmentDoc}
${TransactionActivitiesTypeFieldsFragmentDoc}`;

/**
 * __useGetRemittanceQuery__
 *
 * To run a query within a React component, call `useGetRemittanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRemittanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRemittanceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRemittanceQuery(baseOptions: Apollo.QueryHookOptions<GetRemittanceQuery, GetRemittanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRemittanceQuery, GetRemittanceQueryVariables>(GetRemittanceDocument, options);
      }
export function useGetRemittanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRemittanceQuery, GetRemittanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRemittanceQuery, GetRemittanceQueryVariables>(GetRemittanceDocument, options);
        }
export type GetRemittanceQueryHookResult = ReturnType<typeof useGetRemittanceQuery>;
export type GetRemittanceLazyQueryHookResult = ReturnType<typeof useGetRemittanceLazyQuery>;
export type GetRemittanceQueryResult = Apollo.QueryResult<GetRemittanceQuery, GetRemittanceQueryVariables>;
export const GetHkdEnquiryDocument = gql`
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
    ${AccountResponseTypeFieldsFragmentDoc}`;

/**
 * __useGetHkdEnquiryQuery__
 *
 * To run a query within a React component, call `useGetHkdEnquiryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHkdEnquiryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHkdEnquiryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHkdEnquiryQuery(baseOptions?: Apollo.QueryHookOptions<GetHkdEnquiryQuery, GetHkdEnquiryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHkdEnquiryQuery, GetHkdEnquiryQueryVariables>(GetHkdEnquiryDocument, options);
      }
export function useGetHkdEnquiryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHkdEnquiryQuery, GetHkdEnquiryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHkdEnquiryQuery, GetHkdEnquiryQueryVariables>(GetHkdEnquiryDocument, options);
        }
export type GetHkdEnquiryQueryHookResult = ReturnType<typeof useGetHkdEnquiryQuery>;
export type GetHkdEnquiryLazyQueryHookResult = ReturnType<typeof useGetHkdEnquiryLazyQuery>;
export type GetHkdEnquiryQueryResult = Apollo.QueryResult<GetHkdEnquiryQuery, GetHkdEnquiryQueryVariables>;
export const GetMultiCurrencyEnquiryDocument = gql`
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
    ${AccountResponseTypeFieldsFragmentDoc}`;

/**
 * __useGetMultiCurrencyEnquiryQuery__
 *
 * To run a query within a React component, call `useGetMultiCurrencyEnquiryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMultiCurrencyEnquiryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMultiCurrencyEnquiryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMultiCurrencyEnquiryQuery(baseOptions?: Apollo.QueryHookOptions<GetMultiCurrencyEnquiryQuery, GetMultiCurrencyEnquiryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMultiCurrencyEnquiryQuery, GetMultiCurrencyEnquiryQueryVariables>(GetMultiCurrencyEnquiryDocument, options);
      }
export function useGetMultiCurrencyEnquiryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMultiCurrencyEnquiryQuery, GetMultiCurrencyEnquiryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMultiCurrencyEnquiryQuery, GetMultiCurrencyEnquiryQueryVariables>(GetMultiCurrencyEnquiryDocument, options);
        }
export type GetMultiCurrencyEnquiryQueryHookResult = ReturnType<typeof useGetMultiCurrencyEnquiryQuery>;
export type GetMultiCurrencyEnquiryLazyQueryHookResult = ReturnType<typeof useGetMultiCurrencyEnquiryLazyQuery>;
export type GetMultiCurrencyEnquiryQueryResult = Apollo.QueryResult<GetMultiCurrencyEnquiryQuery, GetMultiCurrencyEnquiryQueryVariables>;
export const GetTransactionStatusesDocument = gql`
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

/**
 * __useGetTransactionStatusesQuery__
 *
 * To run a query within a React component, call `useGetTransactionStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTransactionStatusesQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionStatusesQuery, GetTransactionStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionStatusesQuery, GetTransactionStatusesQueryVariables>(GetTransactionStatusesDocument, options);
      }
export function useGetTransactionStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionStatusesQuery, GetTransactionStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionStatusesQuery, GetTransactionStatusesQueryVariables>(GetTransactionStatusesDocument, options);
        }
export type GetTransactionStatusesQueryHookResult = ReturnType<typeof useGetTransactionStatusesQuery>;
export type GetTransactionStatusesLazyQueryHookResult = ReturnType<typeof useGetTransactionStatusesLazyQuery>;
export type GetTransactionStatusesQueryResult = Apollo.QueryResult<GetTransactionStatusesQuery, GetTransactionStatusesQueryVariables>;
export const GetBanksDocument = gql`
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

/**
 * __useGetBanksQuery__
 *
 * To run a query within a React component, call `useGetBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBanksQuery(baseOptions?: Apollo.QueryHookOptions<GetBanksQuery, GetBanksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBanksQuery, GetBanksQueryVariables>(GetBanksDocument, options);
      }
export function useGetBanksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBanksQuery, GetBanksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBanksQuery, GetBanksQueryVariables>(GetBanksDocument, options);
        }
export type GetBanksQueryHookResult = ReturnType<typeof useGetBanksQuery>;
export type GetBanksLazyQueryHookResult = ReturnType<typeof useGetBanksLazyQuery>;
export type GetBanksQueryResult = Apollo.QueryResult<GetBanksQuery, GetBanksQueryVariables>;
export const GetUnmatchedTransactionsDocument = gql`
    query GetUnmatchedTransactions($offset: Int, $before: String, $after: String, $first: Int, $last: Int, $bankAccountNumber: String, $hkdAmount: Float, $orderBy: String) {
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
    ${PageInfoFieldsFragmentDoc}
${TransactionActivitiesTypeFieldsFragmentDoc}`;

/**
 * __useGetUnmatchedTransactionsQuery__
 *
 * To run a query within a React component, call `useGetUnmatchedTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnmatchedTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnmatchedTransactionsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      bankAccountNumber: // value for 'bankAccountNumber'
 *      hkdAmount: // value for 'hkdAmount'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetUnmatchedTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetUnmatchedTransactionsQuery, GetUnmatchedTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnmatchedTransactionsQuery, GetUnmatchedTransactionsQueryVariables>(GetUnmatchedTransactionsDocument, options);
      }
export function useGetUnmatchedTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnmatchedTransactionsQuery, GetUnmatchedTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnmatchedTransactionsQuery, GetUnmatchedTransactionsQueryVariables>(GetUnmatchedTransactionsDocument, options);
        }
export type GetUnmatchedTransactionsQueryHookResult = ReturnType<typeof useGetUnmatchedTransactionsQuery>;
export type GetUnmatchedTransactionsLazyQueryHookResult = ReturnType<typeof useGetUnmatchedTransactionsLazyQuery>;
export type GetUnmatchedTransactionsQueryResult = Apollo.QueryResult<GetUnmatchedTransactionsQuery, GetUnmatchedTransactionsQueryVariables>;
export const GetFirmBalanceDocument = gql`
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

/**
 * __useGetFirmBalanceQuery__
 *
 * To run a query within a React component, call `useGetFirmBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFirmBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFirmBalanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFirmBalanceQuery(baseOptions?: Apollo.QueryHookOptions<GetFirmBalanceQuery, GetFirmBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFirmBalanceQuery, GetFirmBalanceQueryVariables>(GetFirmBalanceDocument, options);
      }
export function useGetFirmBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFirmBalanceQuery, GetFirmBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFirmBalanceQuery, GetFirmBalanceQueryVariables>(GetFirmBalanceDocument, options);
        }
export type GetFirmBalanceQueryHookResult = ReturnType<typeof useGetFirmBalanceQuery>;
export type GetFirmBalanceLazyQueryHookResult = ReturnType<typeof useGetFirmBalanceLazyQuery>;
export type GetFirmBalanceQueryResult = Apollo.QueryResult<GetFirmBalanceQuery, GetFirmBalanceQueryVariables>;
export const GetExchangeRateDocument = gql`
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

/**
 * __useGetExchangeRateQuery__
 *
 * To run a query within a React component, call `useGetExchangeRateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeRateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeRateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExchangeRateQuery(baseOptions?: Apollo.QueryHookOptions<GetExchangeRateQuery, GetExchangeRateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExchangeRateQuery, GetExchangeRateQueryVariables>(GetExchangeRateDocument, options);
      }
export function useGetExchangeRateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeRateQuery, GetExchangeRateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExchangeRateQuery, GetExchangeRateQueryVariables>(GetExchangeRateDocument, options);
        }
export type GetExchangeRateQueryHookResult = ReturnType<typeof useGetExchangeRateQuery>;
export type GetExchangeRateLazyQueryHookResult = ReturnType<typeof useGetExchangeRateLazyQuery>;
export type GetExchangeRateQueryResult = Apollo.QueryResult<GetExchangeRateQuery, GetExchangeRateQueryVariables>;
export const GetAllExchangeRatesDocument = gql`
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

/**
 * __useGetAllExchangeRatesQuery__
 *
 * To run a query within a React component, call `useGetAllExchangeRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExchangeRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExchangeRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllExchangeRatesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllExchangeRatesQuery, GetAllExchangeRatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExchangeRatesQuery, GetAllExchangeRatesQueryVariables>(GetAllExchangeRatesDocument, options);
      }
export function useGetAllExchangeRatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExchangeRatesQuery, GetAllExchangeRatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExchangeRatesQuery, GetAllExchangeRatesQueryVariables>(GetAllExchangeRatesDocument, options);
        }
export type GetAllExchangeRatesQueryHookResult = ReturnType<typeof useGetAllExchangeRatesQuery>;
export type GetAllExchangeRatesLazyQueryHookResult = ReturnType<typeof useGetAllExchangeRatesLazyQuery>;
export type GetAllExchangeRatesQueryResult = Apollo.QueryResult<GetAllExchangeRatesQuery, GetAllExchangeRatesQueryVariables>;
export const GetQueueDocument = gql`
    query getQueue {
  queue {
    status
    action
  }
}
    `;

/**
 * __useGetQueueQuery__
 *
 * To run a query within a React component, call `useGetQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQueueQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetQueueQuery(baseOptions?: Apollo.QueryHookOptions<GetQueueQuery, GetQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQueueQuery, GetQueueQueryVariables>(GetQueueDocument, options);
      }
export function useGetQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQueueQuery, GetQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQueueQuery, GetQueueQueryVariables>(GetQueueDocument, options);
        }
export type GetQueueQueryHookResult = ReturnType<typeof useGetQueueQuery>;
export type GetQueueLazyQueryHookResult = ReturnType<typeof useGetQueueLazyQuery>;
export type GetQueueQueryResult = Apollo.QueryResult<GetQueueQuery, GetQueueQueryVariables>;
export const GetAccountsDocument = gql`
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

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
      }
export function useGetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsQueryResult = Apollo.QueryResult<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetAccountCommentDocument = gql`
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

/**
 * __useGetAccountCommentQuery__
 *
 * To run a query within a React component, call `useGetAccountCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountCommentQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetAccountCommentQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountCommentQuery, GetAccountCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountCommentQuery, GetAccountCommentQueryVariables>(GetAccountCommentDocument, options);
      }
export function useGetAccountCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountCommentQuery, GetAccountCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountCommentQuery, GetAccountCommentQueryVariables>(GetAccountCommentDocument, options);
        }
export type GetAccountCommentQueryHookResult = ReturnType<typeof useGetAccountCommentQuery>;
export type GetAccountCommentLazyQueryHookResult = ReturnType<typeof useGetAccountCommentLazyQuery>;
export type GetAccountCommentQueryResult = Apollo.QueryResult<GetAccountCommentQuery, GetAccountCommentQueryVariables>;
export const GetAccountChecklistDocument = gql`
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

/**
 * __useGetAccountChecklistQuery__
 *
 * To run a query within a React component, call `useGetAccountChecklistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountChecklistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountChecklistQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAccountChecklistQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountChecklistQuery, GetAccountChecklistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountChecklistQuery, GetAccountChecklistQueryVariables>(GetAccountChecklistDocument, options);
      }
export function useGetAccountChecklistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountChecklistQuery, GetAccountChecklistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountChecklistQuery, GetAccountChecklistQueryVariables>(GetAccountChecklistDocument, options);
        }
export type GetAccountChecklistQueryHookResult = ReturnType<typeof useGetAccountChecklistQuery>;
export type GetAccountChecklistLazyQueryHookResult = ReturnType<typeof useGetAccountChecklistLazyQuery>;
export type GetAccountChecklistQueryResult = Apollo.QueryResult<GetAccountChecklistQuery, GetAccountChecklistQueryVariables>;
export const GetPpiAccountByIdDocument = gql`
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

/**
 * __useGetPpiAccountByIdQuery__
 *
 * To run a query within a React component, call `useGetPpiAccountByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPpiAccountByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPpiAccountByIdQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetPpiAccountByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPpiAccountByIdQuery, GetPpiAccountByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPpiAccountByIdQuery, GetPpiAccountByIdQueryVariables>(GetPpiAccountByIdDocument, options);
      }
export function useGetPpiAccountByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPpiAccountByIdQuery, GetPpiAccountByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPpiAccountByIdQuery, GetPpiAccountByIdQueryVariables>(GetPpiAccountByIdDocument, options);
        }
export type GetPpiAccountByIdQueryHookResult = ReturnType<typeof useGetPpiAccountByIdQuery>;
export type GetPpiAccountByIdLazyQueryHookResult = ReturnType<typeof useGetPpiAccountByIdLazyQuery>;
export type GetPpiAccountByIdQueryResult = Apollo.QueryResult<GetPpiAccountByIdQuery, GetPpiAccountByIdQueryVariables>;
export const GetKycReportsByIdDocument = gql`
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

/**
 * __useGetKycReportsByIdQuery__
 *
 * To run a query within a React component, call `useGetKycReportsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKycReportsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKycReportsByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetKycReportsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetKycReportsByIdQuery, GetKycReportsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetKycReportsByIdQuery, GetKycReportsByIdQueryVariables>(GetKycReportsByIdDocument, options);
      }
export function useGetKycReportsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetKycReportsByIdQuery, GetKycReportsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetKycReportsByIdQuery, GetKycReportsByIdQueryVariables>(GetKycReportsByIdDocument, options);
        }
export type GetKycReportsByIdQueryHookResult = ReturnType<typeof useGetKycReportsByIdQuery>;
export type GetKycReportsByIdLazyQueryHookResult = ReturnType<typeof useGetKycReportsByIdLazyQuery>;
export type GetKycReportsByIdQueryResult = Apollo.QueryResult<GetKycReportsByIdQuery, GetKycReportsByIdQueryVariables>;
export const GetAccountDetailDocument = gql`
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
    ${AccountTypeFragmentDoc}
${BankAccountFragmentDoc}
${UserOnfidoKycFragmentDoc}
${PersonalInfoTypeFragmentDoc}
${EmploymentInfoTypeFragmentDoc}
${TradingAccountTypeFragmentDoc}
${SourceOfWealthTypeFragmentDoc}
${ResidenceInfoTypeFragmentDoc}
${LoraAccountFragmentDoc}`;

/**
 * __useGetAccountDetailQuery__
 *
 * To run a query within a React component, call `useGetAccountDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountDetailQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetAccountDetailQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountDetailQuery, GetAccountDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountDetailQuery, GetAccountDetailQueryVariables>(GetAccountDetailDocument, options);
      }
export function useGetAccountDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountDetailQuery, GetAccountDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountDetailQuery, GetAccountDetailQueryVariables>(GetAccountDetailDocument, options);
        }
export type GetAccountDetailQueryHookResult = ReturnType<typeof useGetAccountDetailQuery>;
export type GetAccountDetailLazyQueryHookResult = ReturnType<typeof useGetAccountDetailLazyQuery>;
export type GetAccountDetailQueryResult = Apollo.QueryResult<GetAccountDetailQuery, GetAccountDetailQueryVariables>;
export const GetPpiAnswersDocument = gql`
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

/**
 * __useGetPpiAnswersQuery__
 *
 * To run a query within a React component, call `useGetPpiAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPpiAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPpiAnswersQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetPpiAnswersQuery(baseOptions?: Apollo.QueryHookOptions<GetPpiAnswersQuery, GetPpiAnswersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPpiAnswersQuery, GetPpiAnswersQueryVariables>(GetPpiAnswersDocument, options);
      }
export function useGetPpiAnswersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPpiAnswersQuery, GetPpiAnswersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPpiAnswersQuery, GetPpiAnswersQueryVariables>(GetPpiAnswersDocument, options);
        }
export type GetPpiAnswersQueryHookResult = ReturnType<typeof useGetPpiAnswersQuery>;
export type GetPpiAnswersLazyQueryHookResult = ReturnType<typeof useGetPpiAnswersLazyQuery>;
export type GetPpiAnswersQueryResult = Apollo.QueryResult<GetPpiAnswersQuery, GetPpiAnswersQueryVariables>;
export const GetPpiAnswersDetailDocument = gql`
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

/**
 * __useGetPpiAnswersDetailQuery__
 *
 * To run a query within a React component, call `useGetPpiAnswersDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPpiAnswersDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPpiAnswersDetailQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetPpiAnswersDetailQuery(baseOptions?: Apollo.QueryHookOptions<GetPpiAnswersDetailQuery, GetPpiAnswersDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPpiAnswersDetailQuery, GetPpiAnswersDetailQueryVariables>(GetPpiAnswersDetailDocument, options);
      }
export function useGetPpiAnswersDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPpiAnswersDetailQuery, GetPpiAnswersDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPpiAnswersDetailQuery, GetPpiAnswersDetailQueryVariables>(GetPpiAnswersDetailDocument, options);
        }
export type GetPpiAnswersDetailQueryHookResult = ReturnType<typeof useGetPpiAnswersDetailQuery>;
export type GetPpiAnswersDetailLazyQueryHookResult = ReturnType<typeof useGetPpiAnswersDetailLazyQuery>;
export type GetPpiAnswersDetailQueryResult = Apollo.QueryResult<GetPpiAnswersDetailQuery, GetPpiAnswersDetailQueryVariables>;