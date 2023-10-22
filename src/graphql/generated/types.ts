export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Decimal: any;
  GrapheneSerializerEnum: any;
  JSONString: any;
};

/** An enumeration. */
export enum AccountAccountCommentNoteStatusChoices {
  /** INITIAL_DATA */
  InitialData = 'INITIAL_DATA',
  /** MERGED */
  Merged = 'MERGED',
  /** NON_REQUEST */
  NonRequest = 'NON_REQUEST',
  /** REJECTED */
  Rejected = 'REJECTED',
  /** REQUESTED */
  Requested = 'REQUESTED'
}

/** An enumeration. */
export enum AccountAccountCommentNoteTypeChoices {
  /** COMMENT */
  Comment = 'COMMENT',
  /** INIT_DATA */
  InitData = 'INIT_DATA',
  /** REQUEST_CHANGE */
  RequestChange = 'REQUEST_CHANGE'
}

export type AccountChecklistType = {
  __typename?: 'AccountChecklistType';
  address: Scalars['Boolean'];
  dob: Scalars['Boolean'];
  gender: Scalars['Boolean'];
  id: Scalars['ID'];
  idNumber: Scalars['Boolean'];
  legalName: Scalars['Boolean'];
  occupation: Scalars['Boolean'];
  riskInfo: Scalars['Boolean'];
  userId: Scalars['Int'];
};

export type AccountCommentType = {
  __typename?: 'AccountCommentType';
  accountId: Scalars['Int'];
  comment: Scalars['String'];
  created: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  extraField?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  noteStatus: AccountAccountCommentNoteStatusChoices;
  noteType: AccountAccountCommentNoteTypeChoices;
  updated: Scalars['DateTime'];
  user?: Maybe<UserType>;
};

/** An enumeration. */
export enum AccountLoraAccountLoraStatusChoices {
  /** ACTIVE */
  Active = 'ACTIVE',
  /** AWAITING_USER_ACTION */
  AwaitingUserAction = 'AWAITING_USER_ACTION',
  /** CLOSED */
  Closed = 'CLOSED',
  /** CONSIDER_ONFIDO */
  ConsiderOnfido = 'CONSIDER_ONFIDO',
  /** FINAL_APPROVAL_REQUIRED */
  FinalApprovalRequired = 'FINAL_APPROVAL_REQUIRED',
  /** ONBOARDING */
  Onboarding = 'ONBOARDING',
  /** PENDING_IBKR */
  PendingIbkr = 'PENDING_IBKR',
  /** PENDING_LORA */
  PendingLora = 'PENDING_LORA',
  /** REJECTED_IBKR */
  RejectedIbkr = 'REJECTED_IBKR',
  /** REJECTED_LORA */
  RejectedLora = 'REJECTED_LORA',
  /** REQUESTED_CLOSE */
  RequestedClose = 'REQUESTED_CLOSE',
  /** SUBMITTED */
  Submitted = 'SUBMITTED',
  /** SUSPENDED */
  Suspended = 'SUSPENDED',
  /** UNSUBMITTED */
  Unsubmitted = 'UNSUBMITTED'
}

export type AccountPpiType = {
  __typename?: 'AccountPPIType';
  accountId: Scalars['String'];
  created: Scalars['DateTime'];
  deviceId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  snapshots?: Maybe<UserSnapshotType>;
  updated: Scalars['DateTime'];
};

export type AccountResponseType = {
  __typename?: 'AccountResponseType';
  accountBalResponseDtl?: Maybe<Array<Maybe<EnquiryBalanceDetailType>>>;
  accountCcy?: Maybe<Scalars['String']>;
  accountName: Scalars['String'];
  accountNo?: Maybe<Scalars['String']>;
  businessDate?: Maybe<Scalars['String']>;
  clsAvailableBal?: Maybe<Scalars['String']>;
  clsLedgerBal?: Maybe<Scalars['String']>;
  enqStatus: Scalars['String'];
  halfDayHold?: Maybe<Scalars['String']>;
  oneDayHold?: Maybe<Scalars['String']>;
  twoDaysHold?: Maybe<Scalars['String']>;
};

export type AccountType = {
  __typename?: 'AccountType';
  dateJoined?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['Date']>;
  status?: Maybe<Scalars['String']>;
  tradeStatus: Scalars['Boolean'];
  username: Scalars['String'];
};

export type AccountWithDetailType = {
  __typename?: 'AccountWithDetailType';
  account?: Maybe<AccountType>;
  bankAccount?: Maybe<BankAccountType>;
  employmentInfo?: Maybe<EmploymentInfoType>;
  loraAccount?: Maybe<LoraAccountType>;
  onfidoInfo?: Maybe<OnfidoKycUserType>;
  personalInfo?: Maybe<PersonalInfoType>;
  proofOfAddressFile?: Maybe<Array<Maybe<ProofOfAddressFileType>>>;
  residenceInfo?: Maybe<ResidenceInfoType>;
  sourceOfWealth?: Maybe<Array<Maybe<SourceOfWealthType>>>;
  tradingAccount?: Maybe<TradingAccountType>;
};

export type AnswerType = {
  __typename?: 'AnswerType';
  answer?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  question?: Maybe<QuestionType>;
  score?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum AskloraTradingAccountTradingAccountTypeChoices {
  /** ALPACA */
  Alpaca = 'ALPACA',
  /** IBKR */
  Ibkr = 'IBKR'
}

export type BankAccountType = {
  __typename?: 'BankAccountType';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bankCode?: Maybe<Scalars['String']>;
  bankId?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  stateProvince?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
};

export type BankType = {
  __typename?: 'BankType';
  bankName?: Maybe<Scalars['String']>;
  chineseName?: Maybe<Scalars['String']>;
  clearingCode?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  swiftBic?: Maybe<Scalars['String']>;
};

export enum BrokerAccountStatus {
  Abandoned = 'ABANDONED',
  Closed = 'CLOSED',
  New = 'NEW',
  Open = 'OPEN',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Suspended = 'SUSPENDED'
}

export type ConversionRateType = {
  __typename?: 'ConversionRateType';
  changedBy?: Maybe<UserType>;
  configuration?: Maybe<ExchangeRateDataType>;
  created: Scalars['DateTime'];
  fxType: TransactionConversionRateFxTypeChoices;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  objectId: Scalars['Int'];
  updated: Scalars['DateTime'];
};

export type EmploymentInfoType = {
  __typename?: 'EmploymentInfoType';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  differentCountryReason?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  employer?: Maybe<Scalars['String']>;
  employerAddressLine1?: Maybe<Scalars['String']>;
  employerAddressLine2?: Maybe<Scalars['String']>;
  employerBusiness?: Maybe<Scalars['String']>;
  employerBusinessDescription?: Maybe<Scalars['String']>;
  employmentStatus?: Maybe<Scalars['GrapheneSerializerEnum']>;
  id: Scalars['ID'];
  occupation?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
};

export type EnquiryBalanceAlpacaType = {
  __typename?: 'EnquiryBalanceAlpacaType';
  accruedFees: Scalars['String'];
  cash: Scalars['String'];
  cashTransferable: Scalars['String'];
  cashWithdrawable: Scalars['String'];
  pendingTransferIn: Scalars['String'];
  pendingTransferOut: Scalars['String'];
};

export type EnquiryBalanceDetailType = {
  __typename?: 'EnquiryBalanceDetailType';
  accountCcy?: Maybe<Scalars['String']>;
  accountNo?: Maybe<Scalars['String']>;
  businessDate?: Maybe<Scalars['String']>;
  clsAvailableBal?: Maybe<Scalars['String']>;
  clsLedgerBal?: Maybe<Scalars['String']>;
  halfDayHold?: Maybe<Scalars['String']>;
  oneDayHold?: Maybe<Scalars['String']>;
  twoDaysHold?: Maybe<Scalars['String']>;
};

export type ExchangeRateDataType = {
  __typename?: 'ExchangeRateDataType';
  computedRate?: Maybe<Scalars['Decimal']>;
  headers?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  path?: Maybe<Array<Maybe<Scalars['String']>>>;
  rate?: Maybe<Scalars['Decimal']>;
  spread?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type ExchangeRateType = {
  __typename?: 'ExchangeRateType';
  deposit?: Maybe<ExchangeRateDataType>;
  withdrawal?: Maybe<ExchangeRateDataType>;
};

export type HkdEnquiryBalanceType = {
  __typename?: 'HkdEnquiryBalanceType';
  accountBalResponse: AccountResponseType;
};

export type LoraAccountType = {
  __typename?: 'LoraAccountType';
  accountId: Scalars['Int'];
  activeSince?: Maybe<Scalars['Date']>;
  approvedBy?: Maybe<UserType>;
  created: Scalars['DateTime'];
  dateRejected?: Maybe<Scalars['Date']>;
  dateSuspended?: Maybe<Scalars['Date']>;
  finalApprovalGiven?: Maybe<Scalars['Date']>;
  history?: Maybe<Array<Maybe<LoraHistoricalType>>>;
  hkResident: Scalars['Boolean'];
  ibStatus?: Maybe<BrokerAccountStatus>;
  ibUserId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  loraStatus: AccountLoraAccountLoraStatusChoices;
  updated: Scalars['DateTime'];
  usResident: Scalars['Boolean'];
};

export type LoraHistoricalType = {
  __typename?: 'LoraHistoricalType';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  loraStatus?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MultiEnquiryBalanceType = {
  __typename?: 'MultiEnquiryBalanceType';
  accountBalResponse: AccountResponseType;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type OnfidoKycReportType = {
  __typename?: 'OnfidoKycReportType';
  applicant: OnfidoKycUserType;
  checkDate?: Maybe<Scalars['DateTime']>;
  checkId: Scalars['String'];
  reportIds: Array<Scalars['String']>;
  result?: Maybe<Scalars['GrapheneSerializerEnum']>;
  resultUriApi?: Maybe<Scalars['String']>;
  resultUriDashboard?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['GrapheneSerializerEnum']>;
};

export type OnfidoKycUserType = {
  __typename?: 'OnfidoKycUserType';
  applicantId?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  kycCheckResult: Array<OnfidoKycReportType>;
  uid: Scalars['String'];
  updated: Scalars['DateTime'];
  user: AccountType;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PersonalInfoType = {
  __typename?: 'PersonalInfoType';
  countryOfBirth: Scalars['String'];
  created: Scalars['DateTime'];
  dateOfBirth?: Maybe<Scalars['Date']>;
  firstName: Scalars['String'];
  gender?: Maybe<Scalars['GrapheneSerializerEnum']>;
  hkidNumber: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  nationality: Scalars['String'];
  phoneCountryCode: Scalars['String'];
  phoneNumber: Scalars['String'];
  updated: Scalars['DateTime'];
};

/** An enumeration. */
export enum PpiQuestionQuestionTypeChoices {
  /** choices */
  Choices = 'CHOICES',
  /** descriptive */
  Descriptive = 'DESCRIPTIVE',
  /** slider */
  Slider = 'SLIDER'
}

/** An enumeration. */
export enum PpiQuestionSectionChoices {
  /** conscientiousness */
  Conscientiousness = 'CONSCIENTIOUSNESS',
  /** extrovert */
  Extrovert = 'EXTROVERT',
  /** investment_style */
  InvestmentStyle = 'INVESTMENT_STYLE',
  /** neuroticism */
  Neuroticism = 'NEUROTICISM',
  /** omnisearch */
  Omnisearch = 'OMNISEARCH',
  /** openness */
  Openness = 'OPENNESS',
  /** privacy */
  Privacy = 'PRIVACY'
}

export type ProofOfAddressFileType = {
  __typename?: 'ProofOfAddressFileType';
  proofFile?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  accountChecklist?: Maybe<AccountChecklistType>;
  accountComment?: Maybe<Array<Maybe<AccountCommentType>>>;
  accountWithDetails?: Maybe<Array<Maybe<AccountWithDetailType>>>;
  accountWithDetailsById?: Maybe<AccountWithDetailType>;
  accounts?: Maybe<Array<Maybe<AccountType>>>;
  allExchangeRates?: Maybe<Array<Maybe<ConversionRateType>>>;
  banks?: Maybe<Array<Maybe<BankType>>>;
  exchangeRate?: Maybe<ExchangeRateType>;
  firmBalance?: Maybe<EnquiryBalanceAlpacaType>;
  hkdEnquiry?: Maybe<HkdEnquiryBalanceType>;
  kycReports?: Maybe<Array<Maybe<OnfidoKycReportType>>>;
  kycReportsById?: Maybe<Array<Maybe<OnfidoKycReportType>>>;
  kycUsers?: Maybe<Array<Maybe<OnfidoKycUserType>>>;
  multiCcyEnquiry?: Maybe<MultiEnquiryBalanceType>;
  ppiAccountById?: Maybe<AccountPpiType>;
  ppiAccounts?: Maybe<Array<Maybe<AccountPpiType>>>;
  ppiAnswers?: Maybe<Array<Maybe<AnswerType>>>;
  ppiAnswersDetail?: Maybe<Array<Maybe<UserAnswerDetailType>>>;
  queue?: Maybe<QueueType>;
  remittanceNode?: Maybe<RemittanceType>;
  remittances?: Maybe<RemittanceTypeConnection>;
  transactionNode?: Maybe<TransactionActivitiesType>;
  transactionStatuses?: Maybe<Array<Maybe<TransactionStatusCodeType>>>;
  transactions?: Maybe<TransactionActivitiesTypeConnection>;
  unmatchedTransactions?: Maybe<TransactionActivitiesTypeConnection>;
};


export type QueryAccountChecklistArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};


export type QueryAccountCommentArgs = {
  accountId?: InputMaybe<Scalars['Int']>;
};


export type QueryAccountWithDetailsByIdArgs = {
  accountId?: InputMaybe<Scalars['Int']>;
};


export type QueryKycReportsByIdArgs = {
  userId: Scalars['ID'];
};


export type QueryPpiAccountByIdArgs = {
  accountId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryPpiAnswersArgs = {
  accountId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryPpiAnswersDetailArgs = {
  accountId?: InputMaybe<Scalars['String']>;
};


export type QueryRemittanceNodeArgs = {
  id: Scalars['ID'];
};


export type QueryRemittancesArgs = {
  accountId?: InputMaybe<Scalars['Int']>;
  accountNumber?: InputMaybe<Scalars['String']>;
  accountStatus?: InputMaybe<TransactionTransactionRemittanceAccountStatusChoices>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  fundType?: InputMaybe<TransactionTransactionRemittanceFundTypeChoices>;
  id?: InputMaybe<Scalars['ID']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TransactionTransactionRemittanceStatusChoices>;
  transactionActivityId?: InputMaybe<Scalars['ID']>;
  transactionActivity_JournalId?: InputMaybe<Scalars['String']>;
};


export type QueryTransactionNodeArgs = {
  id: Scalars['ID'];
};


export type QueryTransactionsArgs = {
  accountId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  bankAccountName?: InputMaybe<Scalars['String']>;
  bankAccountNumber?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  journalId?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  paymentMethod?: InputMaybe<Scalars['ID']>;
  recipientAccountName?: InputMaybe<Scalars['String']>;
  recipientAccountNumber?: InputMaybe<Scalars['String']>;
  side?: InputMaybe<TransactionTransactionActivitiesSideChoices>;
  transactionId?: InputMaybe<Scalars['String']>;
  transactionStatusCode?: InputMaybe<Scalars['ID']>;
};


export type QueryUnmatchedTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  bankAccountNumber?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hkdAmount?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
};

export type QuestionType = {
  __typename?: 'QuestionType';
  hints?: Maybe<Scalars['String']>;
  hintsZh?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  question: Scalars['String'];
  questionId?: Maybe<Scalars['String']>;
  questionType: PpiQuestionQuestionTypeChoices;
  questionZh?: Maybe<Scalars['String']>;
  section: PpiQuestionSectionChoices;
};

export enum QueueStatusEnum {
  Active = 'ACTIVE',
  Paused = 'PAUSED'
}

export type QueueType = {
  __typename?: 'QueueType';
  action?: Maybe<Scalars['String']>;
  status?: Maybe<QueueStatusEnum>;
};

export type RemittanceDataType = {
  __typename?: 'RemittanceDataType';
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  proofFile?: Maybe<Scalars['String']>;
  transactionRemittance?: Maybe<RemittanceType>;
  updated: Scalars['DateTime'];
};

export type RemittanceType = Node & {
  __typename?: 'RemittanceType';
  accountId: Scalars['Int'];
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  accountStatus: TransactionTransactionRemittanceAccountStatusChoices;
  approvedAdmins?: Maybe<UserApprovalType>;
  askloraRequestId?: Maybe<Scalars['String']>;
  bankCode?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  fundType: TransactionTransactionRemittanceFundTypeChoices;
  /** The ID of the object */
  id: Scalars['ID'];
  inputtedAmount: Scalars['Decimal'];
  journalId?: Maybe<Scalars['String']>;
  ledgerRequestId?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  remittanceId?: Maybe<Scalars['String']>;
  remittanceProofs: Array<RemittanceDataType>;
  status: TransactionTransactionRemittanceStatusChoices;
  transactionActivity?: Maybe<TransactionActivitiesType>;
  updated: Scalars['DateTime'];
};

export type RemittanceTypeConnection = {
  __typename?: 'RemittanceTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RemittanceTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `RemittanceType` and its cursor. */
export type RemittanceTypeEdge = {
  __typename?: 'RemittanceTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<RemittanceType>;
};

export type ResidenceInfoType = {
  __typename?: 'ResidenceInfoType';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  district: Scalars['String'];
  id: Scalars['ID'];
  postalCode?: Maybe<Scalars['String']>;
  region: Scalars['String'];
  updated: Scalars['DateTime'];
};

export type SourceOfWealthType = {
  __typename?: 'SourceOfWealthType';
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  otherWealth?: Maybe<Scalars['String']>;
  percentage: Scalars['Int'];
  updated: Scalars['DateTime'];
  wealthSource: Scalars['String'];
};

export type TradingAccountType = {
  __typename?: 'TradingAccountType';
  created: Scalars['DateTime'];
  currentStatus?: Maybe<Scalars['GrapheneSerializerEnum']>;
  kycStatus?: Maybe<Scalars['GrapheneSerializerEnum']>;
  tradingAccountId?: Maybe<Scalars['String']>;
  tradingAccountType: AskloraTradingAccountTradingAccountTypeChoices;
  uid: Scalars['String'];
  updated: Scalars['DateTime'];
};

export type TransactionActivitiesType = Node & {
  __typename?: 'TransactionActivitiesType';
  accountBankCode?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['Int']>;
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  bankAccountCode?: Maybe<Scalars['String']>;
  bankAccountName?: Maybe<Scalars['String']>;
  bankAccountNumber?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  customerReference?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  exchangeRate?: Maybe<Scalars['Decimal']>;
  finishTime?: Maybe<Scalars['DateTime']>;
  hkdAmount?: Maybe<Scalars['Float']>;
  /** The ID of the object */
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isNewDeposit: Scalars['Boolean'];
  isRefunded?: Maybe<Scalars['Boolean']>;
  journalId?: Maybe<Scalars['String']>;
  journalTime?: Maybe<Scalars['DateTime']>;
  movedBalance: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  paymentDetails?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
  paymentTime?: Maybe<Scalars['DateTime']>;
  recipientAccountCode?: Maybe<Scalars['String']>;
  recipientAccountName?: Maybe<Scalars['String']>;
  recipientAccountNumber?: Maybe<Scalars['String']>;
  rejectedTime?: Maybe<Scalars['DateTime']>;
  sendbackTime?: Maybe<Scalars['DateTime']>;
  side: TransactionTransactionActivitiesSideChoices;
  transactionId: Scalars['String'];
  transactionRemittances?: Maybe<RemittanceType>;
  transactionStatusCode?: Maybe<TransactionStatusCodeType>;
  updated: Scalars['DateTime'];
  usdAmount?: Maybe<Scalars['Float']>;
  userType?: Maybe<Scalars['String']>;
};

export type TransactionActivitiesTypeConnection = {
  __typename?: 'TransactionActivitiesTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TransactionActivitiesTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `TransactionActivitiesType` and its cursor. */
export type TransactionActivitiesTypeEdge = {
  __typename?: 'TransactionActivitiesTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<TransactionActivitiesType>;
};

/** An enumeration. */
export enum TransactionConversionRateFxTypeChoices {
  /** API */
  Api = 'API',
  /** CUSTOM */
  Custom = 'CUSTOM'
}

export type TransactionStatusCodeType = {
  __typename?: 'TransactionStatusCodeType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  side: TransactionTransactionStatusCodeSideChoices;
  statusCode: Scalars['Int'];
  statusColor?: Maybe<Scalars['String']>;
  statusName?: Maybe<Scalars['String']>;
  statusPoint: TransactionTransactionStatusCodeStatusPointChoices;
};

/** An enumeration. */
export enum TransactionTransactionActivitiesSideChoices {
  /** DEPOSIT */
  Deposit = 'DEPOSIT',
  /** WITHDRAW */
  Withdraw = 'WITHDRAW'
}

/** An enumeration. */
export enum TransactionTransactionRemittanceAccountStatusChoices {
  /** CHANGE */
  Change = 'CHANGE',
  /** NEW */
  New = 'NEW',
  /** RETURN */
  Return = 'RETURN',
  /** UNKNOWN */
  Unknown = 'UNKNOWN'
}

/** An enumeration. */
export enum TransactionTransactionRemittanceFundTypeChoices {
  /** FPS */
  Fps = 'FPS',
  /** Wire */
  Wire = 'WIRE'
}

/** An enumeration. */
export enum TransactionTransactionRemittanceStatusChoices {
  /** APPROVED */
  Approved = 'APPROVED',
  /** COMPLETED */
  Completed = 'COMPLETED',
  /** MATCHED */
  Matched = 'MATCHED',
  /** NEEDAPPROVAL */
  Needapproval = 'NEEDAPPROVAL',
  /** ONHOLD */
  Onhold = 'ONHOLD',
  /** REJECTED */
  Rejected = 'REJECTED',
  /** RETURN */
  Return = 'RETURN',
  /** UNMATCHED */
  Unmatched = 'UNMATCHED'
}

/** An enumeration. */
export enum TransactionTransactionStatusCodeSideChoices {
  /** BOTH */
  Both = 'BOTH',
  /** DEPOSIT */
  Deposit = 'DEPOSIT',
  /** WITHDRAW */
  Withdraw = 'WITHDRAW'
}

/** An enumeration. */
export enum TransactionTransactionStatusCodeStatusPointChoices {
  /** ALA */
  Ala = 'ALA',
  /** DBA */
  Dba = 'DBA',
  /** IBR */
  Ibr = 'IBR',
  /** USR */
  Usr = 'USR'
}

export type UserAnswerDetailType = {
  __typename?: 'UserAnswerDetailType';
  answer?: Maybe<AnswerType>;
  detail?: Maybe<UserAnswerType>;
};

export type UserAnswerType = {
  __typename?: 'UserAnswerType';
  created: Scalars['DateTime'];
  id: Scalars['ID'];
  updated: Scalars['DateTime'];
};

export type UserApprovalItemType = {
  __typename?: 'UserApprovalItemType';
  date?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserApprovalType = {
  __typename?: 'UserApprovalType';
  admin1?: Maybe<UserApprovalItemType>;
  admin2?: Maybe<UserApprovalItemType>;
};

export type UserSnapshotType = {
  __typename?: 'UserSnapshotType';
  conscientiousness: Scalars['Int'];
  currentQuestionId?: Maybe<Scalars['String']>;
  extrovert: Scalars['Int'];
  id: Scalars['ID'];
  investmentStyle: Scalars['Int'];
  maxRiskScore: Scalars['Float'];
  neuroticism: Scalars['Int'];
  objective: Scalars['Float'];
  openness: Scalars['Int'];
  privacy: Scalars['Int'];
  snapshot: Array<UserAnswerType>;
  suitability: Scalars['Float'];
  user: AccountPpiType;
};

export type UserType = {
  __typename?: 'UserType';
  adminComment: Array<AccountCommentType>;
  dateJoined: Scalars['DateTime'];
  email: Scalars['String'];
  fxConfigs: Array<ConversionRateType>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  loraaccountSet: Array<LoraAccountType>;
  name?: Maybe<Scalars['String']>;
  transactionremittanceSet: RemittanceTypeConnection;
  username: Scalars['String'];
};


export type UserTypeTransactionremittanceSetArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};
