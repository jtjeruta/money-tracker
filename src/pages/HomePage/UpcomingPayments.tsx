import Card from '../../components/Card';

const data = [
  {
    id: '1',
    name: 'Rent',
    amount: '1000.00',
    date: '2021-01-01',
    frequency: 'monthly',
  },
];

const UpcomingPayments = () => {
  return (
    <Card title="Upcoming payments this week">
      <ul>
        {data.map((payment) => (
          <li key={payment.id}>
            <span>{payment.name}</span>
            <span>{payment.amount}</span>
            <span>{payment.date}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UpcomingPayments;
