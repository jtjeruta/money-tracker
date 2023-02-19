import AccountsSection from './AccountsSection';
import CashFlowSection from './CashFlowSection';
import Goals from './Goals';
import UpcomingPayments from './UpcomingPayments';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <AccountsSection />
      <CashFlowSection />
      <UpcomingPayments />
      <Goals />
    </div>
  );
};

export default HomePage;
