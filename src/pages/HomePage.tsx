import { useEffect } from 'react';
import { AccountsContextProvider, useAccountsContext } from '../contexts/AccountsContext';

const PageContent = () => {
  const AccountsContext = useAccountsContext();

  useEffect(() => {
    AccountsContext?.listAccounts();
  }, []);

  return <h1>Hello</h1>;
};

const HomePage = () => {
  return (
    <AccountsContextProvider>
      <PageContent />
    </AccountsContextProvider>
  );
};

export default HomePage;
