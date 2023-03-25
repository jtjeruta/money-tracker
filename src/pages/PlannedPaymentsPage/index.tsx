import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { listPlannedPaymentsAPI } from '../../apis/PlannedPaymentAPI';
import Card from '../../components/Card';
import { formatMoney } from '../../utils/number';

const PlannedPaymentsPage = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['list-planned-payments'],
    queryFn: listPlannedPaymentsAPI,
  });

  return (
    <div className="flex flex-col gap-3 px-3">
      {isError ? (
        <em className="text-red-500">Error...</em>
      ) : isLoading ? (
        Array.of(5).map((_, index) => (
          <Card key={index}>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="text-md font-bold animate-pulse">Loading...</div>
                <div className="text-sm animate-pulse">Loading...</div>
              </div>
              <div className="flex flex-col text-end">
                <div className="text-md font-bold animate-pulse">Loading...</div>
                <div className="text-sm animate-pulse">Loading...</div>
              </div>
            </div>
          </Card>
        ))
      ) : data.length > 0 ? (
        data.map((plannedPayment) => {
          return (
            <Card key={plannedPayment.id}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="text-md font-bold">{plannedPayment.name}</div>
                  <div className="text-sm">{plannedPayment.description}</div>
                </div>
                <div className="flex flex-col text-end">
                  <div className="text-md font-bold">{formatMoney(plannedPayment.amount)}</div>
                  <div className="text-sm">{moment().format('MMM DD')}</div>
                </div>
              </div>
            </Card>
          );
        })
      ) : (
        <Card>No planned payments found</Card>
      )}
    </div>
  );
};

export default PlannedPaymentsPage;
