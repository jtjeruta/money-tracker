import { useQuery } from '@tanstack/react-query';
import { useHistory } from 'react-router';
import { listAccountsAPI } from '../../apis/AccountsAPI';
import { Account } from '../../apis/types';
import Card from '../../components/Card';
import { formatMoney } from '../../utils/number';

const AccountsList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['list-accounts'],
    queryFn: listAccountsAPI,
  });

  return (
    <Card title="List of Accounts">
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
            <AccountCard key={account.id} account={account} />
          ))}
          <AddAccountButton />
        </div>
      )}
    </Card>
  );
};

const AccountCard = (props: { account: Account }) => (
  <div className="bg-blue-100 dark:bg-slate-900 p-2 rounded">
    <p>{props.account.name}</p>
    <p>{formatMoney(props.account.balance)}</p>
  </div>
);

const AccountCardSkeleton = () => (
  <div className="bg-blue-100 dark:bg-slate-900 p-2 rounded animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
  </div>
);

const AddAccountButton = () => {
  const history = useHistory();
  return (
    <button
      onClick={() => history.push('/accounts/new')}
      className="border-2 border-solid border-blue-500 p-2 rounded flex items-center justify-center"
    >
      <p>Add Account</p>
    </button>
  );
};

export default AccountsList;
