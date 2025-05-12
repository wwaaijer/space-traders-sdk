# SpaceTraders SDK

An SDK for the [SpaceTraders API](https://spacetraders.io/), a game for (aspiring) software developers.

**Features**

* Complete and fully typed
* Simple and lightweight
* Automatically generated but with a handcrafted feel

## Installation

```shell
npm install @wwaaijer/space-traders-sdk
```
## Usage

First, register an account at the [SpaceTraders Dashboard](https://my.spacetraders.io/) and generate an agent token.

Then, for example, list the credits of your agent:

```typescript
import { SpaceTradersSdk } from '@wwaaijer/space-traders-sdk';

const api = new SpaceTradersSdk({ token: '<your agent token here>' });

const agent = await api.getMyAgent();
console.log(`Logged in as ${agent.symbol}, with ${agent.headquarters} credits`);
```

Or completing one of the tutorial steps, finding and purchasing a mining drone:
  
```typescript
import { SpaceTradersSdk } from '@wwaaijer/space-traders-sdk';

const api = new SpaceTradersSdk({ token: '<your agent token here>' });

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

All methods map 1:1 to the SpaceTraders API endpoints.
Names are based one the operation ID in the OpenAPI spec.
Path parameters are passed as arguments, query parameters and request bodies are passed as objects.
If an endpoint only responds with a data object, the method will return that object.

Last updated for SpaceTraders v2.3.0 API changes of 2025-05-11.

```javascript
getFactions(query?)
getFaction(factionSymbol)
getAgents(query?)
getAgent(agentSymbol)
getSupplyChain()
getStatus()
getSystems(query?)
getSystem(systemSymbol)
getSystemWaypoints(systemSymbol, query?)
getWaypoint(waypointSymbol)
getConstruction(waypointSymbol)
supplyConstruction(waypointSymbol, requestBody)
getMarket(waypointSymbol)
getJumpGate(waypointSymbol)
getShipyard(waypointSymbol)
getContracts(query?)
getContract(contractId)
acceptContract(contractId)
fulfillContract(contractId)
deliverContract(contractId, requestBody)
getMyFactions(query?)
getMyAgent()
getMyAgentEvents()
getMyShips(query?)
purchaseShip(requestBody)
getMyAccount()
getMyShip(shipSymbol)
createChart(shipSymbol)
negotiateContract(shipSymbol)
getShipCooldown(shipSymbol)
dockShip(shipSymbol)
extractResources(shipSymbol)
extractResourcesWithSurvey(shipSymbol, requestBody)
jettison(shipSymbol, requestBody)
jumpShip(shipSymbol, requestBody)
createShipSystemScan(shipSymbol)
createShipWaypointScan(shipSymbol)
createShipShipScan(shipSymbol)
scrapShip(shipSymbol)
getScrapShip(shipSymbol)
navigateShip(shipSymbol, requestBody)
warpShip(shipSymbol, requestBody)
orbitShip(shipSymbol)
purchaseCargo(shipSymbol, requestBody)
shipRefine(shipSymbol, requestBody)
refuelShip(shipSymbol, requestBody)
repairShip(shipSymbol)
getRepairShip(shipSymbol)
sellCargo(shipSymbol, requestBody)
siphonResources(shipSymbol)
createSurvey(shipSymbol)
transferCargo(shipSymbol, requestBody)
getMyShipCargo(shipSymbol)
getShipModules(shipSymbol)
installShipModule(shipSymbol, requestBody)
removeShipModule(shipSymbol, requestBody)
getMounts(shipSymbol)
installMount(shipSymbol, requestBody)
removeMount(shipSymbol, requestBody)
getShipNav(shipSymbol)
patchShipNav(shipSymbol, requestBody)
register(requestBody)
```

## Errors

To handle certain expected errors in your logic you can test for `SpaceTradersError`s and identify them with `SpaceTradersErrorCode`.
See https://docs.spacetraders.io/api-guide/response-errors for more information.

```ts
import { SpaceTradersError, SpaceTradersErrorCode } from '@wwaaijer/space-traders-sdk';

try {
  await api.createSurvey(shipSymbol);
} catch(error) {
  if (error instanceof SpaceTradersError) {
    if (error.code === SpaceTradersErrorCode.shipSurveyWaypointTypeError) {
      const allowed = error.data.waypointTypes; // Use error data returned by the API
      console.log(`Yikes, should have surveyed one of ${allowed.join(', ')} instead`);
    }
  }
}
```

## Rate limiting

The SDK will automatically handle rate limiting for you.
It will spread out requests consistently over the 2 requests per second and 30 requests per minute limits.
If the rate limit is exceeded, the SDK will automatically retry the requests which are rate limited.

## Logging

Requests and responses can be viewed by setting a callback for the `onRequest` and/or `onResponse` options.
These callbacks will receive all request made by the `SpaceTradersSdk` instance or any response received by the instance. 

```ts
import { SpaceTradersSdk } from '@wwaaijer/space-traders-sdk';

const api = new SpaceTradersSdk({
  onRequest(request) {
    console.log('Request:', request);
  },
  onResponse(response) {
    console.log('Response:', response);
  },
});

await api.getStatus();
// Request: {
//   method: 'GET',
//   path: '/',
//   query: undefined,
//   requestBody: undefined,
// }
// Response: {
//   request: {
//     method: 'GET',
//     path: '/',
//     query: undefined,
//     requestBody: undefined,
//   },
//   responseBody: { ... } 
// }
```

In a similar fashion all operation calls and their results can be viewed as well.
Supply a `onOperationStart` or `onOperationResult` callback if you want to keep track of either:
```ts
import { SpaceTradersSdk } from '@wwaaijer/space-traders-sdk';

const api = new SpaceTradersSdk({
  onOperationStart(operation) {
    console.log('Operation start:', operation);
  },
  onOperationResult(operation) {
    console.log('Operation result:', operation);

    // Bonus! `operation` is typed (for both methods)
    if (operation.operationName === 'getStatus') {
      operation.result.announcements[0].title; // Is known to TypeScript to be a string
    }
  },
});

await api.getStatus();
// Operation start: {
//   operationName: 'getStatus',
//   arguments: [],
// }
// Operation result: {
//   operationName: 'getStatus',
//   arguments: [],
//   result: { ... } 
// }
```

And finally, you can also listen for errors with the `onError` callback.
```ts
import { SpaceTradersSdk } from '@wwaaijer/space-traders-sdk';

const api = new SpaceTradersSdk({
  onError(data) {
    console.error('Error:', data.error);
    console.error('Request:', data.request);
    console.error('Response:', data.response);
  },
});

await api.getWaypoint('X1-1-1');
// Error: SpaceTradersError: System X1-1 not found.
// Request: { method: 'GET', path: '/systems/X1-1/waypoints/X1-1-1' }
// Response: { status: 404, ... }
```

## But there are already a bunch of SDKs out there, why another one?

This package is trying to strike a balance between keeping up with changes and the developer experience.
Most other packages are generated automatically using the OpenAPI Generator CLI, which can lead to less user-friendly interfaces.
While this SDK also uses the OpenAPI spec, it only relies on [openapi-typescript](https://github.com/openapi-ts/openapi-typescript) to generate types.
A custom script generates the SDK code itself.
This approach results in a simpler, more lightweight SDK, still easy to maintain and keeping aligned with future changes to the SpaceTraders API.

## Regenerating the SDK source code
Normal build:
```shell
# Bump version
npm install
npm run fetch-spec
npm run build

# Update the readme with the date and the output of:
npm run generate-method-list

# Update the changelog

npm publish --access public
```

Staging build:
```shell
# Bump version (including -staging)
npm install
npm run fetch-spec staging
npm run build 
npm publish --access public --tag staging
```