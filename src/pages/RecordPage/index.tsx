import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useHistory, useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { listAccountsAPI } from '../../apis/AccountsAPI';
import { getRecordAPI, upsertRecordAPI } from '../../apis/RecordsAPI';
import { Account, Record } from '../../apis/types';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import { FormProvider, useForm } from 'react-hook-form';
import moment from 'moment';
import FormActions from '../../components/FormActions';
import DateInput from '../../components/DateInput';

const schema = yup
  .object({
    name: yup.string(),
    amount: yup.number().min(0).required(),
    accountId: yup.string().required(),
    note: yup.string(),
    date: yup.date().required(),
    type: yup.string().oneOf(['income', 'expense', 'transfer']).required(),
    transferAccountId: yup.string(),
  })
  .test((data, ctx) => {
    if (data.accountId === data.transferAccountId) {
      return ctx.createError({ path: 'transferAccountId', message: 'From and To accounts cannot be the same' });
    }
    return true;
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const RecordPage = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { recordId } = useParams<{ recordId: string }>();
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', type: 'expense', amount: 0, accountId: '', note: '', date: new Date() },
  });

  const recordQuery = useQuery({
    queryKey: ['get-record', recordId],
    queryFn: () => getRecordAPI(recordId),
    onSuccess: (data: Record | null) => {
      if (!data) return;
      methods.setValue('name', data.name);
      methods.setValue('amount', data.amount);
      methods.setValue('accountId', data.accountId);
      methods.setValue('note', data.note);
      methods.setValue('date', moment.unix(data.date).toDate());
      methods.setValue('type', data.type);
      methods.setValue('transferAccountId', data.transferAccountId);
    },
  });

  const accountsQuery = useQuery({
    queryKey: ['list-accounts'],
    queryFn: listAccountsAPI,
    onSuccess: (data: Account[] | null) => {
      if (!data || data.length < 1 || recordId) return;
      methods.setValue('accountId', data[0].id);
    },
    enabled: !recordQuery.isLoading && !recordQuery.isError,
  });

  const recordMutation = useMutation({
    mutationFn: upsertRecordAPI,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['list-records'] });
      await queryClient.invalidateQueries({ queryKey: ['list-accounts'] });
      history.goBack();
    },
  });

  const onSubmit = (data: FormData) => {
    const id = recordId ?? uuidv4();
    const date = moment(data.date).unix();
    recordMutation.mutate({ ...data, id, date });
  };

  if (recordQuery.isLoading || accountsQuery.isLoading || recordMutation.isLoading) {
    return <div className="px-3">Loading...</div>;
  }

  if (recordQuery.isError || accountsQuery.isError || recordMutation.isError) {
    return <div className="px-3">Error...</div>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 px-3">
          <Select
            label="Type"
            name="type"
            options={[
              { label: 'Income', value: 'income' },
              { label: 'Expense', value: 'expense' },
              { label: 'Transfer', value: 'transfer' },
            ]}
          />
          <Input label="Amount" name="amount" type="number" />
          {methods.watch('type') === 'transfer' ? (
            <>
              <Select
                label="From Account"
                name="accountId"
                options={accountsQuery.data?.map((account) => ({ label: account.name, value: account.id })) ?? []}
              />
              <Select
                label="To Account"
                name="transferAccountId"
                options={accountsQuery.data?.map((account) => ({ label: account.name, value: account.id })) ?? []}
              />
            </>
          ) : (
            <>
              <Input label="Name" name="name" />
              <Select
                label="Account"
                name="accountId"
                options={accountsQuery.data?.map((account) => ({ label: account.name, value: account.id })) ?? []}
              />
            </>
          )}
          <DateInput label="Date" name="date" />
          <TextArea label="Note" name="note" />
          <FormActions />
        </div>
      </form>
    </FormProvider>
  );
};

export default RecordPage;
