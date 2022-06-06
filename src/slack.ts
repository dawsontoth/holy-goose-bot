import { App, SayFn } from '@slack/bolt';
import { turnOn } from './computer';
import {
  findComputers,
  findMacAddress,
  removeComputer,
  setComputer,
} from './db';
import { appToken, signingSecret, token } from './env';
import { getLocalIP } from './ip';
import { parseMessage, startParser } from './parsing';

const app = new App({
  token,
  appToken,
  signingSecret,
  socketMode: true,
  // logLevel: LogLevel.DEBUG,
});

app.error(async error => {
  console.error(error);
});

app.message(/.+/, async ({ message, say }) => {
  const text = (message as any)?.text;
  if (text) {
    await handleMessage(text, say);
  }
});

app.event('app_mention', async ({ event, context, client, say }) => {
  const text = event?.text;
  if (text) {
    // Get rid of the direct mention <app-id> prefix.
    await handleMessage(text.slice(text.indexOf('>') + 2), say);
  }
});

async function handleMessage(message: string, say: SayFn) {
  const parts = message.split(' ');
  const response = await parseMessage(message);

  switch (response.intent) {
    case 'agent.canyouhelp':
      await say(response.answer);
      await say(
        'Here are some helpful commands:\n\n' +
          [
            '- turn on {computer name}',
            '- please list computers',
            '- please set computer {computer name} {mac address}',
            '- please remove computer {computer name}',
          ].join('\n')
      );
      break;
    case 'computer.ip':
      const ip = getLocalIP();
      if (ip) {
        await say(response.answer.replace('@ip', ip));
      } else {
        await say(
          "I couldn't not find the ip address for this computer! How strange..."
        );
      }
      break;
    case 'computer.power':
      const macAddress = await findMacAddress(response.entities?.[0]?.option);
      if (macAddress) {
        await say(response.answer);
        await turnOn(macAddress);
      } else {
        await say("I couldn't not find a mac address for that computer!");
      }
      break;
    case 'computer.list':
      await say(response.answer);
      await say(
        '```' + JSON.stringify(await findComputers(), null, '\t') + '```'
      );
      break;
    case 'computer.set':
      const name = parts[3];
      const mac = parts[4];
      await say(response.answer);
      await setComputer(name, mac);
      await startParser();
      break;
    case 'computer.remove':
      const computer = parts[3];
      await say(response.answer);
      await removeComputer(computer);
      await startParser();
      break;
  }
}

export async function connectToSlack() {
  return app.start();
}
