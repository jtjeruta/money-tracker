export type Account = {
  name: string;
  balance: number;
};

export type Context = { listAccounts: () => Promise<Account[]> } | null;
