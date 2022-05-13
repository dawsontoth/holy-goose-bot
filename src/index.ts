import { connectToDatabase } from './db';
import { startParser } from './parsing';
import { connectToSlack } from './slack';

(async () => {
  await connectToDatabase();
  await startParser();
  await connectToSlack();
  console.log('⚡️ The Holy Goose is in flight!');
})();
