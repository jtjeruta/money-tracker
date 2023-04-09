import * as DebtsAPI from '../../apis/DebtsAPI';
import * as RecordsAPI from '../../apis/RecordsAPI';
import { Debt, Record } from '../../apis/types';
import '../helper';

describe('DebtsAPI: create debt', () => {
  it('should create a new debt', async () => {
    const debt: Debt = {
      id: '1',
      name: 'Debt 1',
      toPayAmount: 100,
      date: 12345,
      description: 'description',
      forgiven: false,
    };
    const result = await DebtsAPI.upsertDebtAPI(debt);
    expect(result).toEqual(debt);
  });
});

describe('DebtsAPI: update debt', () => {
  beforeEach(async () => {
    await DebtsAPI.upsertDebtAPI({
      id: '1',
      name: 'Debt 1',
      toPayAmount: 100,
      date: 12345,
      description: 'description',
      forgiven: false,
    });
  });

  it('should update an existing debt', async () => {
    const updatedDebt: Debt = {
      id: '1',
      name: 'Debt 1',
      toPayAmount: 200,
      date: 12345,
      description: 'description',
      forgiven: false,
    };
    const result = await DebtsAPI.upsertDebtAPI(updatedDebt);
    expect(result).toEqual(updatedDebt);

    const debts = await DebtsAPI.listDebtsAPI();
    expect(debts).toEqual([updatedDebt]);
  });
});

describe('DebtsAPI: delete debt', () => {
  beforeEach(async () => {
    await DebtsAPI.upsertDebtAPI({
      id: '1',
      name: 'Debt 1',
      toPayAmount: 100,
      date: 12345,
      description: 'description',
      forgiven: false,
    });
  });

  it('should delete an existing debt', async () => {
    await DebtsAPI.deleteDebtAPI('1');
    const debts = await DebtsAPI.listDebtsAPI();
    expect(debts).toEqual([]);
  });

  it('should delete records associated with the debt', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'income',
      accountId: '1',
      debtId: '1',
    };

    await RecordsAPI.upsertRecordAPI(record);
    const records = await RecordsAPI.listRecordsAPI();
    expect(records).toEqual([record]);

    await DebtsAPI.deleteDebtAPI('1');
    const recordsAfterDelete = await RecordsAPI.listRecordsAPI();
    expect(recordsAfterDelete).toEqual([]);
  });
});
