import wol from 'wakeonlan';

export async function turnOn(macAddress: string) {
  await wol(macAddress);
}
