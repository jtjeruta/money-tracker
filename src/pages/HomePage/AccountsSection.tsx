import { useQuery } from '@tanstack/react-query';
import Section from '../../components/Section';
import { useAccountsContext } from '../../contexts/AccountsContext';
import { Account } from '../../contexts/AccountsContext/types';

const AccountsList = () => {
  const AccountsContext = useAccountsContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['list-accounts'],
    queryFn: AccountsContext?.listAccounts,
  });

  return (
    <Section title="List of accounts" className="bg-gray-100">
      {isError ? (
        <em className="text-red-500">Error...</em>
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-3 mt-3">
          <AccountCardSkeleton />
          <AccountCardSkeleton />
          <AccountCardSkeleton />
          <AccountCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {data.map((account: Account) => (
            <AccountCard key={account.name} account={account} />
          ))}
          <AddAccountButton />
        </div>
      )}
    </Section>
  );
};

const AccountCard = (props: { account: Account }) => (
  <div className="bg-blue-100 p-2 rounded">
    <p>{props.account.name}</p>
    <p>{props.account.balance}</p>
  </div>
);

const AccountCardSkeleton = () => (
  <div className="bg-blue-100 p-2 rounded animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
  </div>
);

const AddAccountButton = () => (
  <button className="border-2 border-solid border-blue-500 p-2 rounded flex items-center justify-center">
    <p>Add Account</p>
  </button>
);

export default AccountsList;
