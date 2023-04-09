import db from '../utils/db';
import { Debt, Record } from './types';

export const listDebtsAPI = async () => {
  const debts: Debt[] = (await db.get('debts')) || [];
  return debts;
};

export const getDebtAPI = async (debtId: string) => {
  const debts: Debt[] = (await db.get('debts')) || [];
  const debt = debts.find((d) => d.id === debtId);
  return debt || null;
};

export const upsertDebtAPI = async (debt: Debt) => {
  const debts: Debt[] = (await db.get('debts')) || [];
  const filteredDebts = debts.filter((d) => d.id !== debt.id);
  const newDebts = [...filteredDebts, debt];
  await db.set('debts', newDebts);
  return debt;
};

export const deleteDebtAPI = async (debtId: string) => {
  const debts: Debt[] = (await db.get('debts')) || [];
  const records: Record[] = (await db.get('records')) || [];

  const filteredRecords = records.filter((r) => r.debtId !== debtId);
  await db.set('records', filteredRecords);

  const newDebts = debts.filter((d) => d.id !== debtId);
  await db.set('debts', newDebts);
};
