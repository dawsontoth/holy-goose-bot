import wol from 'wakeonlan';

export const computerOptions = {
  'Stream-Rig': ['stream', 'streaming', 'streamer', 'stream-rig'],
  'Sound-Rig': ['audio', 'audio-rig', 'sound', 'sounds', 'sound-rig'],
  'Resolume-Rig': ['resolume-rig', 'resolume'],
  'Chapel-Rig': ['chapel-rig', 'chapel'],
  'Kid-Rig': ['kid-rig', 'kid'],
  'Lighting-Rig': [
    'light',
    'light-rig',
    'lights',
    'lights-rig',
    'lighting',
    'lighting-rig',
  ],
  'IMAG-Rig': [
    'imag-rig',
    'imag',
    'projection',
    'slides',
    'prop',
    'propresenter',
    'pc',
    'mac',
    'mini',
    'macmini',
    'mac-mini',
  ],
};

const macAddresses: Record<keyof typeof computerOptions, string> = {
  'Stream-Rig': 'b4:2e:99:ef:c0:6c',
  'Resolume-Rig': '2c:f0:5d:06:89:ab',
  'Sound-Rig': '20:cf:30:75:ca:0f',
  'Lighting-Rig': '1c:1b:b5:0e:dd:19',
  'IMAG-Rig': '14:98:77:31:87:85',
  'Chapel-Rig': '14:98:77:3d:be:d9',
  'Kid-Rig': 'TODO',
};

export async function turnOn(
  computerName: keyof typeof computerOptions
): Promise<boolean> {
  if (macAddresses[computerName]) {
    await wol(macAddresses[computerName]);
    return true;
  }
  return false;
}
