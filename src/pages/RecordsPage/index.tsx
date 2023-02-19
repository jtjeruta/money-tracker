import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useHistory } from 'react-router';
import { listRecordsAPI } from '../../apis/RecordsAPI';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { formatMoney } from '../../utils/number';

const RecordsPage = () => {
  const history = useHistory();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['list-records'],
    queryFn: listRecordsAPI,
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
        data.map((record) => {
          return (
            <Card key={record.id}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="text-md font-bold">{record.name}</div>
                  <div className="text-sm">{record.note}</div>
                </div>
                <div className="flex flex-col text-end">
                  <div className="text-md font-bold">{formatMoney(record.amount)}</div>
                  <div className="text-sm">{moment(record.date * 1000).format('MMM DD')}</div>
                </div>
              </div>
            </Card>
          );
        })
      ) : (
        <em className="text-gray-500">No records found</em>
      )}
      <ActionButton onClick={() => history.push('/records/new')} />
    </div>
  );
};

export default RecordsPage;
