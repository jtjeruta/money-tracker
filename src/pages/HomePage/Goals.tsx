import Card from '../../components/Card';

const data = [
  {
    id: '1',
    name: 'Save for a house',
    total: '1000.00',
  },
];

const GoalsSection = () => {
  return (
    <Card title="Goals">
      {data.map((goal) => (
        <div key={goal.id}>
          <p>{goal.name}</p>
          <p>{goal.total}</p>
        </div>
      ))}
    </Card>
  );
};

export default GoalsSection;
