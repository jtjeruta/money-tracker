import React from 'react';
import * as Types from './types';
import { useAppContext } from '../AppContext';

const AccountsContext = React.createContext<Types.Context>(null);

const AccountsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const AppContext = useAppContext();

  const listAccounts = async () => {
    if (!AppContext) return [];
    const accounts: Types.Account[] = (await AppContext.state.storage?.get('accounts')) ?? [];
    return accounts;
  };

  return <AccountsContext.Provider value={{ listAccounts }}>{children}</AccountsContext.Provider>;
};

const useAccountsContext = () => React.useContext(AccountsContext);

export { AccountsContextProvider, useAccountsContext };
