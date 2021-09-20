export enum TransactionCategory {
  CATEGORY1 = 'category1',
  CATEGORY2 = 'category2',
}

export const TransactionCategoryLabels = [
  { value: TransactionCategory.CATEGORY1, label: 'Category 1' },
  { value: TransactionCategory.CATEGORY2, label: 'Category 2' },
];

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export const TransactionTypeLabels = [
  { value: TransactionType.CREDIT, label: 'Credit' },
  { value: TransactionType.DEBIT, label: 'Debit' },
];

export interface Transaction {
  id: string;
  payment_date: string;
  name: string;
  description: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
  created_at: string;
}

export interface Report {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  file_url: string;
  created_at: string;
}
