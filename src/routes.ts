import { FC } from 'react';
import {
  archiveOutline,
  archiveSharp,
  heartOutline,
  heartSharp,
  homeOutline,
  homeSharp,
  listOutline,
  listSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';
import Page from './pages/Page';
import HomePage from './pages/HomePage';

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
    url: '/page/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
    component: HomePage,
  },
  {
    title: 'Records',
    url: '/page/Records',
    iosIcon: listOutline,
    mdIcon: listSharp,
    component: Page,
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
    component: Page,
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    component: Page,
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    component: Page,
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
    component: Page,
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
    component: Page,
  },
];
