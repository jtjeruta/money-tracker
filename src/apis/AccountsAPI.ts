import db from '../utils/db';
import { Account } from './types';

export const listAccountsAPI = async () => {
  const accounts: Account[] = (await db.get('accounts')) || [];
  return accounts;
};

export const getAccountAPI = async (id: string) => {
  const accounts: Account[] = (await db.get('accounts')) || [];
  const account = accounts.find((a) => a.id === id);
  return account || null;
};

export const upsertAccountAPI = async (account: Account) => {
  const accounts: Account[] = (await db.get('accounts')) || [];
  const filteredAccounts = accounts.filter((a) => a.id !== account.id);
  const newAccounts = [...filteredAccounts, account];
  await db.set('accounts', newAccounts);
  return account;
};

export const deleteAccountAPI = async (accountId: string) => {
  const accounts: Account[] = (await db.get('accounts')) || [];
  const newAccounts = accounts.filter((a) => a.id !== accountId);
  await db.set('accounts', newAccounts);
};
