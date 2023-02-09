import React from 'react';
import * as Types from './types';
import { useAppContext } from '../AppContext';

const initialState: Types.State = {
  accounts: [
    {
      name: 'Cash',
      amount: 0,
    },
  ],
};

const reducer = (state: Types.State, action: Types.Actions) => {
  switch (action.type) {
    case 'Set Accounts':
      return { ...state, accounts: action.payload };
    default:
      return state;
  }
};

const AccountsContext = React.createContext<Types.Context>(null);

const AccountsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const AppContext = useAppContext();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const listAccounts = async () => {
    if (!AppContext) return [];
    const accounts: Types.Account[] = (await AppContext.state.storage?.get('accounts')) ?? [];
    dispatch({ type: 'Set Accounts', payload: accounts });
    return accounts;
  };

  return <AccountsContext.Provider value={{ state, listAccounts }}>{children}</AccountsContext.Provider>;
};

const useAccountsContext = () => React.useContext(AccountsContext);

export { AccountsContextProvider, useAccountsContext };
