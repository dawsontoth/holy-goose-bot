import { Collection, Db, MongoClient } from 'mongodb';
import { mongoPassword, mongoUsername } from './env';

const client = new MongoClient(
  `mongodb://${mongoUsername}:${mongoPassword}@mongo:27017`
);
let db: Db;
let addresses: Collection;

interface Computer {
  computerName: string;
  macAddress: string;
}

export async function connectToDatabase() {
  await client.connect();
  db = client.db('holy-goose');
  addresses = db.collection('mac-addresses');
}

export async function setComputer(computerName: string, macAddress: string) {
  await addresses.findOneAndUpdate(
    { computerName },
    { $set: { macAddress } },
    { upsert: true }
  );
}

export async function removeComputer(computerName: string) {
  await addresses.deleteOne({ computerName });
}

export async function findComputers(): Promise<Record<string, string>> {
  const documents = await addresses.find<Computer>({}, { limit: 0 }).toArray();
  const result: Record<string, string> = {};
  for (const document of documents) {
    result[document.computerName] = document.macAddress;
  }
  return result;
}

export async function findComputerOptions(): Promise<Record<string, string[]>> {
  const documents = await addresses.find<Computer>({}, { limit: 0 }).toArray();
  const result: Record<string, string[]> = {};
  for (const document of documents) {
    result[document.computerName] = [
      document.computerName,
      document.computerName.replace(/-Rig$/i, ''),
    ];
    if (document.computerName === 'IMAG') {
      result[document.computerName].push('ProPresenter');
      result[document.computerName].push('ProP');
      result[document.computerName].push('Projection');
    }
  }
  return result;
}

export async function findMacAddress(
  computerName: string
): Promise<undefined | string> {
  const response = await addresses.findOne<Computer>({ computerName });
  return response?.macAddress;
}
