import { AccountsContextProvider } from '../../contexts/AccountsContext';
import AccountsSection from './AccountsSection';
import CashFlowSection from './CashFlowSection';
import Goals from './Goals';
import UpcomingPayments from './UpcomingPayments';

const PageContent = () => {
  return (
    <div>
      <AccountsSection />
    </div>
  );
};

const HomePage = () => {
  return (
    <AccountsContextProvider>
      <PageContent />
      <CashFlowSection />
      <UpcomingPayments />
      <Goals />
    </AccountsContextProvider>
  );
};

export default HomePage;
