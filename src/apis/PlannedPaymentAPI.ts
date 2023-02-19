import db from '../utils/db';
import { PlannedPayment } from './types';

export const listPlannedPaymentsAPI = async () => {
  const plannedPayments: PlannedPayment[] = await db.get('plannedPayments') || [];
  return plannedPayments;
};

export const addPlannedPaymentAPI = async (plannedPayment: PlannedPayment) => {
  const plannedPayments: PlannedPayment[] = await db.get('plannedPayments') || [];
  const newPlannedPayments = [...plannedPayments, plannedPayment];
  await db.set('plannedPayments', newPlannedPayments);
  return plannedPayment;
};

export const updatePlannedPaymentAPI = async (plannedPayment: PlannedPayment) => {
  const plannedPayments: PlannedPayment[] = await db.get('plannedPayments') || [];
  const newPlannedPayments = plannedPayments.map((p) => (p.id === plannedPayment.id ? plannedPayment : p));
  await db.set('plannedPayments', newPlannedPayments);
  return plannedPayment;
};

export const deletePlannedPaymentAPI = async (plannedPaymentId: string) => {
  const plannedPayments: PlannedPayment[] = await db.get('plannedPayments') || [];
  const newPlannedPayments = plannedPayments.filter((p) => p.id !== plannedPaymentId);
  await db.set('plannedPayments', newPlannedPayments);
};
