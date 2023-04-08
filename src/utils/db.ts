import { Drivers, Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
const dbName = process.env.NODE_ENV === 'production' ? '__money_tracker' : '__money_tracker_dev';

const storage = new Storage({
  name: dbName,
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage, CordovaSQLiteDriver._driver],
});

export const initDb = async () => {
  await storage.create();
  await storage.defineDriver(CordovaSQLiteDriver);
  return true;
};

export default storage;
