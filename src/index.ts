import { prepareParser } from './parsing';
import { connectToSlack } from './slack';

(async () => {
  await prepareParser();
  await connectToSlack();
  console.log('⚡️ The Holy Goose is in flight!');
})();
