import { FC } from 'react';
import { IonInput } from '@ionic/react';
import FormGroup, { FormGroupProps } from './FormGroup';

type Props = FormGroupProps & React.ComponentProps<typeof IonInput>;

const Input: FC<Props> = ({ label, helperText, error, errorText, ...props }) => {
  return (
    <FormGroup {...{ label, helperText, error, errorText }}>
      <div className="border pl-3">
        <IonInput {...props} />
      </div>
    </FormGroup>
  );
};

export default Input;
