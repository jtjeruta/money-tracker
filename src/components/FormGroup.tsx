import { FC } from 'react';
import { IonLabel } from '@ionic/react';
import classNames from 'classnames';

export type FormGroupProps = {
  label?: string;
  helperText?: string;
  error?: string
  errorText?: string;
};

type Props = FormGroupProps & {
    children: React.ReactNode;
}

const FormGroup: FC<Props> = (props) => {
  return (
    <div>
      {props.label && <IonLabel>{props.label}</IonLabel>}
      {props.children}
      <em className={classNames(props.error && 'text-danger')}>{props.errorText ?? props.helperText}</em>
    </div>
  );
};

export default FormGroup;
