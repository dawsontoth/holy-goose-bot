import { dockStart } from '@nlpjs/basic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let nlp: any;

export async function prepareParser() {
  const dock = await dockStart();
  nlp = dock.get('nlp');
  await nlp.train();
}

export async function parseMessage(message: string) {
  return nlp.process('en', message);
}
