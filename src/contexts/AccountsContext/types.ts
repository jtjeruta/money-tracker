export type Account = {
  name: string;
  balance: number;
};

export type SetStorage = {
  type: 'Set Accounts';
  payload: Account[];
};

export type Actions = SetStorage;

export type State = {
  accounts: Account[];
};

export type Context = { state: State; listAccounts: () => Promise<Account[]> } | null;
