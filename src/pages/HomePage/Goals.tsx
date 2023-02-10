import Section from '../../components/Section';

const data = [
  {
    id: '1',
    name: 'Save for a house',
    total: '1000.00',
  },
];

const GoalsSection = () => {
  return (
    <Section title="Goals">
      {data.map((goal) => (
        <div key={goal.id}>
          <p>{goal.name}</p>
          <p>{goal.total}</p>
        </div>
      ))}
    </Section>
  );
};

export default GoalsSection;
