import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useHistory } from 'react-router';
import { deleteAccountAPI, listAccountsAPI } from '../../apis/AccountsAPI';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { useConfirm } from '../../hooks/useConfirm';
import { formatMoney } from '../../utils/number';

const AccountsPage = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const confirm = useConfirm();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['list-accounts'],
    queryFn: listAccountsAPI,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAccountAPI,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['list-accounts'] }),
  });

  const handleDelete = (accountId: string) => () => {
    confirm('Are you sure you want to delete this account?', () => deleteMutation.mutate(accountId));
  };

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
        <IonList>
          {data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((account) => {
              return (
                <IonItemSliding key={account.id}>
                  <IonItem>
                    <IonLabel>{account.name}</IonLabel>
                    <IonLabel className="text-right">{formatMoney(account.balance)}</IonLabel>
                  </IonItem>

                  <IonItemOptions>
                    <IonItemOption color="primary" onClick={() => history.push(`/accounts/${account.id}`)}>
                      Edit
                    </IonItemOption>
                    <IonItemOption color="danger" onClick={handleDelete(account.id)}>
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
        </IonList>
      ) : (
        <Card>No accounts found</Card>
      )}
      <ActionButton onClick={() => history.push('/accounts/new')} />
    </div>
  );
};

export default AccountsPage;
