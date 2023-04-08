import { FC } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import FormGroup, { FormGroupProps } from './FormGroup';
import { useFormContext } from 'react-hook-form';

type Props = FormGroupProps &
  Omit<React.ComponentProps<typeof IonSelect>, 'children'> & {
    options: {
      label: string;
      value: string | number;
    }[];
  };

const Select: FC<Props> = ({ label, helperText, options, ...props }) => {
  const methods = useFormContext();
  const { onChange, onBlur, ...register } = methods?.register(props.name);
  const inputProps = { ...props, onIonChange: onChange, onIonBlur: onBlur, ...register };
  return (
    <FormGroup {...{ label, helperText, name: props.name }}>
      <IonSelect style={{ padding: 13 }} className="border" {...inputProps}>
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </FormGroup>
  );
};

export default Select;
