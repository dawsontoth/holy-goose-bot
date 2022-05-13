if (!process.env.SLACK_BOT_TOKEN) {
  throw new Error('Please define SLACK_BOT_TOKEN env variable!');
}
if (!process.env.SLACK_SIGNING_SECRET) {
  throw new Error('Please define SLACK_SIGNING_SECRET env variable!');
}
if (!process.env.MONGO_USERNAME) {
  throw new Error('Please define MONGO_USERNAME env variable!');
}
if (!process.env.MONGO_PASSWORD) {
  throw new Error('Please define MONGO_PASSWORD env variable!');
}

export const token = process.env.SLACK_BOT_TOKEN;
export const appToken = process.env.SLACK_APP_TOKEN;
export const signingSecret = process.env.SLACK_SIGNING_SECRET;
export const mongoUsername = process.env.MONGO_USERNAME;
export const mongoPassword = process.env.MONGO_PASSWORD;
