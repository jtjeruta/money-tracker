import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { listDebtsAPI } from '../../apis/DebtsAPI';
import Card from '../../components/Card';
import { formatMoney } from '../../utils/number';

const DebtsPage = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['list-debts'],
    queryFn: listDebtsAPI,
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
        data.map((debt) => {
          return (
            <Card key={debt.id}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="text-md font-bold">{debt.name}</div>
                  <div className="text-sm">{debt.description}</div>
                </div>
                <div className="flex flex-col text-end">
                  <div className="text-md font-bold">{formatMoney(debt.toPayAmount)}</div>
                  <div className="text-sm">{moment(debt.date * 1000).format('MMM DD')}</div>
                </div>
              </div>
            </Card>
          );
        })
      ) : (
        <em className="text-gray-500">No debts found</em>
      )}
    </div>
  );
};

export default DebtsPage;
