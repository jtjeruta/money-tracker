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

export type Context = {
  listPlannedPayments: () => Promise<PlannedPayment[]>;
  addPlannedPayment: (plannedPayment: PlannedPayment) => Promise<PlannedPayment>;
  updatePlannedPayment: (plannedPayment: PlannedPayment) => Promise<PlannedPayment>;
  deletePlannedPayment: (plannedPaymentId: string) => Promise<void>;
} | null;
