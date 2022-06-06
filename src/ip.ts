import { networkInterfaces } from 'os';

export function getLocalIP(): string | null {
  const ips: string[] = [];
  const interfaces = networkInterfaces();
  for (const currentInterface of Object.values(interfaces)) {
    if (!currentInterface) {
      continue;
    }
    for (const interfaceInfo of currentInterface) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        // ips.push(interfaceInfo.address);
        return interfaceInfo.address;
      }
    }
  }
  return null;
}
