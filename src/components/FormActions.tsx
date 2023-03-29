import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router';

const FormActions = () => {
  const history = useHistory();
  return (
    <div className="flex gap-3">
      <IonButton color="medium" fill="outline" className="grow" onClick={() => history.goBack()}>
        Cancel
      </IonButton>
      <IonButton type="submit" color="primary" className="grow">
        Save
      </IonButton>
    </div>
  );
};

export default FormActions;
