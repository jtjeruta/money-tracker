import classNames from 'classnames';
import Card from '../../components/Card';
import Title from '../../components/Title';
import { formatMoney } from '../../utils/number';

const CashFlowSection = () => {
  const data = {
    income: 27550.0,
    expenses: 63191,
  };

  const net = data.income - data.expenses;

  return (
    <Card>
      <div className="flex justify-between text-sm">
        <div className="flex gap-1 items-center">
          <Title>Cash Flow</Title>
          <small>(this month)</small>
        </div>
        <p className={classNames('font-bold', net < 0 && 'text-red-500')}>{formatMoney(net)}</p>
      </div>
    </Card>
  );
};

export default CashFlowSection;
