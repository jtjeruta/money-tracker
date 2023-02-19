import { FC } from 'react';
import { IonTextarea } from '@ionic/react';
import FormGroup, { FormGroupProps } from './FormGroup';

type Props = FormGroupProps & React.ComponentProps<typeof IonTextarea>;

const TextArea: FC<Props> = ({ label, helperText, error, errorText, ...props }) => {
  return (
    <FormGroup {...{ label, helperText, error, errorText }}>
      <div className="border pl-3">
        <IonTextarea {...props} />
      </div>
    </FormGroup>
  );
};

export default TextArea;
