import { useIonAlert } from '@ionic/react';
import { useCallback } from 'react';

export const useConfirm = () => {
  const [present] = useIonAlert();

  const confirm = useCallback(
    (message: string, onConfirm: () => void) => {
      present({
        header: 'Confirm',
        message,
        buttons: [
          'Cancel',
          {
            text: 'Confirm',
            handler: onConfirm,
          },
        ],
      });
    },
    [present],
  );

  return confirm;
};
