import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  useIonViewDidLeave,
} from '@ionic/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pencilSharp, trashBinSharp } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { deleteAccountAPI, listAccountsAPI } from '../../apis/AccountsAPI';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { useConfirm } from '../../hooks/useConfirm';
import { formatMoney } from '../../utils/number';
import { FC, useEffect, useRef } from 'react';
import { Account } from '../../apis/types';
import { useAlert } from '../../hooks/useAlert';

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
            .map((account) => (
              <SlidingItem key={account.id} account={account} />
            ))}
        </IonList>
      ) : (
        <Card>No accounts found</Card>
      )}
      <ActionButton onClick={() => history.push('/accounts/new')} />
    </div>
  );
};

const SlidingItem: FC<{ account: Account }> = ({ account }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const alert = useAlert();
  const confirm = useConfirm();
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteAccountAPI,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['list-accounts'] }),
    onError: () => alert('Failed to delete account'),
  });

  const handleDelete = (accountId: string) => () => {
    confirm('Are you sure you want to delete this account?', () => deleteMutation.mutate(accountId));
  };

  useIonViewDidLeave(() => {
    slidingRef.current?.close();
  });

  return (
    <IonItemSliding key={account.id} ref={slidingRef}>
      <IonItem>
        <IonLabel>{account.name}</IonLabel>
        <IonLabel className="text-right">{formatMoney(account.balance)}</IonLabel>
      </IonItem>

      <IonItemOptions>
        <IonItemOption color="primary" onClick={() => history.push(`/accounts/${account.id}`)}>
          <IonIcon icon={pencilSharp} className="p-3" />
        </IonItemOption>
        <IonItemOption color="danger" onClick={handleDelete(account.id)}>
          <IonIcon icon={trashBinSharp} className="p-3" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default AccountsPage;
