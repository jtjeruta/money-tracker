import React from 'react';
import * as Types from './types';
import { useAppContext } from '../AppContext';

const RecordsContext = React.createContext<Types.Context>(null);

const RecordsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const AppContext = useAppContext();

  const listRecords = async () => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const records: Types.Record[] = (await AppContext.state.storage?.get('records')) ?? [];
    return records;
  };

  const addRecord = async (record: Types.Record) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const records: Types.Record[] = (await AppContext.state.storage?.get('records')) ?? [];
    records.push(record);
    await AppContext.state.storage?.set('records', records);
    return record;
  };

  const deleteRecord = async (recordId: string) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const records: Types.Record[] = (await AppContext.state.storage?.get('records')) ?? [];
    const newRecords = records.filter((a) => a.id !== recordId);
    await AppContext.state.storage?.set('records', newRecords);
  };

  const updateRecord = async (record: Types.Record) => {
    if (!AppContext) throw new Error('AppContext is not defined');
    const records: Types.Record[] = (await AppContext.state.storage?.get('records')) ?? [];
    const newRecords = records.map((a) => {
      if (a.id === record.id) {
        return record;
      }
      return a;
    });
    await AppContext.state.storage?.set('records', newRecords);
    return record;
  };


  return (
    <RecordsContext.Provider value={{ listRecords, addRecord, updateRecord, deleteRecord }}>
      {children}
    </RecordsContext.Provider>
  );
};

const useRecordsContext = () => React.useContext(RecordsContext);

export { RecordsContextProvider, useRecordsContext };
