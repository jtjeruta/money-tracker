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

export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  component: FC;
}

export const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
    component: HomePage,
  },
  {
    title: 'Records',
    url: '/records',
    iosIcon: listOutline,
    mdIcon: listSharp,
    component: RecordsPage,
  },
  {
    title: 'Planned Payments',
    url: '/planned-payments',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
    component: PlannedPaymentsPage,
  },
  {
    title: 'Debts',
    url: '/debts',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    component: DebtsPage,
  },
];
