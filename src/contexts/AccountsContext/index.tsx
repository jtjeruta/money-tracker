import React from 'react';
import * as Types from './types';
import { useAppContext } from '../AppContext';

const AccountsContext = React.createContext<Types.Context>(null);

const AccountsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const AppContext = useAppContext();

  const listAccounts = async () => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const accounts: Types.Account[] = (await AppContext.state.storage?.get('accounts')) ?? [];
    return accounts;
  };

  const addAccount = async (account: Types.Account) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const accounts: Types.Account[] = (await AppContext.state.storage?.get('accounts')) ?? [];
    accounts.push(account);
    await AppContext.state.storage?.set('accounts', accounts);
    return account;
  };

  const deleteAccount = async (accountId: string) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const accounts: Types.Account[] = (await AppContext.state.storage?.get('accounts')) ?? [];
    const newAccounts = accounts.filter((a) => a.id !== accountId);
    await AppContext.state.storage?.set('accounts', newAccounts);
  };

  const updateAccount = async (account: Types.Account) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const accounts: Types.Account[] = (await AppContext.state.storage?.get('accounts')) ?? [];
    const newAccounts = accounts.map((a) => {
      if (a.id === account.id) {
        return account;
      }
      return a;
    });
    await AppContext.state.storage?.set('accounts', newAccounts);
    return account;
  };

  const transferBalance = async (fromId: string, toId: string, amount: number) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const accounts: Types.Account[] = (await AppContext.state.storage?.get('accounts')) ?? [];
    const newAccounts = accounts.map((a) => {
      if (a.id === fromId) {
        return { ...a, balance: a.balance - amount };
      }
      if (a.id === toId) {
        return { ...a, balance: a.balance + amount };
      }
      return a;
    });
    await AppContext.state.storage?.set('accounts', newAccounts);
  };

  return (
    <AccountsContext.Provider value={{ listAccounts, addAccount, updateAccount, deleteAccount, transferBalance }}>
      {children}
    </AccountsContext.Provider>
  );
};

const useAccountsContext = () => React.useContext(AccountsContext);

export { AccountsContextProvider, useAccountsContext };
