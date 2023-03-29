import db from '../utils/db';
import { Record } from './types';

export const listRecordsAPI = async () => {
  const records: Record[] = await db.get('records') || [];
  return records;
};

export const getRecordAPI = async (recordId: string) => {
  const records: Record[] = await db.get('records') || [];
  const record = records.find((r) => r.id === recordId);
  return record ?? null;
};

export const upsertRecordAPI = async (record: Record) => {
  const records: Record[] = await db.get('records') || [];
  const filteredRecords = records.filter((r) => r.id !== record.id);
  const newRecords = [...filteredRecords, record];
  await db.set('records', newRecords);
  return record;
};

export const deleteRecordAPI = async (recordId: string) => {
  const records: Record[] = await db.get('records') || [];
  const newRecords = records.filter((r) => r.id !== recordId);
  await db.set('records', newRecords);
};
