export function systemSymbolFromWaypointSymbol(waypointSymbol: string) {
  const parts = waypointSymbol.split('-');
  if (parts.length !== 3) {
    throw new Error(`Expected a waypoint symbol formatted like "XXX-XXX-XXX". Got ${waypointSymbol}`);
  }

  return `${parts[0]}-${parts[1]}`;
}
