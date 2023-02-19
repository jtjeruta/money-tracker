import React from 'react';
import * as Types from './types';
import { useAppContext } from '../AppContext';

const DebtsContext = React.createContext<Types.Context>(null);

const DebtsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const AppContext = useAppContext();

  const listDebts = async () => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const debts: Types.Debt[] = (await AppContext.state.storage?.get('debts')) ?? [];
    return debts;
  };

  const addDebt = async (debt: Types.Debt) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const debts: Types.Debt[] = (await AppContext.state.storage?.get('debts')) ?? [];
    debts.push(debt);
    await AppContext.state.storage?.set('debts', debts);
    return debt;
  };

  const deleteDebt = async (debtId: string) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const debts: Types.Debt[] = (await AppContext.state.storage?.get('debts')) ?? [];
    const newDebts = debts.filter((a) => a.id !== debtId);
    await AppContext.state.storage?.set('debts', newDebts);
  };

  const updateDebt = async (debt: Types.Debt) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const debts: Types.Debt[] = (await AppContext.state.storage?.get('debts')) ?? [];
    const newDebts = debts.map((a) => {
      if (a.id === debt.id) {
        return debt;
      }
      return a;
    });
    await AppContext.state.storage?.set('debts', newDebts);
    return debt;
  };


  return (
    <DebtsContext.Provider value={{ listDebts, addDebt, updateDebt, deleteDebt }}>
      {children}
    </DebtsContext.Provider>
  );
};

const useDebtsContext = () => React.useContext(DebtsContext);

export { DebtsContextProvider, useDebtsContext };
