import { App, SayFn } from '@slack/bolt';
import { appToken, signingSecret, token } from './env';
import { parseMessage } from './parsing';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const response = await parseMessage(message);
  if (response.intent === 'computer.power') {
    // TODO: Need to send WOL packet.
    // TODO: It would be nice if these weren't hard coded, huh?
    switch (response.entities?.[0]?.option) {
      case 'Stream-Rig':
        break;
      case 'Sound-Rig':
        break;
      case 'Lighting-Rig':
        break;
      case 'IMAG-Rig':
        break;
      case 'Chapel-Rig':
        break;
      case 'Kid-Rig':
        break;
    }
  }
  await say(response.answer);
}

export async function connectToSlack() {
  return app.start();
}
