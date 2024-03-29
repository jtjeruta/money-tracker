export type Account = {
  id: string;
  name: string;
  balance: number;
};

export type Record = {
  id: string;
  name?: string;
  note?: string;
  amount: number;
  date: number;
  accountId: string;
  plannedPaymentId?: string;
  debtId?: string;
  type: 'income' | 'expense' | 'transfer';
  transferAccountId?: string;
};

export type Debt = {
  id: string;
  name: string;
  description: string;
  toPayAmount: number;
  date: number;
  forgiven: boolean;
};

export type PlannedPayment = {
  id: string;
  name: string;
  description?: string;
  amount: number;
  recurrence: 'once' | 'monthly' | 'yearly';
  paymentDate: number;
  accountId?: string;
};
