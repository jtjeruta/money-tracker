import db, { initDb } from '../utils/db';

beforeEach(async () => {
  await initDb();
  await db.clear();
});
