# Space Traders SDK

A JavaScript/TypeScript SDK for the [Space Traders API](https://spacetraders.io/), a game build for (aspiring) software developers.
Simply use HTTP requests to trade goods, mine resources, and explore the universe with your own fleet of spaceships.

**Features**

* Complete and fully typed
* Simple and lightweight

**But there are already a bunch of SDKs out there, why another one?**

This package focuses on improving the developer experience compared to existing SDKs.
Most other packages are generated automatically using the OpenAPI Generator CLI, which can lead to less user-friendly interfaces.
While this SDK also uses the OpenAPI spec, it only relies on [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) to generate types.
A custom script generates the SDK code itself.
This approach results in a simpler, more lightweight SDK that’s still easy to maintain and keep aligned with future changes to the Space Traders API.

## Installation

```shell
npm install @wwaaijer/space-traders-sdk
```
## Usage

Agent registration:

```typescript
import { SpaceTradersSdk } from '@wwaaijer/space-traders-sdk';

const api = new SpaceTradersSdk();
const registerResponse = await api.register({
  symbol: 'BADGER',
  faction: 'COSMIC',
});

const token = registerResponse.token;
console.log(token);
```

Usage after registration (simulating one of the tutorial steps, finding and purchasing a mining drone):
  
```typescript
import { SpaceTradersSdk } from '@wwaaijer/space-traders-sdk';

const api = new SpaceTradersSdk({ token: '<your token here>' });

const agent = await api.getMyAgent();
console.log(`Logged in as ${agent.symbol}, headquartered at ${agent.headquarters}`);

const hqWaypoint = agent.headquarters;
const hqSystem = hqWaypoint.split('-').slice(0, 2).join('-'); // Get the system symbol from the waypoint symbol

const waypointsResponse = await api.getSystemWaypoints(hqSystem, { traits: 'SHIPYARD', limit: 20 });
console.log(`Found ${waypointsResponse.meta.total} shipyard waypoints in ${hqSystem}`);

let miningDroneShipyard;
for (const shipyardWaypoint of waypointsResponse.data) {
  const shipyard = await api.getShipyard(hqSystem, shipyardWaypoint.symbol);
  if (shipyard.shipTypes.some(shipType => shipType.type === 'SHIP_MINING_DRONE')) {
    miningDroneShipyard = shipyard;
    break;
  }
}

if (!miningDroneShipyard) {
  throw new Error('No mining drone shipyard found');
}

const purchaseResponse = await api.purchaseShip({
  waypointSymbol: miningDroneShipyard.symbol,
  shipType: 'SHIP_MINING_DRONE'
});

const ship = purchaseResponse.ship;
console.log(`Purchased mining drone: ${ship.symbol}`);
```

All `components.schemas` mentioned in the API spec are exported as types in the `SpaceTradersSchemas` interface.
For instance, this can be used to type your function arguments working with Space Trader entities.

```typescript
import type { SpaceTradersSchemas } from '@wwaaijer/space-traders-sdk';

export function getAgentCredits(agent: SpaceTradersSchemas['Agent']) {
  return agent.credits;
}
```

## Method overview

All methods map 1:1 to the Space Traders API endpoints.
Names are based one the operation ID in the OpenAPI spec.
Path parameters are passed as arguments, query parameters and request bodies are passed as objects.
If an endpoint only responds with a data object, the method will return that object.

```javascript
getStatus();
register(requestBody)
getSystems(query)
getSystem(systemSymbol)
getSystemWaypoints(systemSymbol, query)
getWaypoint(systemSymbol, waypointSymbol)
getMarket(systemSymbol, waypointSymbol)
getShipyard(systemSymbol, waypointSymbol)
getJumpGate(systemSymbol, waypointSymbol)
getConstruction(systemSymbol, waypointSymbol)
supplyConstruction(systemSymbol, waypointSymbol, requestBody)
getFactions(query)
getFaction(factionSymbol)
getMyAgent()
getAgents(query)
getAgent()
getContracts(query)
getContract(contractId)
acceptContract(contractId)
deliverContract(contractId, requestBody)
fulfillContract(contractId)
getMyShips(query)
purchaseShip(requestBody)
getMyShip(shipSymbol)
getMyShipCargo(shipSymbol)
orbitShip(shipSymbol)
shipRefine(shipSymbol, requestBody)
createChart(shipSymbol)
getShipCooldown(shipSymbol)
dockShip(shipSymbol)
createSurvey(shipSymbol)
extractResources(shipSymbol, requestBody)
siphonResources(shipSymbol)
extractResourcesWithSurvey(shipSymbol, requestBody)
jettison(shipSymbol, requestBody)
jumpShip(shipSymbol, requestBody)
navigateShip(shipSymbol, requestBody)
patchShipNav(shipSymbol, requestBody)
getShipNav(shipSymbol)
warpShip(shipSymbol, requestBody)
sellCargo(shipSymbol, requestBody)
createShipSystemScan(shipSymbol)
createShipWaypointScan(shipSymbol)
createShipShipScan(shipSymbol)
refuelShip(shipSymbol, requestBody)
purchaseCargo(shipSymbol, requestBody)
transferCargo(shipSymbol, requestBody)
negotiateContract(shipSymbol)
getMounts(shipSymbol)
installMount(shipSymbol, requestBody)
removeMount(shipSymbol, requestBody)
getScrapShip(shipSymbol)
scrapShip(shipSymbol)
getRepairShip(shipSymbol)
repairShip(shipSymbol)
```

## Regenerating the SDK source code
```shell
npm install
npm run fetch-spec
npm run build
# Bump version
npm publish --access public
```