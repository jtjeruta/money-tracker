import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const storage = new Storage({
  name: '__mydb',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage, CordovaSQLiteDriver._driver],
});

export const initDb = async () => {
  await storage.create();
  await storage.defineDriver(CordovaSQLiteDriver);
  return true;
};

export default storage;
