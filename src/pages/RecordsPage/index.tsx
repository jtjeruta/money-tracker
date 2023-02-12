import moment from 'moment';
import Card from '../../components/Card';
import { formatMoney } from '../../utils/number';

type Record = {
  id: number;
  name: string;
  note: string;
  date: number;
  amount: number;
};

const RecordsPage = () => {
  const records: Record[] = [
    {
      id: 1,
      name: 'Record 1',
      note: 'Note 1',
      date: 1620000000000,
      amount: 100,
    },
    {
      id: 2,
      name: 'Record 2',
      note: 'Note 2',
      date: 1620000000000,
      amount: 200,
    },
    {
      id: 3,
      name: 'Record 3',
      note: 'Note 3',
      date: 1620000000000,
      amount: 300,
    },
  ];
  return (
    <div className="flex flex-col gap-3 px-3">
      {records.map((record) => {
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
      })}
    </div>
  );
};

export default RecordsPage;
