import db from '../utils/db';
import { Record } from './types';

export const listRecordsAPI = async () => {
  const records: Record[] = await db.get('records') || [];
  return records;
};

export const addRecordAPI = async (record: Record) => {
  const records: Record[] = await db.get('records') || [];
  const newRecords = [...records, record];
  await db.set('records', newRecords);
  return record;
};

export const updateRecordAPI = async (record: Record) => {
  const records: Record[] = await db.get('records') || [];
  const newRecords = records.map((r) => (r.id === record.id ? record : r));
  await db.set('records', newRecords);
  return record;
};

export const deleteRecordAPI = async (recordId: string) => {
  const records: Record[] = await db.get('records') || [];
  const newRecords = records.filter((r) => r.id !== recordId);
  await db.set('records', newRecords);
};
