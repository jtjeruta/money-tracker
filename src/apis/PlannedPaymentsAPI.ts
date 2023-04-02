import db from '../utils/db';
import { PlannedPayment } from './types';

export const listPlannedPaymentsAPI = async () => {
  const plannedPayments: PlannedPayment[] = (await db.get('plannedPayments')) || [];
  return plannedPayments;
};

export const getPlannedPaymentAPI = async (plannedPaymentId: string) => {
  const plannedPayments: PlannedPayment[] = (await db.get('plannedPayments')) || [];
  const plannedPayment = plannedPayments.find((p) => p.id === plannedPaymentId);
  return plannedPayment || null;
};

export const upsertPlannedPaymentAPI = async (plannedPayment: PlannedPayment) => {
  const plannedPayments: PlannedPayment[] = (await db.get('plannedPayments')) || [];
  const filteredPayments = plannedPayments.filter((p) => p.id !== plannedPayment.id);
  const newPlannedPayments = [...filteredPayments, plannedPayment];
  await db.set('plannedPayments', newPlannedPayments);
  return plannedPayment;
};

export const deletePlannedPaymentAPI = async (plannedPaymentId: string) => {
  const plannedPayments: PlannedPayment[] = (await db.get('plannedPayments')) || [];
  const newPlannedPayments = plannedPayments.filter((p) => p.id !== plannedPaymentId);
  await db.set('plannedPayments', newPlannedPayments);
};
