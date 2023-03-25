import { useQuery } from '@tanstack/react-query';
import { useHistory } from 'react-router';
import { listAccountsAPI } from '../../apis/AccountsAPI';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { formatMoney } from '../../utils/number';

const AccountsPage = () => {
  const history = useHistory();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['list-accounts'],
    queryFn: listAccountsAPI,
  });

  return (
    <div className="flex flex-col gap-3 px-3">
      {isError ? (
        <Card className="text-red-500">Something went wrong</Card>
      ) : isLoading ? (
        <Card>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="text-md font-bold animate-pulse">Loading...</div>
            </div>
          </div>
        </Card>
      ) : data.length > 0 ? (
        data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((account) => {
            return (
              <Card key={account.id} onClick={() => history.push(`/accounts/${account.id}`)}>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <div className="text-md font-bold">{account.name}</div>
                  </div>
                  <div className="flex flex-col text-end">
                    <div className="text-md font-bold">{formatMoney(account.balance)}</div>
                  </div>
                </div>
              </Card>
            );
          })
      ) : (
        <Card>No accounts found</Card>
      )}
      <ActionButton onClick={() => history.push('/accounts/new')} />
    </div>
  );
};

export default AccountsPage;
