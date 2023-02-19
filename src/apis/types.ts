export type Account = {
  id: string;
  name: string;
  balance: number;
};

export type Record = {
  id: string;
  name: string;
  note: string;
  amount: number;
  date: number;
  accountId: string;
  plannedPaymentId?: string;
  debtId?: string;
};

export type Debt = {
  id: string;
  name: string;
  description: string;
  toPayAmount: number;
  amountPaid: number;
  date: number;
  forgiven: boolean;
};

export type PlannedPayment = {
  id: string;
  name: string;
  description: string;
  amount: number;
} & (
  | {
      recurrence: 'once';
      date: number;
    }
  | {
      recurrence: 'monthly';
      day: number;
    }
  | {
      recurrence: 'yearly';
      month: number;
      day: number;
    }
);
