import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import Menu from './components/Menu';
import { appPages } from './routes';
import UserLayout from './components/UserLayout';
import { initDb } from './utils/db';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme css */
import './theme/main.css';
import './theme/variables.css';

setupIonicReact();
const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  useQuery({
    queryKey: ['init-db'],
    queryFn: initDb,
  });

  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/" exact={true}>
            <Redirect to="/page/Home" />
          </Route>
          {appPages.map((route) => (
            <Route path={route.url} exact={true} key={route.url}>
              <UserLayout title={route.title}>
                <route.component />
              </UserLayout>
            </Route>
          ))}
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </IonApp>
  );
};

export default App;
