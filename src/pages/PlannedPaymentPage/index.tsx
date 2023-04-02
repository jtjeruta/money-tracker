import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { useHistory, useParams } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { upsertPlannedPaymentAPI } from '../../apis/PlannedPaymentsAPI';
import { getPlannedPaymentAPI } from '../../apis/PlannedPaymentsAPI';
import { PlannedPayment } from '../../apis/types';
import Input from '../../components/Input';
import Card from '../../components/Card';
import FormActions from '../../components/FormActions';
import Select from '../../components/Select';
import DateInput from '../../components/DateInput';
import moment from 'moment';
import { listAccountsAPI } from '../../apis/AccountsAPI';

const schema = yup.object({
  name: yup.string().required(),
  amount: yup.number().required(),
  description: yup.string(),
  recurrence: yup.mixed().oneOf(['once', 'monthly', 'yearly']).required(),
  paymentDate: yup.date().required(),
  accountId: yup.string(),
});
type FormData = yup.InferType<typeof schema>;
type Recurrence = 'once' | 'monthly' | 'yearly';

const PlannedPaymentPage = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { paymentId } = useParams<{ paymentId: string }>();
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      recurrence: 'once',
      paymentDate: new Date(),
      accountId: '',
    },
  });

  const [paymentQuery, accountsQuery] = useQueries({
    queries: [
      {
        queryKey: ['get-payment', paymentId],
        queryFn: () => getPlannedPaymentAPI(paymentId),
        onSuccess: (data: PlannedPayment | null) => {
          if (!data) return;
          methods.setValue('name', data.name);
          methods.setValue('description', data.description);
          methods.setValue('amount', data.amount);
          methods.setValue('recurrence', data.recurrence);
          methods.setValue('paymentDate', moment(data.paymentDate * 1000).toDate());
          methods.setValue('accountId', data.accountId);
        },
      },
      {
        queryKey: ['list-accounts'],
        queryFn: () => listAccountsAPI(),
      },
    ],
  });

  const paymentMutation = useMutation({
    mutationFn: upsertPlannedPaymentAPI,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['list-payments'] });
      history.goBack();
    },
  });

  const onSubmit = (data: FormData) => {
    const { recurrence, paymentDate, ...rest } = data;
    const payment: PlannedPayment = {
      id: paymentId ?? uuidv4(),
      ...rest,
      recurrence: recurrence as Recurrence,
      paymentDate: moment(paymentDate).unix(),
    };

    paymentMutation.mutate(payment);
  };

  if (paymentQuery.isLoading || paymentMutation.isLoading || accountsQuery.isLoading) {
    return <Card className="mx-3">Loading...</Card>;
  }

  if (paymentQuery.isError || paymentMutation.isError || accountsQuery.isError) {
    return <Card className="mx-3 text-red-500">Something went wrong</Card>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 px-3">
          <Input label="Name" name="name" />
          <Input label="Description" name="description" />
          <Input label="Amount" name="amount" type="number" />
          <Select
            label="Recurrence"
            name="recurrence"
            options={[
              { label: 'Once', value: 'once' },
              { label: 'Monthly', value: 'monthly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
          />
          <DateInput label="Payment Date" name="paymentDate" />
          <Select
            label="Account"
            name="accountId"
            options={accountsQuery.data?.map((account) => ({
              label: account.name,
              value: account.id,
            }))}
          />
          <FormActions />
        </div>
      </form>
    </FormProvider>
  );
};

export default PlannedPaymentPage;
