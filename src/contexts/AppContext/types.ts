import { Storage } from '@ionic/storage';

export type SetStorage = {
  type: 'Set Storage';
  payload: Storage;
};

export type Actions = SetStorage;

export type State = {
  storage: Storage | null;
};

export type Context = { state: State; dispatch: React.Dispatch<Actions> } | null;
