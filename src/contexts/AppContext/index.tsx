import React from 'react';
import { Drivers, Storage } from '@ionic/storage';
import { useQuery } from '@tanstack/react-query';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import * as Types from './types';

const initialState: Types.State = {
  storage: null,
};

const reducer = (state: Types.State, action: Types.Actions) => {
  switch (action.type) {
    case 'Set Storage':
      return { ...state, storage: action.payload };
    default:
      return state;
  }
};

const AppContext = React.createContext<Types.Context>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useQuery({
    queryKey: ['init-store'],
    queryFn: async () => {
      const storage = new Storage({
        driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage],
      });
      await storage.create();
      await storage.defineDriver(CordovaSQLiteDriver);
      dispatch({ type: 'Set Storage', payload: storage });
      return storage;
    },
  });

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

const useAppContext = () => React.useContext(AppContext);

export { AppContextProvider, useAppContext };
