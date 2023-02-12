import { AccountsContextProvider } from '../../contexts/AccountsContext';
import AccountsSection from './AccountsSection';
import CashFlowSection from './CashFlowSection';
import Goals from './Goals';
import UpcomingPayments from './UpcomingPayments';

const PageContent = () => {
  return (
    <div className="flex flex-col gap-3 px-3">
      <AccountsSection />
      <CashFlowSection />
      <UpcomingPayments />
      <Goals />
    </div>
  );
};

const HomePage = () => {
  return (
    <AccountsContextProvider>
      <PageContent />
    </AccountsContextProvider>
  );
};

export default HomePage;
