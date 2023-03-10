import { FC } from 'react';
import {
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
import DebtsPage from './pages/Debts';
import RecordPage from './pages/RecordPage';

export type BasePage = {
  url: string;
  title: string;
  component: FC;
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
    title: 'Update Record',
    url: '/records/:recordId',
    component: RecordPage,
    showInMenu: false,
  },
  {
    title: 'New Record',
    url: '/records/new',
    component: RecordPage,
    showInMenu: false,
  },
];
