import { ReactNode } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

type Props = {
  children: ReactNode;
  title: string;
};

const Page: React.FC<Props> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{props.title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="p-6">{props.children}</div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
