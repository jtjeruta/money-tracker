import * as RecordsAPI from '../../apis/RecordsAPI';
import * as AccountsAPI from '../../apis/AccountsAPI';
import { Record } from '../../apis/types';
import '../helper';

describe('RecordsAPI: create record', () => {
  it('should create a new record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'income',
      accountId: '1',
    };
    const result = await RecordsAPI.upsertRecordAPI(record);
    expect(result).toEqual(record);
  });
});

describe('RecordsAPI: update record', () => {
  beforeEach(async () => {
    await AccountsAPI.upsertAccountAPI({
      id: '1',
      name: 'Account 1',
      balance: 100,
    });

    await AccountsAPI.upsertAccountAPI({
      id: '2',
      name: 'Account 2',
      balance: 100,
    });
  });

  it('should update an existing record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'income',
      accountId: '1',
    };

    const updatedRecord: Record = {
      id: '1',
      name: 'Record 1',
      amount: 200,
      date: 12345,
      type: 'income',
      accountId: '1',
    };

    await RecordsAPI.upsertRecordAPI(record);
    const result = await RecordsAPI.upsertRecordAPI(updatedRecord);
    expect(result).toEqual(updatedRecord);

    const records = await RecordsAPI.listRecordsAPI();
    expect(records).toEqual([updatedRecord]);
  });

  it('should update account balance when create a new record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'income',
      accountId: '1',
    };

    await RecordsAPI.upsertRecordAPI(record);

    const account = await AccountsAPI.getAccountAPI('1');
    expect(account).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 200,
    });
  });

  it('should update account balance when update an existing record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'income',
      accountId: '1',
    };

    const updatedRecord: Record = {
      id: '1',
      name: 'Record 1',
      amount: 200,
      date: 12345,
      type: 'income',
      accountId: '1',
    };

    await RecordsAPI.upsertRecordAPI(record);
    await RecordsAPI.upsertRecordAPI(updatedRecord);

    const account = await AccountsAPI.getAccountAPI('1');
    expect(account).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 300,
    });
  });

  it('should update the 2 accounts balance when changing the account of an existing record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'income',
      accountId: '1',
    };

    const updatedRecord: Record = {
      id: '1',
      name: 'Record 1',
      amount: 200,
      date: 12345,
      type: 'income',
      accountId: '2',
    };

    await RecordsAPI.upsertRecordAPI(record);
    await RecordsAPI.upsertRecordAPI(updatedRecord);

    const account1 = await AccountsAPI.getAccountAPI('1');
    expect(account1).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 100,
    });

    const account2 = await AccountsAPI.getAccountAPI('2');
    expect(account2).toEqual({
      id: '2',
      name: 'Account 2',
      balance: 300,
    });
  });

  it('should update the 2 accounts balance when changing the account and type of an existing record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'income',
      accountId: '1',
    };

    const updatedRecord: Record = {
      id: '1',
      name: 'Record 1',
      amount: 200,
      date: 12345,
      type: 'expense',
      accountId: '2',
    };

    await RecordsAPI.upsertRecordAPI(record);
    await RecordsAPI.upsertRecordAPI(updatedRecord);

    const account1 = await AccountsAPI.getAccountAPI('1');
    expect(account1).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 100,
    });

    const account2 = await AccountsAPI.getAccountAPI('2');
    expect(account2).toEqual({
      id: '2',
      name: 'Account 2',
      balance: -100,
    });
  });

  it('should update the 2 accounts balance when adding a transfer record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'transfer',
      accountId: '1',
      transferAccountId: '2',
    };

    await RecordsAPI.upsertRecordAPI(record);

    const account1 = await AccountsAPI.getAccountAPI('1');
    expect(account1).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 0,
    });

    const account2 = await AccountsAPI.getAccountAPI('2');
    expect(account2).toEqual({
      id: '2',
      name: 'Account 2',
      balance: 200,
    });
  });

  it('should update the 2 accounts balance when updating a transfer record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'transfer',
      accountId: '1',
      transferAccountId: '2',
    };

    const updatedRecord: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'transfer',
      accountId: '2',
      transferAccountId: '1',
    };

    await RecordsAPI.upsertRecordAPI(record);
    await RecordsAPI.upsertRecordAPI(updatedRecord);

    const account1 = await AccountsAPI.getAccountAPI('1');
    expect(account1).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 200,
    });

    const account2 = await AccountsAPI.getAccountAPI('2');
    expect(account2).toEqual({
      id: '2',
      name: 'Account 2',
      balance: 0,
    });
  });

  it('should update the 2 accounts balance when updating a transfer record and amount', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'transfer',
      accountId: '1',
      transferAccountId: '2',
    };

    const updatedRecord: Record = {
      id: '1',
      name: 'Record 1',
      amount: 200,
      date: 12345,
      type: 'transfer',
      accountId: '2',
      transferAccountId: '1',
    };

    await RecordsAPI.upsertRecordAPI(record);
    await RecordsAPI.upsertRecordAPI(updatedRecord);

    const account1 = await AccountsAPI.getAccountAPI('1');
    expect(account1).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 300,
    });

    const account2 = await AccountsAPI.getAccountAPI('2');
    expect(account2).toEqual({
      id: '2',
      name: 'Account 2',
      balance: -100,
    });
  });
});

describe('RecordsAPI: delete record', () => {
  beforeEach(async () => {
    await AccountsAPI.upsertAccountAPI({
      id: '1',
      name: 'Account 1',
      balance: 100,
    });

    await AccountsAPI.upsertAccountAPI({
      id: '2',
      name: 'Account 2',
      balance: 100,
    });
  });

  it('should update account balance when delete an existing record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'income',
      accountId: '1',
    };

    await RecordsAPI.upsertRecordAPI(record);
    await RecordsAPI.deleteRecordAPI('1');

    const account = await AccountsAPI.getAccountAPI('1');
    expect(account).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 100,
    });
  });

  it('should update the 2 accounts balance when deleting a transfer record', async () => {
    const record: Record = {
      id: '1',
      name: 'Record 1',
      amount: 100,
      date: 12345,
      type: 'transfer',
      accountId: '1',
      transferAccountId: '2',
    };

    await RecordsAPI.upsertRecordAPI(record);
    await RecordsAPI.deleteRecordAPI('1');

    const account1 = await AccountsAPI.getAccountAPI('1');
    expect(account1).toEqual({
      id: '1',
      name: 'Account 1',
      balance: 100,
    });

    const account2 = await AccountsAPI.getAccountAPI('2');
    expect(account2).toEqual({
      id: '2',
      name: 'Account 2',
      balance: 100,
    });
  });
});
