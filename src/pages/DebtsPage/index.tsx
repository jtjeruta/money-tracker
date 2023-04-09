import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  useIonViewDidLeave,
} from '@ionic/react';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { trashBinSharp, pencilSharp, arrowForward } from 'ionicons/icons';
import moment from 'moment';
import { useHistory } from 'react-router';
import { deleteDebtAPI, listDebtsAPI } from '../../apis/DebtsAPI';
import { Account, Debt } from '../../apis/types';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { useConfirm } from '../../hooks/useConfirm';
import { formatMoney } from '../../utils/number';
import { FC, useRef } from 'react';
import { useAlert } from '../../hooks/useAlert';
import { listAccountsAPI } from '../../apis/AccountsAPI';
import classNames from 'classnames';

const DebtsPage = () => {
  const history = useHistory();

  const [debtsQuery, accountsQuery] = useQueries({
    queries: [
      {
        queryKey: ['list-debts'],
        queryFn: listDebtsAPI,
      },
      {
        queryKey: ['list-accounts'],
        queryFn: listAccountsAPI,
      },
    ],
  });

  return (
    <div className="flex flex-col gap-3 px-3">
      {debtsQuery.isError || accountsQuery.isError ? (
        <em className="text-red-500">Error...</em>
      ) : debtsQuery.isLoading || accountsQuery.isLoading ? (
        Array.of(5).map((_, index) => (
          <Card key={index}>
            <div className="text-md font-bold animate-pulse">Loading...</div>
          </Card>
        ))
      ) : debtsQuery.data.length > 0 ? (
        <IonList>
          {debtsQuery.data
            .sort((a, b) => b.date - a.date)
            .map((debt) => (
              <SlidingItem key={debt.id} debt={debt} accounts={accountsQuery.data} />
            ))}
        </IonList>
      ) : (
        <Card>No debts found</Card>
      )}
      <ActionButton onClick={() => history.push('/debts/new')} />
    </div>
  );
};

const SlidingItem: FC<{ debt: Debt; accounts: Account[] }> = ({ debt, accounts }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const alert = useAlert();
  const confirm = useConfirm();
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteDebtAPI,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['list-debts'] });
      queryClient.invalidateQueries({ queryKey: ['list-accounts'] });
    },
    onError: () => alert('Error deleting debt'),
  });

  const handleDelete = (id: string) => () => {
    confirm('Are you sure you want to delete this debt?', () => deleteMutation.mutate(id));
  };

  useIonViewDidLeave(() => {
    slidingRef.current?.close();
  });

  return (
    <IonItemSliding key={debt.id} ref={slidingRef}>
      <IonItem>
        <div className="flex gap-3 justify-between py-3 w-full">
          <div className="flex flex-col">
            <div className="text-md">{debt.name}</div>
          </div>
          <div className="flex flex-col text-end">
            <div className="text-md font-bold">{formatMoney(debt.toPayAmount)}</div>
            <div className="text-sm text-slate-400">{moment(debt.date * 1000).format('MMM DD')}</div>
          </div>
        </div>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="primary" onClick={() => history.push(`/debts/${debt.id}`)}>
          <IonIcon icon={pencilSharp} className="p-3" />
        </IonItemOption>
        <IonItemOption color="danger" onClick={handleDelete(debt.id)}>
          <IonIcon icon={trashBinSharp} className="p-3" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default DebtsPage;
