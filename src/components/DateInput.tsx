import { FC } from 'react';
import { IonInput } from '@ionic/react';
import { Controller, useFormContext } from 'react-hook-form';
import FormGroup, { FormGroupProps } from './FormGroup';
import moment from 'moment';

type Props = FormGroupProps & Omit<React.ComponentProps<typeof IonInput>, 'type'>;

const Input: FC<Props> = ({ label, helperText, ...props }) => {
  const methods = useFormContext();

  return (
    <FormGroup {...{ label, helperText, name: props.name }}>
      <div className="border pl-3">
        <Controller
          control={methods.control}
          name={props.name}
          render={({ field: { value, ...rest } }) => (
            <IonInput
              type="date"
              {...rest}
              value={moment(value).format('YYYY-MM-DD')}
              onInput={(e) => methods.setValue(props.name, moment(e.currentTarget.value).format('YYYY-MM-DD'))}
            />
          )}
        />
      </div>
    </FormGroup>
  );
};

export default Input;
