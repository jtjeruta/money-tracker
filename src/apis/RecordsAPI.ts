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

  function getUpdatedAccounts(account: Account, amount: number) {
    const filteredAccounts = accounts.filter((a) => a.id !== account.id);
    const balance = account.balance + amount;
    const newAccount = { ...account, balance };
    accounts = [...filteredAccounts, newAccount];
  }

  // update old account
  const oldAccount = accounts.find((a) => a.id === foundRecord?.accountId);
  let amount = foundRecord?.type === 'income' ? -(foundRecord?.amount ?? 0) : foundRecord?.amount ?? 0;
  oldAccount && foundRecord && getUpdatedAccounts(oldAccount, amount);

  // update old transfer account
  const oldTransferAccount = accounts.find((a) => a.id === foundRecord?.transferAccountId);
  oldTransferAccount && foundRecord && getUpdatedAccounts(oldTransferAccount, -foundRecord.amount);

  // update new account
  const newAccount = accounts.find((a) => a.id === record.accountId);
  amount = record.type === 'income' ? record.amount : -record.amount;
  newAccount && getUpdatedAccounts(newAccount, amount);

  // update new transfer account
  const newTransferAccount = accounts.find((a) => a.id === record.transferAccountId);
  newTransferAccount && getUpdatedAccounts(newTransferAccount, record.amount);

  await db.set('accounts', accounts);
  return record;
};

export const deleteRecordAPI = async (recordId: string) => {
  const records: Record[] = (await db.get('records')) || [];
  let accounts: Account[] = (await db.get('accounts')) || [];

  const foundRecord = records.find((r) => r.id === recordId);
  const foundAccount = accounts.find((a) => a.id === foundRecord?.accountId);
  const foundTransferAccount = accounts.find((a) => a.id === foundRecord?.transferAccountId);

  const filteredRecords = records.filter((a) => a.id !== recordId);

  if (foundAccount && foundRecord) {
    const filteredAccounts = accounts.filter((r) => r.id !== foundAccount?.id);
    const balance =
      foundRecord.type === 'income'
        ? foundAccount.balance - foundRecord?.amount
        : foundAccount.balance + foundRecord?.amount;

    const newAccount = { ...foundAccount, balance };
    accounts = [...filteredAccounts, newAccount];
  }

  if (foundTransferAccount && foundRecord) {
    const filteredAccounts = accounts.filter((r) => r.id !== foundTransferAccount?.id);
    const balance = foundTransferAccount.balance - foundRecord?.amount;
    const newAccount = { ...foundTransferAccount, balance };
    accounts = [...filteredAccounts, newAccount];
  }

  await db.set('accounts', accounts);
  await db.set('records', filteredRecords);
};
