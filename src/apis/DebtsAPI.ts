import db from '../utils/db';
import { Debt } from './types';

export const listDebtsAPI = async () => {
  const debts: Debt[] = await db.get('debts') || [];
  return debts;
};

export const addDebtAPI = async (debt: Debt) => {
  const debts: Debt[] = await db.get('debts') || [];
  const newDebts = [...debts, debt];
  await db.set('debts', newDebts);
  return debt;
};

export const updateDebtAPI = async (debt: Debt) => {
  const debts: Debt[] = await db.get('debts') || [];
  const newDebts = debts.map((d) => (d.id === debt.id ? debt : d));
  await db.set('debts', newDebts);
  return debt;
};

export const deleteDebtAPI = async (debtId: string) => {
  const debts: Debt[] = await db.get('debts') || [];
  const newDebts = debts.filter((d) => d.id !== debtId);
  await db.set('debts', newDebts);
};

export const payDebtAPI = async (debtId: string, amount: number) => {
  const debts: Debt[] = await db.get('debts') || [];
  const newDebts = debts.map((d) => {
    if (d.id === debtId) {
      return { ...d, amountPaid: d.amountPaid + amount };
    }
    return d;
  });
  await db.set('debts', newDebts);
};

export const forgiveDebtAPI = async (debtId: string) => {
  const debts: Debt[] = await db.get('debts') || [];
  const newDebts = debts.map((d) => {
    if (d.id === debtId) {
      return { ...d, forgiven: true };
    }
    return d;
  });
  await db.set('debts', newDebts);
};
