import * as AccountsAPI from '../../apis/AccountsAPI';
import { Account } from '../../apis/types';
import '../helper';

describe('AccountsAPI: create account', () => {
  it('should create a new account', async () => {
    const account: Account = {
      id: '1',
      name: 'Account 1',
      balance: 100,
    };
    const result = await AccountsAPI.upsertAccountAPI(account);
    expect(result).toEqual(account);
  });

  it('should update an existing account', async () => {
    const account: Account = {
      id: '1',
      name: 'Account 1',
      balance: 100,
    };
    const updatedAccount: Account = {
      id: '1',
      name: 'Account 1',
      balance: 200,
    };
    await AccountsAPI.upsertAccountAPI(account);
    const result = await AccountsAPI.upsertAccountAPI(updatedAccount);
    expect(result).toEqual(updatedAccount);

    const accounts = await AccountsAPI.listAccountsAPI();
    expect(accounts).toEqual([updatedAccount]);
  });
});
