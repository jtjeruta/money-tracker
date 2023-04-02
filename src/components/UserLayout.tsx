import { ReactNode } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

type Props = {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
};

const Page: React.FC<Props> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {props.showBackButton && (
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
          )}
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="py-3">{props.children}</div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
