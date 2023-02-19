export type Account = {
  id: string;
  name: string;
  balance: number;
};

export type Context = {
  listAccounts: () => Promise<Account[]>;
  addAccount: (account: Account) => Promise<Account>;
  updateAccount: (account: Account) => Promise<Account>;
  deleteAccount: (accountId: string) => Promise<void>;
  transferBalance: (fromAccountId: string, toAccountId: string, amount: number) => Promise<void>;
} | null;
