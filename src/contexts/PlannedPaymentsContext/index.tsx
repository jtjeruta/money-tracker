import React from 'react';
import * as Types from './types';
import { useAppContext } from '../AppContext';

const PlannedPaymentsContext = React.createContext<Types.Context>(null);

const PlannedPaymentsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const AppContext = useAppContext();

  const listPlannedPayments = async () => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const plannedPayments: Types.PlannedPayment[] = (await AppContext.state.storage?.get('plannedPayments')) ?? [];
    return plannedPayments;
  };

  const addPlannedPayment = async (plannedPayment: Types.PlannedPayment) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const plannedPayments: Types.PlannedPayment[] = (await AppContext.state.storage?.get('plannedPayments')) ?? [];
    plannedPayments.push(plannedPayment);
    await AppContext.state.storage?.set('plannedPayments', plannedPayments);
    return plannedPayment;
  };

  const deletePlannedPayment = async (plannedPaymentId: string) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const plannedPayments: Types.PlannedPayment[] = (await AppContext.state.storage?.get('plannedPayments')) ?? [];
    const newPlannedPayments = plannedPayments.filter((a) => a.id !== plannedPaymentId);
    await AppContext.state.storage?.set('plannedPayments', newPlannedPayments);
  };

  const updatePlannedPayment = async (plannedPayment: Types.PlannedPayment) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const plannedPayments: Types.PlannedPayment[] = (await AppContext.state.storage?.get('plannedPayments')) ?? [];
    const newPlannedPayments = plannedPayments.map((a) => {
      if (a.id === plannedPayment.id) {
        return plannedPayment;
      }
      return a;
    });
    await AppContext.state.storage?.set('plannedPayments', newPlannedPayments);
    return plannedPayment;
  };


  return (
    <PlannedPaymentsContext.Provider value={{ listPlannedPayments, addPlannedPayment, updatePlannedPayment, deletePlannedPayment }}>
      {children}
    </PlannedPaymentsContext.Provider>
  );
};

const usePlannedPaymentsContext = () => React.useContext(PlannedPaymentsContext);

export { PlannedPaymentsContextProvider, usePlannedPaymentsContext };
