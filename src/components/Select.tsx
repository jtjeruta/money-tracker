import { FC } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import FormGroup, { FormGroupProps } from './FormGroup';

type Props = FormGroupProps &
  Omit<React.ComponentProps<typeof IonSelect>, 'children'> & {
    options: {
      label: string;
      value: string | number;
    }[];
  };

const Select: FC<Props> = ({ label, helperText, options, ...props }) => {
  return (
    <FormGroup {...{ label, helperText, name: props.name }}>
      <IonSelect style={{ padding: 13 }} className="border" {...props}>
        {options.map((option) => (
          <IonSelectOption value={option.value}>{option.label}</IonSelectOption>
        ))}
      </IonSelect>
    </FormGroup>
  );
};

export default Select;
