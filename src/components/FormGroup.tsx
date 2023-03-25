import { FC } from 'react';
import { IonLabel } from '@ionic/react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

export type FormGroupProps = {
  name: string;
  label?: string;
  helperText?: string;
};

type Props = FormGroupProps & {
  children: React.ReactNode;
};

const FormGroup: FC<Props> = (props) => {
  const methods = useFormContext();
  const error = methods?.formState.errors[props.name]?.message?.toString();
  const helperText = error ?? props.helperText;

  return (
    <div>
      {props.label && <IonLabel>{props.label}</IonLabel>}
      {props.children}
      <em className={classNames(error && 'text-red-900 dark:text-white')}>{helperText}</em>
    </div>
  );
};

export default FormGroup;
