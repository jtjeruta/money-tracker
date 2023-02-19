export type Debt = {
  id: string;
  name: string;
  description: string;
  toPayAmount: number;
  amountPaid: number;
  date: number;
  forgiven: boolean;
};

export type Context = {
  listDebts: () => Promise<Debt[]>;
  addDebt: (debt: Debt) => Promise<Debt>;
  updateDebt: (debt: Debt) => Promise<Debt>;
  deleteDebt: (debtId: string) => Promise<void>;
} | null;
