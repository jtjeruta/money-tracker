import AccountsSection from './AccountsSection';
import CashFlowSection from './CashFlowSection';
import Goals from './Goals';
import UpcomingPayments from './UpcomingPayments';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3 px-3">
      <CashFlowSection />
      <AccountsSection />
      <UpcomingPayments />
      <Goals />
    </div>
  );
};

export default HomePage;
