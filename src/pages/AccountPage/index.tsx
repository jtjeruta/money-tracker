import { IonButton } from '@ionic/react';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { useHistory, useParams } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { upsertAccountAPI } from '../../apis/AccountsAPI';
import { getAccountAPI } from '../../apis/AccountsAPI';
import { Account } from '../../apis/types';
import Input from '../../components/Input';
import Card from '../../components/Card';

const schema = yup
  .object({
    name: yup.string().required(),
    balance: yup.number().min(0).integer().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const AccountPage = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { accountId } = useParams<{ accountId: string }>();
  const isNew = accountId === 'new';
  const methods = useForm<FormData>({ resolver: yupResolver(schema), defaultValues: { name: '', balance: 0 } });

  const [accountQuery] = useQueries({
    queries: [
      {
        queryKey: ['get-account', accountId],
        queryFn: () => getAccountAPI(accountId),
        onSuccess: (data: Account | null) => {
          if (!data) return;
          methods.setValue('name', data.name);
          methods.setValue('balance', data.balance);
        },
      },
    ],
  });

  const accountMutation = useMutation({
    mutationFn: upsertAccountAPI,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['list-accounts'] });
      history.goBack();
    },
  });

  const onSubmit = (data: FormData) => {
    const id = isNew ? uuidv4() : accountId;
    accountMutation.mutate({ id, ...data });
  };

  if (accountQuery.isLoading || accountMutation.isLoading) {
    return <Card className="mx-3">Loading...</Card>;
  }

  if (accountQuery.isError || accountMutation.isError) {
    return <Card className="mx-3 text-red-500">Something went wrong</Card>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 px-3">
          <Input label="Name" name="name" />
          <Input label="Balance" name="balance" type="number" />
          <div className="flex gap-3">
            <IonButton type="button" color="medium" fill="outline" className="grow" onClick={() => history.goBack()}>
              Cancel
            </IonButton>
            <IonButton type="submit" color="primary" className="grow">
              Save
            </IonButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AccountPage;
