import db from '../utils/db';
import { Account, Record } from './types';

export const listRecordsAPI = async () => {
  const records: Record[] = (await db.get('records')) || [];
  return records;
};

export const getRecordAPI = async (recordId: string) => {
  const records: Record[] = (await db.get('records')) || [];
  const record = records.find((r) => r.id === recordId);
  return record ?? null;
};

export const upsertRecordAPI = async (record: Record) => {
  const records: Record[] = (await db.get('records')) || [];
  let accounts: Account[] = (await db.get('accounts')) || [];

  // update records
  const foundRecord = records.find((r) => r.id === record.id);
  const filteredRecords = records.filter((r) => r.id !== record.id);
  const newRecords = [...filteredRecords, record];
  await db.set('records', newRecords);

  // update old account
  const oldAccount = accounts.find((a) => a.id === foundRecord?.accountId);
  if (oldAccount) {
    const filteredAccounts = accounts.filter((a) => a.id !== oldAccount.id);
    const newAccount = { ...oldAccount, balance: oldAccount.balance - (foundRecord?.amount ?? 0) };
    accounts = [...filteredAccounts, newAccount];
    await db.set('accounts', accounts);
  }

  // update new account
  const newAccount = accounts.find((a) => a.id === record.accountId);
  if (newAccount) {
    const filteredAccounts = accounts.filter((a) => a.id !== newAccount.id);
    const updatedAccount = { ...newAccount, balance: newAccount.balance + record.amount };
    accounts = [...filteredAccounts, updatedAccount];
    await db.set('accounts', accounts);
  }

  return record;
};

export const deleteRecordAPI = async (recordId: string) => {
  const records: Record[] = (await db.get('records')) || [];
  const accounts: Account[] = (await db.get('accounts')) || [];

  const foundRecord = records.find((r) => r.id === recordId);
  const foundAccount = accounts.find((a) => a.id === foundRecord?.accountId);

  const filteredRecords = accounts.filter((a) => a.id !== foundAccount?.id);
  const filteredAccounts = records.filter((r) => r.id !== recordId);

  if (foundAccount) {
    const newAccount = { ...foundAccount, balance: foundAccount?.balance - (foundRecord?.amount ?? 0) };
    const newAccounts = [...filteredAccounts, newAccount];
    await db.set('accounts', newAccounts);
  }

  await db.set('records', filteredRecords);
};
