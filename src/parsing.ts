import { dockStart } from '@nlpjs/basic';
import { computerOptions } from './computer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let nlp: any;

export async function prepareParser() {
  const dock = await dockStart();
  nlp = dock.get('nlp');
  nlp.addEntities({ computer: { options: computerOptions } }, 'en-US');
  await nlp.train();
}

export async function parseMessage(message: string) {
  return nlp.process('en', message);
}
