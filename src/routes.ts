import { FC } from 'react';
import {
  cardOutline,
  cardSharp,
  heartOutline,
  heartSharp,
  homeOutline,
  homeSharp,
  listOutline,
  listSharp,
  paperPlaneOutline,
  paperPlaneSharp,
} from 'ionicons/icons';
import HomePage from './pages/HomePage';
import RecordsPage from './pages/RecordsPage';
import PlannedPaymentsPage from './pages/PlannedPaymentsPage';
import DebtsPage from './pages/DebtsPage';
import RecordPage from './pages/RecordPage';
import AccountsPage from './pages/AccountsPage';
import AccountPage from './pages/AccountPage';
import PlannedPaymentPage from './pages/PlannedPaymentPage';
import DebtPage from './pages/DebtPage';

export type BasePage = {
  url: string;
  title: string;
  component: FC;
  showBackButton?: boolean;
};

export type MenuPage = BasePage & {
  showInMenu: true;
  iosIcon: string;
  mdIcon: string;
};

export type HiddenPage = BasePage & { showInMenu: false };

export type AppPage = MenuPage | HiddenPage;

export const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
    component: HomePage,
    showInMenu: true,
  },
  {
    title: 'Records',
    url: '/records',
    iosIcon: listOutline,
    mdIcon: listSharp,
    component: RecordsPage,
    showInMenu: true,
  },
  {
    title: 'Update Planned Payment',
    url: '/planned-payments/:paymentId',
    component: PlannedPaymentPage,
    showInMenu: false,
    showBackButton: true,
  },
  {
    title: 'New Planned Payment',
    url: '/planned-payments/new',
    component: PlannedPaymentPage,
    showInMenu: false,
    showBackButton: true,
  },
  {
    title: 'Planned Payments',
    url: '/planned-payments',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
    component: PlannedPaymentsPage,
    showInMenu: true,
  },
  {
    title: 'Debts',
    url: '/debts',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    component: DebtsPage,
    showInMenu: true,
  },
  {
    title: 'New Debt',
    url: '/debts/new',
    component: DebtPage,
    showInMenu: false,
    showBackButton: true,
  },
  {
    title: 'Update Debt',
    url: '/debts/:debtId',
    component: DebtPage,
    showInMenu: false,
    showBackButton: true,
  },
  {
    title: 'New Record',
    url: '/records/new',
    component: RecordPage,
    showInMenu: false,
    showBackButton: true,
  },
  {
    title: 'Update Account',
    url: '/accounts/:accountId',
    component: AccountPage,
    showInMenu: false,
    showBackButton: true,
  },
  {
    title: 'New Account',
    url: '/accounts/new',
    component: AccountPage,
    showInMenu: false,
    showBackButton: true,
  },
  {
    title: 'Accounts',
    url: '/accounts',
    iosIcon: cardOutline,
    mdIcon: cardSharp,
    component: AccountsPage,
    showInMenu: true,
  },
];
