import { OptionFieldObject } from '../types/user_types';
import { ColumnTableObject } from '../types/transaction_types';

export interface CustomTableProps {
  data: any;
  columns: ColumnTableObject[];
  title: string;
  filterOptions: OptionFieldObject[];
  keyword?: string;
  onChangeKeyword?: any;
  setSelectedOption?: any;
  selectedOption?: any;
  fileName?: string;
  loading?: boolean;
  buttonTitle?: string;
  updateTransaction?: any;
  deleteTransaction?: any;
  getProofOfRemittance?: any;
}
