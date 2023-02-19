import { IonIcon } from '@ionic/react';
import { addOutline, add } from 'ionicons/icons';
import { FC } from 'react';

type Props = {
  onClick: () => void;
};

const ActionButton: FC<Props> = (props) => {
  return (
    <div className="absolute right-5 bottom-5">
      <button className='bg-blue-500 text-white rounded-full px-4 py-3' onClick={props.onClick}>
        <IonIcon ios={addOutline} md={add} size="large" style={{ transform: 'translateY(2.5px)'}}/>
      </button>
    </div>
  );
};

export default ActionButton;
