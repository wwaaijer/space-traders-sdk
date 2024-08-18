# Space Traders SDK

This is a JavaScript/TypeScript SDK for the [Space Traders API](https://spacetraders.io/), a game made for (aspiring) software developers.  
Just by performing HTTP requests you can trade goods, mine resources, and explore with your own fleet of space ships.

**But there are already a bunch of SDKs out there, why another one?**

This packages tries to provide a better developer experience than the OpenAPI Generator generated ones already out there.  
Although this SDK is also generated from the OpenAPI spec, it is using [openapi-typescript](https://github.com/openapi-ts/openapi-typescript), only to generate types.  
There is a custom script which generates the SDK code itself, referencing those generated types.  
This provides a simple, lightweight SDK that feels more handmade and is easy to keep in sync with Space Traders API changes.

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

Usage after registration: (simulating one of the tutorial steps, finding and purchasing a mining drone)
  
```typescript
import { SpaceTradersSdk } from '@wwaaijer/space-traders-sdk';

const api = new SpaceTradersSdk({ token });

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
# Publish 
```