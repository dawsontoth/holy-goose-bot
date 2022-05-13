import { dockStart } from '@nlpjs/basic';
import { findComputerOptions } from './db';

let nlp: {
  addEntities;
  train;
  process: (
    language: string,
    message: string
  ) => { intent: string; answer: string; entities };
};

export async function startParser() {
  const dock = await dockStart();
  nlp = dock.get('nlp');
  nlp.addEntities(
    { computer: { options: await findComputerOptions() } },
    'en-US'
  );
  await nlp.train();
}

export async function parseMessage(message: string) {
  return nlp.process('en', message);
}
