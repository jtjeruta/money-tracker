import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList } from '@ionic/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trashBinSharp, pencilSharp } from 'ionicons/icons';
import moment from 'moment';
import { useHistory } from 'react-router';
import { deleteRecordAPI, listRecordsAPI } from '../../apis/RecordsAPI';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { useConfirm } from '../../hooks/useConfirm';
import { formatMoney } from '../../utils/number';

const RecordsPage = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const confirm = useConfirm();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['list-records'],
    queryFn: listRecordsAPI,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRecordAPI,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['list-records'] });
      queryClient.invalidateQueries({ queryKey: ['list-accounts'] });
    },
  });

  const handleDelete = (id: string) => () => {
    confirm('Are you sure you want to delete this record?', () => deleteMutation.mutate(id));
  };

  return (
    <div className="flex flex-col gap-3 px-3">
      {isError ? (
        <em className="text-red-500">Error...</em>
      ) : isLoading ? (
        Array.of(5).map((_, index) => (
          <Card key={index}>
            <div className="text-md font-bold animate-pulse">Loading...</div>
          </Card>
        ))
      ) : data.length > 0 ? (
        <IonList>
          {data
            .sort((a, b) => b.date - a.date)
            .map((record) => {
              return (
                <IonItemSliding key={record.id}>
                  <IonItem>
                    <div className="flex gap-3 justify-between py-3 w-full">
                      <div className="flex flex-col">
                        <div className="text-md">{record.name}</div>
                        <div className="text-sm">{record.note}</div>
                      </div>
                      <div className="flex flex-col text-end">
                        <div className="text-md">{formatMoney(record.amount)}</div>
                        <div className="text-sm">{moment(record.date * 1000).format('MMM DD')}</div>
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
            })}
        </IonList>
      ) : (
        <Card>No records found</Card>
      )}
      <ActionButton onClick={() => history.push('/records/new')} />
    </div>
  );
};

export default RecordsPage;
