export function formatUnixTimeToLocal(unixTimestamp: number, timezoneOffset: number): string {
  const localTime = new Date((unixTimestamp + timezoneOffset) * 1000);

  const hours = localTime.getUTCHours().toString().padStart(2, '0');
  const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function convertFromMStoKMH(metersPerSecond: number): number {
  return metersPerSecond * 3.6;
}
