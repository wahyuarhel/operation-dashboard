export type ColumnTableObject = {
  Header: string;
  accessor: string;
  type?: string;
  tableType?: string;
};
export type AggregateDepositObject = {
  updated: string;
  side: string;
  request_time: string;
  arrival_time: string;
  total_transaction_aggregate: number;
  aggregate_amount: number;
  currency_code: string;
  exchange_source: string;
  exchange_rate: number;
  aggregate_converted_amount: number;
  convert_to_currency: string;
  request_from: string;
  arrive_to: string;
  notes: string;
  payment_method: number;
  status: number;
  user: number;
};

export type AggregateWithdrawalObject = {
  updated: string;
  side: string;
  request_time: string;
  arrival_time: string;
  total_transaction_aggregate: number;
  aggregate_amount: number;
  currency_code: string;
  exchange_source: string;
  exchange_rate: number;
  aggregate_converted_amount: number;
  convert_to_currency: string;
  request_from: string;
  arrive_to: string;
  notes: string;
  payment_method: number;
  status: number;
  user: number;
};

export type IndividualDepositObject = {
  transaction_id: string;
  payment_method: string;
  status: string;
  created: string;
  updated: string;
  alpaca_transaction_id: any;
  account_id: any;
  bank_account_id: string;
  bank_account_number: string | null;
  bank_account_code: string | null;
  side: string;
  is_new_deposit: boolean;
  currency_code: string;
  convert_to_currency: string | null;
  exchange_rate: any;
  exchange_source: any;
  amount: any;
  converted_amount: any;
  request_time: string | null;
  arrival_time: any;
  request_from: string;
  arrive_to: any;
  proof_of_remittance: any;
  reference_code: string;
  notes: any;
  aggregate_transaction: any | null;
};

export type IndividualWithdrawalObject = {
  transaction_id: string;
  payment_method: string;
  status: string;
  created: string;
  updated: string;
  alpaca_transaction_id: any;
  account_id: any;
  bank_account_id: string;
  side: string;
  currency_code: string;
  convert_to_currency: string;
  exchange_rate: any;
  exchange_source: any;
  amount: any;
  converted_amount: any;
  request_time: string;
  arrival_time: any;
  request_from: string;
  arrive_to: any;
  proof_of_remittance: any;
  reference_code: string;
  notes: any;
  transaction_aggregate: any;
};

export type WithdrawalTransaction = {
  alpaca_transaction_id: string;
  account_id: number;
  bank_account_id: string;
  payment_method: string;
  side: string;
  amount: number;
  currency_code: string;
  convert_to_currency: string;
  request_time: string;
  request_from: string;
};

// TYPE FOR DEPOSIT TRANSACTIONS
export type Header = {
  msgId: string;
  orgId: string;
  timeStamp: string;
  ctry: string;
};
export type ReceivingParty = {
  name: string;
  accountNo: string;
  proxyType: string;
  proxyValue: string;
};

export type AmountDetail = {
  txnCcy: string;
  txnAmt: number;
};

export type SenderParty = {
  name: string;
  accountNo: string;
  senderBankId: string;
  senderBankName: string;
};

export type RemittanceInfo = {
  paymentDetails: string;
  addtlInf: string;
  purposeCode: string;
};

export type TaxInfo = {
  txnType: string;
  customerReference: string;
  txnRefId: string;
  txnDate: string;
  valueDt: string;
  receivingParty: ReceivingParty;
  amtDtls: AmountDetail;
  senderParty: SenderParty;
  rmtInf: RemittanceInfo;
};
export type DepositTransaction = {
  header: Header;
  txnInfo: TaxInfo;
};

export type DeleteTransactionResponse = {
  detail: string;
};

export type UpdateIndividualDeposits = {
  transactionId: string;
  arrival_time: string;
  payment_time: string;
  status: number;
  proof_of_remittance: string;
  notes: string;
};

export type UpdateIndividualWithdrawals = {
  transactionId: string;
  arrival_time: string;
  converted_amount: number;
  status: number;
  proof_of_remittance: string;
  notes: string;
};

export type UpdateAggregateDeposits = {
  transactionId: string;
  arrival_time: string;
  request_time: string;
  status: number;
  notes: string;
};

export type UpdateAggregateWithdrawals = {
  transactionId: string;
  arrival_time: string;
  request_time: string;
  status: number;
  notes: string;
};

export type StatusTransaction = {
  name: string;
  value: number;
  side: string;
  transaction_type: string;
};

export type ProofOfRemittance = {
  id: number;
  account_name: string;
  account_id: number;
  account_number: string;
  file_url: string;
};

export type UpdateTransactionParams = {
  transaction_id: string;
  arrival_time?: string;
  payment_time?: string;
  status?: number;
  proof_of_remittance?: ProofFile;
  notes?: string;
};

export type UpdateExchangeRateParams = {
  id: number;
  rate?: string;
  spread: number;
};

export type MatchTransactionRemittanceParams = {
  remittance_id: number;
  account_number?: string;
  inputted_amount?: string;
};

type ProofFile = {
  file: string;
};

export type UpdateTransactionRemittanceParams = {
  remittance_id: string;
  account_id?: number;
  account_number?: string;
  account_status?: string;
  fund_type?: string;
  inputted_amount?: string;
  proof_file?: ProofFile[];
  request_id?: string;
  status?: string;
  notes?: string;
};

export type ApproveTransactionParams = {
  transaction_id: string;
  notes?: string;
};

export type CreateTransactionParams = {
  journal_id: string;
  account_id: number;
  bank_account_id: string;
  payment_method: string;
  side: string;
  transaction_status: string;
  transaction_status_code: number;
  hkd_amount: string;
  usd_amount: string;
  exchange_rate: string;
  transaction_rate: string;
  payment_time: string;
  journal_time: string;
  finish_time: string;
  sendback_time: string;
  rejected_time: string;
};

export type ButtonParams = {
  title: string;
  onPressButton: Function;
  tabs?: string[];
};

export type SelectedBank = {
  label?: any;
  value?: any;
  bankName?: any;
  error?: string | null;
};

export type UploadRemittance = {
  file: string;
  remittance_id: string;
};

export type UploadRemittanceResponse = {
  id: string;
  proof_file: string;
};

export type AddBankAccount = {
  remittance_id: String;
  account_id: String;
  account_name: String;
  account_number: String;
  bank_code: String;
  bank_name: String;
};

export type MatchedRemittanceTransactionResponse = {
  detail: string;
  transaction_data: {
    transaction_id: string;
    customer_reference: string;
    payment_id: string;
    side: string;
    account_id: number;
    bank_account_id: string;
    bank_account_name: string;
    bank_account_code: string;
    bank_account_number: string;
    hkd_amount: number;
  };
};

export type UpdateRemittanceTransactionResponse = {
  account_id: number;
  account_name: string;
  account_number: string;
  account_status: string;
  fund_type: string;
  inputted_amount: string;
  proof_files: [
    {
      file: string;
    }
  ];
  request_id: string;
};

export type UpdateTransactionResponse = {
  payment_time: string;
  transaction_status: string;
  notes: string;
};

export type Success = {
  source: string;
  message: string;
};

export type Error = {
  source: string;
  message: string | any;
};
export type Loading = {
  source: string;
  status: boolean;
};

export enum AlertMessageType {
  success = 'success',
  warning = 'warning',
  alert = 'alert'
}

export type MoveToTopQueueParams = {
  transactions: string[];
};

export type QueueControlParams = 'RESTART' | 'PAUSE';

export enum tab {
  waitingApproval = 'Waiting Approval',
  onHold = 'On Hold',
  unMatched = 'Unmatched',
  return = 'Returned Transactions',
  inQueue = 'In Queue',
  actionRequired = 'Action Required',
  deposits = 'Deposits',
  withdrawals = 'Withdrawals',
  others = 'Others',
  sentToIbkr = 'Sent (to IBKR)',
  receivedFromIbkr = 'Received (from IBKR)',
  inQueueWithdrawal = 'In Queue - Withdrawals',
  completedDeposits = 'Completed Deposits (24H)',
  reject = 'Rejected DR',
  unknown = 'Unknown Transactions',
  unknownDeposit = 'Unknown Deposit',
  refundDeposit = 'Refund Deposit',
  rejectedWithdrawal = 'Rejected Withdrawal Requests',
  rejectedOrReturnedDeposit = 'Rejected/Returned Deposits'
}

export enum actionButton {
  onHold = `Put into 'On Hold'`,
  forceMatch = 'Force Match',
  waitingApproval = `Put Back Into\n'Waiting Approval'`,
  return = `Put into\n'Return'`,
  restart = 'Restart Automation',
  pause = 'Pause Automation',
  moveToTop = 'Move to top of queue',
  processWithdrawal = 'Process Withdrawal',
  reject = 'Reject Request'
}

export enum cols {
  userId = 'User ID',
  date = 'Date',
  name = 'Name',
  userType = 'User Type',
  amountToReturn = 'Amount to Return (HKD)',
  transactionId = 'Transaction ID',
  dateArrived = 'Date Arrived',
  amount = 'Amount (HKD)',
  dateSent = 'Date Sent',
  journalId = 'Journal ID',
  dateCompleted = 'Date Completed',
  dateReturned = 'Date Returned',
  bankAccountNo = 'Bank Account No.'
}

export enum pathNames {
  waitingApprovals = '/',
  withdrawals = '/withdrawals',
  deposits = '/deposits',
  transactionHistory = '/transaction-history',
  transactionsIbkr = '/transactions-ibkr'
}

export enum transferType {
  auto = 'AUTO',
  manual = 'MANUAL'
}

export enum kycResult {
  clear = 'CLEAR',
  caution = 'CAUTION',
  suspected = 'SUSPECTED',
  consider = 'CONSIDER',
  rejected = 'REJECTED'
}
