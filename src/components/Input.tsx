import { FC } from 'react';
import { IonInput } from '@ionic/react';
import { useFormContext } from 'react-hook-form';
import FormGroup, { FormGroupProps } from './FormGroup';

type Props = FormGroupProps & React.ComponentProps<typeof IonInput> & { type?: 'text' | 'number' };

const Input: FC<Props> = ({ label, helperText, ...props }) => {
  const methods = useFormContext();
  const register = methods?.register(props.name);
  const inputProps = { ...props, ...register };
  return (
    <FormGroup {...{ label, helperText, name: props.name }}>
      <div className="border pl-3">
        <IonInput {...inputProps} />
      </div>
    </FormGroup>
  );
};

export default Input;
