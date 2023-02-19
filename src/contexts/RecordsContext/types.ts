export type Record = {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: number;
};

export type Context = {
  listRecords: () => Promise<Record[]>;
  addRecord: (record: Record) => Promise<Record>;
  updateRecord: (record: Record) => Promise<Record>;
  deleteRecord: (recordId: string) => Promise<void>;
} | null;
