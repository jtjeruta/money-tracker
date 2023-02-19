import db from '../utils/db';
import { Account } from './types';

export const listAccountsAPI = async () => {
  const accounts: Account[] = await db.get('accounts') || [];
  return accounts;
};

export const addAccountAPI = async (account: Account) => {
  const accounts: Account[] = await db.get('accounts') || [];
  const newAccounts = [...accounts, account];
  await db.set('accounts', newAccounts);
  return account;
};

export const updateAccountAPI = async (account: Account) => {
  const accounts: Account[] = await db.get('accounts') || [];
  const newAccounts = accounts.map((a) => (a.id === account.id ? account : a));
  await db.set('accounts', newAccounts);
  return account;
};

export const deleteAccountAPI = async (accountId: string) => {
  const accounts: Account[] = await db.get('accounts') || [];
  const newAccounts = accounts.filter((a) => a.id !== accountId);
  await db.set('accounts', newAccounts);
};

export const transferBalanceAPI = async (fromAccountId: string, toAccountId: string, amount: number) => {
  const accounts: Account[] = await db.get('accounts') || [];
  const newAccounts = accounts.map((a) => {
    if (a.id === fromAccountId) {
      return { ...a, balance: a.balance - amount };
    }
    if (a.id === toAccountId) {
      return { ...a, balance: a.balance + amount };
    }
    return a;
  });
  await db.set('accounts', newAccounts);
};
