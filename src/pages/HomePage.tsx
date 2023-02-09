import { useEffect } from 'react';
import Section from '../components/Section';
import { AccountsContextProvider, useAccountsContext } from '../contexts/AccountsContext';
import { Account } from '../contexts/AccountsContext/types';

const PageContent = () => {
  const AccountsContext = useAccountsContext();

  useEffect(() => {
    AccountsContext?.listAccounts();
  }, []);

  return (
    <div>
      <Section title="List of accounts" className="bg-gray-100">
        <div className="grid grid-cols-2 gap-3 mt-3">
          {(AccountsContext?.state.accounts ?? []).map((account) => (
            <AccountCard account={account} key={account.name} />
          ))}
          <AddAccountButton />
        </div>
      </Section>
    </div>
  );
};

const AccountCard = (props: { account: Account }) => (
  <div className="bg-blue-100 p-2 rounded">
    <p>{props.account.name}</p>
    <p>{props.account.balance}</p>
  </div>
);

const AddAccountButton = () => (
  <button className="border-2 border-solid border-blue-500 p-2 rounded flex items-center justify-center">
    <p>Add Account</p>
  </button>
);

const HomePage = () => {
  return (
    <AccountsContextProvider>
      <PageContent />
    </AccountsContextProvider>
  );
};

export default HomePage;
