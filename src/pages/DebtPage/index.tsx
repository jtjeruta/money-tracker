import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { useHistory, useParams } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { getDebtAPI, upsertDebtAPI } from '../../apis/DebtsAPI';
import { Debt } from '../../apis/types';
import Input from '../../components/Input';
import Card from '../../components/Card';
import FormActions from '../../components/FormActions';
import moment from 'moment';
import TextArea from '../../components/TextArea';
import DateInput from '../../components/DateInput';

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string(),
    toPayAmount: yup.number().min(0).required(),
    date: yup.date().required(),
    forgiven: yup.boolean(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const DebtPage = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { debtId } = useParams<{ debtId: string }>();
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', description: '', toPayAmount: 0, date: new Date(), forgiven: false },
  });

  const [debtQuery] = useQueries({
    queries: [
      {
        queryKey: ['get-debt', debtId],
        queryFn: () => getDebtAPI(debtId),
        onSuccess: (data: Debt | null) => {
          if (!data) return;
          methods.setValue('name', data.name);
          methods.setValue('description', data.description);
          methods.setValue('toPayAmount', data.toPayAmount);
          methods.setValue('date', new Date(data.date * 1000));
        },
      },
    ],
  });

  const debtMutation = useMutation({
    mutationFn: upsertDebtAPI,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['list-debts'] });
      history.goBack();
    },
  });

  const onSubmit = (data: FormData) => {
    debtMutation.mutate({
      ...data,
      id: debtId ?? uuidv4(),
      date: moment(data.date).unix(),
      forgiven: !!data.forgiven,
      description: data.description ?? '',
    });
  };

  if (debtQuery.isLoading || debtMutation.isLoading) {
    return <Card className="mx-3">Loading...</Card>;
  }

  if (debtQuery.isError || debtMutation.isError) {
    return <Card className="mx-3 text-red-500">Something went wrong</Card>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 px-3">
          <Input label="Name" name="name" />
          <Input label="To pay amount" name="toPayAmount" type="number" />
          <DateInput label="Date" name="date" />
          <TextArea label="Description" name="description" />
          <FormActions />
        </div>
      </form>
    </FormProvider>
  );
};

export default DebtPage;
