import { IonButton } from '@ionic/react';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { listAccountsAPI } from '../../apis/AccountsAPI';
import { getRecordAPI } from '../../apis/RecordsAPI';
import { Record } from '../../apis/types';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';

type FormData = {
  name: string;
  amount: number;
  accountId: string;
  note: string;
};

const RecordPage = () => {
  const history = useHistory();
  const { recordId } = useParams<{ recordId: string }>();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    amount: 0,
    accountId: '',
    note: '',
  });

  const [recordQuery, accountsQuery] = useQueries({
    queries: [
      {
        queryKey: ['get-record', recordId],
        queryFn: () => getRecordAPI(recordId),
        onSuccess: (data: Record | null) =>
          data &&
          setFormData({
            name: data.name,
            amount: data.amount,
            accountId: data.accountId,
            note: data.note,
          }),
      },
      {
        queryKey: ['list-accounts'],
        queryFn: listAccountsAPI,
      },
    ],
  });

  if (recordQuery.isLoading || accountsQuery.isLoading) {
    return <div className="px-3">Loading...</div>;
  }

  if (recordQuery.isError || accountsQuery.isError) {
    return <div className="px-3">Error...</div>;
  }

  return (
    <div className="flex flex-col gap-3 px-3">
      <Input label="Name" name="name" value={formData.name} />
      <Input label="Amount" name="amount" value={formData.amount} />
      <Select
        label="Account"
        name="accountId"
        value={formData.accountId}
        options={accountsQuery.data.map((account) => ({ label: account.name, value: account.id }))}
      />
      <TextArea label="Note" name="note" value={formData.note} />
      <div className="flex gap-3">
        <IonButton color="medium" fill="outline" className="grow" onClick={() => history.goBack()}>
          Cancel
        </IonButton>
        <IonButton color="primary" className="grow">
          Save
        </IonButton>
      </div>
    </div>
  );
};

export default RecordPage;
