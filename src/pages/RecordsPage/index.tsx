import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  useIonViewDidLeave,
} from '@ionic/react';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { trashBinSharp, pencilSharp, arrowForward } from 'ionicons/icons';
import moment from 'moment';
import { useHistory } from 'react-router';
import { deleteRecordAPI, listRecordsAPI } from '../../apis/RecordsAPI';
import { Account, Record } from '../../apis/types';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { useConfirm } from '../../hooks/useConfirm';
import { formatMoney } from '../../utils/number';
import { FC, useRef } from 'react';
import { useAlert } from '../../hooks/useAlert';
import { listAccountsAPI } from '../../apis/AccountsAPI';
import classNames from 'classnames';

const RecordsPage = () => {
  const history = useHistory();

  const [recordsQuery, accountsQuery] = useQueries({
    queries: [
      {
        queryKey: ['list-records'],
        queryFn: listRecordsAPI,
      },
      {
        queryKey: ['list-accounts'],
        queryFn: listAccountsAPI,
      },
    ],
  });

  return (
    <div className="flex flex-col gap-3 px-3">
      {recordsQuery.isError || accountsQuery.isError ? (
        <em className="text-red-500">Error...</em>
      ) : recordsQuery.isLoading || accountsQuery.isLoading ? (
        Array.of(5).map((_, index) => (
          <Card key={index}>
            <div className="text-md font-bold animate-pulse">Loading...</div>
          </Card>
        ))
      ) : recordsQuery.data.length > 0 ? (
        <IonList>
          {recordsQuery.data
            .sort((a, b) => b.date - a.date)
            .map((record) => (
              <SlidingItem key={record.id} record={record} accounts={accountsQuery.data} />
            ))}
        </IonList>
      ) : (
        <Card>No records found</Card>
      )}
      <ActionButton onClick={() => history.push('/records/new')} />
    </div>
  );
};

const SlidingItem: FC<{ record: Record; accounts: Account[] }> = ({ record, accounts }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const alert = useAlert();
  const confirm = useConfirm();
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const fromAccount = accounts.find((account) => account.id === record.accountId);
  const toAccount = accounts.find((account) => account.id === record.transferAccountId);
  const amountColor = record.type === 'expense' ? 'text-red-500' : record.type === 'income' ? 'text-green-500' : '';

  const deleteMutation = useMutation({
    mutationFn: deleteRecordAPI,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['list-records'] });
      queryClient.invalidateQueries({ queryKey: ['list-accounts'] });
    },
    onError: () => alert('Error deleting record'),
  });

  const handleDelete = (id: string) => () => {
    confirm('Are you sure you want to delete this record?', () => deleteMutation.mutate(id));
  };

  useIonViewDidLeave(() => {
    slidingRef.current?.close();
  });

  return (
    <IonItemSliding key={record.id} ref={slidingRef}>
      <IonItem>
        <div className="flex gap-3 justify-between py-3 w-full">
          <div className="flex flex-col">
            <div className="text-md">{record.type === 'transfer' ? `Transfer` : record.name}</div>
            {record.type === 'transfer' ? (
              <div className="flex gap-1 items-center text-sm text-slate-400">
                <div>{fromAccount?.name}</div>
                <IonIcon icon={arrowForward} />
                <div className="font-bold">{toAccount?.name}</div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col text-end">
            <div className={classNames('text-md font-bold', amountColor)}>
              {record.type === 'expense' ? '-' : record.type === 'income' ? '+' : ''}
              {formatMoney(record.amount)}
            </div>
            <div className="text-sm text-slate-400">{moment(record.date * 1000).format('MMM DD')}</div>
          </div>
        </div>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="primary" onClick={() => history.push(`/records/${record.id}`)}>
          <IonIcon icon={pencilSharp} className="p-3" />
        </IonItemOption>
        <IonItemOption color="danger" onClick={handleDelete(record.id)}>
          <IonIcon icon={trashBinSharp} className="p-3" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RecordsPage;
