import Section from '../../components/Section';

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
    <Section title="Upcoming payments this week">
      <h2>Upcoming Payments</h2>
      <ul>
        {data.map((payment) => (
          <li key={payment.id}>
            <span>{payment.name}</span>
            <span>{payment.amount}</span>
            <span>{payment.date}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default UpcomingPayments;
