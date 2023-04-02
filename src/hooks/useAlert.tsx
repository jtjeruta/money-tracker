import { useIonAlert } from '@ionic/react';
import { useCallback } from 'react';

export const useAlert = () => {
  const [present] = useIonAlert();

  const alert = useCallback(
    (message: string) => {
      present({
        header: 'Alert',
        message,
        buttons: ['Ok'],
      });
    },
    [present],
  );

  return alert;
};
