import { FC, useRef } from 'react';
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
import moment from 'moment';
import { useHistory } from 'react-router';
import { deletePlannedPaymentAPI, listPlannedPaymentsAPI } from '../../apis/PlannedPaymentsAPI';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { useConfirm } from '../../hooks/useConfirm';
import { formatMoney } from '../../utils/number';
import { PlannedPayment } from '../../apis/types';
import { useAlert } from '../../hooks/useAlert';

const PlannedPaymentsPage = () => {
  const history = useHistory();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['list-payments'],
    queryFn: listPlannedPaymentsAPI,
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
        <IonList>
          {data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((payment) => (
              <SlidingItem key={payment.id} payment={payment} />
            ))}
        </IonList>
      ) : (
        <Card>No payments found</Card>
      )}
      <ActionButton onClick={() => history.push('/planned-payments/new')} />
    </div>
  );
};

const SlidingItem: FC<{ payment: PlannedPayment }> = ({ payment }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const alert = useAlert();
  const confirm = useConfirm();
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const deleteMutation = useMutation({
    mutationFn: deletePlannedPaymentAPI,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['list-payments'] }),
    onError: () => alert('Failed to delete payment'),
  });

  const handleDelete = (paymentId: string) => () => {
    confirm('Are you sure you want to delete this payment?', () => deleteMutation.mutate(paymentId));
  };

  useIonViewDidLeave(() => {
    slidingRef.current?.close();
  });

  return (
    <IonItemSliding key={payment.id} ref={slidingRef}>
      <IonItem>
        <div className="flex gap-3 justify-between w-full py-3">
          <div>
            <IonLabel>{payment.name}</IonLabel>
            <IonLabel>
              {payment.recurrence === 'once'
                ? 'Just once'
                : payment.recurrence === 'monthly'
                ? 'Every month'
                : 'Every year'}
            </IonLabel>
          </div>
          <div>
            <IonLabel className="text-right">{formatMoney(payment.amount)}</IonLabel>
            <IonLabel className="text-right">{moment(payment.paymentDate * 1000).format('MMM DD, YYYY')}</IonLabel>
          </div>
        </div>
      </IonItem>

      <IonItemOptions>
        <IonItemOption
          color="primary"
          onClick={() => {
            history.push(`/planned-payments/${payment.id}`);
          }}
        >
          <IonIcon icon={pencilSharp} className="p-3" />
        </IonItemOption>
        <IonItemOption color="danger" onClick={handleDelete(payment.id)}>
          <IonIcon icon={trashBinSharp} className="p-3" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default PlannedPaymentsPage;
