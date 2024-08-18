/**
 * This file was auto-generated by ../scripts/generate-sdk.js.
 * Do not make direct changes to the file.
 */

import { BaseClient } from "./baseClient";
import { operations } from "./openapi-typescript-export";

export class SpaceTradersSdk {

  private client: BaseClient;

  constructor(options?: SpaceTradersSdkOptions) {
    this.client = new BaseClient(options);
  }

  /**
   * Get Status
   * @description Return the status of the game server.
   *     This also includes a few global elements, such as announcements, server reset dates and leaderboards.
   */
  async getStatus(): Promise<operations['get-status']['responses']['200']['content']['application/json']> {
    return this.client.request({
      method: 'GET',
      path: `/`,
    });
  }

  /**
   * Register New Agent
   * @description Creates a new agent and ties it to an account. 
   *     The agent symbol must consist of a 3-14 character string, and will be used to represent your agent. This symbol will prefix the symbol of every ship you own. Agent symbols will be cast to all uppercase characters.
   *     
   *     This new agent will be tied to a starting faction of your choice, which determines your starting location, and will be granted an authorization token, a contract with their starting faction, a command ship that can fly across space with advanced capabilities, a small probe ship that can be used for reconnaissance, and 150,000 credits.
   *     
   *     > #### Keep your token safe and secure
   *     >
   *     > Save your token during the alpha phase. There is no way to regenerate this token without starting a new agent. In the future you will be able to generate and manage your tokens from the SpaceTraders website.
   *     
   *     If you are new to SpaceTraders, It is recommended to register with the COSMIC faction, a faction that is well connected to the rest of the universe. After registering, you should try our interactive [quickstart guide](https://docs.spacetraders.io/quickstart/new-game) which will walk you through basic API requests in just a few minutes.
   */
  async register(
    requestBody: operations['register']['requestBody']['content']['application/json']
  ): Promise<operations['register']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/register`,
      requestBody,
    });
  }

  /**
   * List Systems
   * @description Return a paginated list of all systems.
   */
  async getSystems(
    query: operations['get-systems']['parameters']['query']
  ): Promise<operations['get-systems']['responses']['200']['content']['application/json']> {
    return this.client.request({
      method: 'GET',
      path: `/systems`,
      query,
    });
  }

  /**
   * Get System
   * @description Get the details of a system.
   */
  async getSystem(
    systemSymbol: operations['get-system']['parameters']['path']['systemSymbol']
  ): Promise<operations['get-system']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/systems/${systemSymbol}`,
    });
  }

  /**
   * List Waypoints in System
   * @description Return a paginated list of all of the waypoints for a given system.
   *     
   *     If a waypoint is uncharted, it will return the `Uncharted` trait instead of its actual traits.
   */
  async getSystemWaypoints(
    systemSymbol: operations['get-system-waypoints']['parameters']['path']['systemSymbol'],
    query: operations['get-system-waypoints']['parameters']['query']
  ): Promise<operations['get-system-waypoints']['responses']['200']['content']['application/json']> {
    return this.client.request({
      method: 'GET',
      path: `/systems/${systemSymbol}/waypoints`,
      query,
    });
  }

  /**
   * Get Waypoint
   * @description View the details of a waypoint.
   *     
   *     If the waypoint is uncharted, it will return the 'Uncharted' trait instead of its actual traits.
   */
  async getWaypoint(
    systemSymbol: operations['get-waypoint']['parameters']['path']['systemSymbol'],
    waypointSymbol: operations['get-waypoint']['parameters']['path']['waypointSymbol']
  ): Promise<operations['get-waypoint']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/systems/${systemSymbol}/waypoints/${waypointSymbol}`,
    });
  }

  /**
   * Get Market
   * @description Retrieve imports, exports and exchange data from a marketplace. Requires a waypoint that has the `Marketplace` trait to use.
   *     
   *     Send a ship to the waypoint to access trade good prices and recent transactions. Refer to the [Market Overview page](https://docs.spacetraders.io/game-concepts/markets) to gain better a understanding of the market in the game.
   */
  async getMarket(
    systemSymbol: operations['get-market']['parameters']['path']['systemSymbol'],
    waypointSymbol: operations['get-market']['parameters']['path']['waypointSymbol']
  ): Promise<operations['get-market']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`,
    });
  }

  /**
   * Get Shipyard
   * @description Get the shipyard for a waypoint. Requires a waypoint that has the `Shipyard` trait to use. Send a ship to the waypoint to access data on ships that are currently available for purchase and recent transactions.
   */
  async getShipyard(
    systemSymbol: operations['get-shipyard']['parameters']['path']['systemSymbol'],
    waypointSymbol: operations['get-shipyard']['parameters']['path']['waypointSymbol']
  ): Promise<operations['get-shipyard']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`,
    });
  }

  /**
   * Get Jump Gate
   * @description Get jump gate details for a waypoint. Requires a waypoint of type `JUMP_GATE` to use.
   *     
   *     Waypoints connected to this jump gate can be 
   */
  async getJumpGate(
    systemSymbol: operations['get-jump-gate']['parameters']['path']['systemSymbol'],
    waypointSymbol: operations['get-jump-gate']['parameters']['path']['waypointSymbol']
  ): Promise<operations['get-jump-gate']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/systems/${systemSymbol}/waypoints/${waypointSymbol}/jump-gate`,
    });
  }

  /**
   * Get Construction Site
   * @description Get construction details for a waypoint. Requires a waypoint with a property of `isUnderConstruction` to be true.
   */
  async getConstruction(
    systemSymbol: operations['get-construction']['parameters']['path']['systemSymbol'],
    waypointSymbol: operations['get-construction']['parameters']['path']['waypointSymbol']
  ): Promise<operations['get-construction']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/systems/${systemSymbol}/waypoints/${waypointSymbol}/construction`,
    });
  }

  /**
   * Supply Construction Site
   * @description Supply a construction site with the specified good. Requires a waypoint with a property of `isUnderConstruction` to be true.
   *     
   *     The good must be in your ship's cargo. The good will be removed from your ship's cargo and added to the construction site's materials.
   */
  async supplyConstruction(
    systemSymbol: operations['supply-construction']['parameters']['path']['systemSymbol'],
    waypointSymbol: operations['supply-construction']['parameters']['path']['waypointSymbol'],
    requestBody: operations['supply-construction']['requestBody']['content']['application/json']
  ): Promise<operations['supply-construction']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/systems/${systemSymbol}/waypoints/${waypointSymbol}/construction/supply`,
      requestBody,
    });
  }

  /**
   * List Factions
   * @description Return a paginated list of all the factions in the game.
   */
  async getFactions(
    query: operations['get-factions']['parameters']['query']
  ): Promise<operations['get-factions']['responses']['200']['content']['application/json']> {
    return this.client.request({
      method: 'GET',
      path: `/factions`,
      query,
    });
  }

  /**
   * Get Faction
   * @description View the details of a faction.
   */
  async getFaction(
    factionSymbol: operations['get-faction']['parameters']['path']['factionSymbol']
  ): Promise<operations['get-faction']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/factions/${factionSymbol}`,
    });
  }

  /**
   * Get Agent
   * @description Fetch your agent's details.
   */
  async getMyAgent(): Promise<operations['get-my-agent']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/agent`,
    });
  }

  /**
   * List Agents
   * @description Fetch agents details.
   */
  async getAgents(
    query: operations['get-agents']['parameters']['query']
  ): Promise<operations['get-agents']['responses']['200']['content']['application/json']> {
    return this.client.request({
      method: 'GET',
      path: `/agents`,
      query,
    });
  }

  /**
   * Get Public Agent
   * @description Fetch agent details.
   */
  async getAgent(
    agentSymbol: operations['get-agent']['parameters']['path']['agentSymbol']
  ): Promise<operations['get-agent']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/agents/${agentSymbol}`,
    });
  }

  /**
   * List Contracts
   * @description Return a paginated list of all your contracts.
   */
  async getContracts(
    query: operations['get-contracts']['parameters']['query']
  ): Promise<operations['get-contracts']['responses']['200']['content']['application/json']> {
    return this.client.request({
      method: 'GET',
      path: `/my/contracts`,
      query,
    });
  }

  /**
   * Get Contract
   * @description Get the details of a contract by ID.
   */
  async getContract(
    contractId: operations['get-contract']['parameters']['path']['contractId']
  ): Promise<operations['get-contract']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/contracts/${contractId}`,
    });
  }

  /**
   * Accept Contract
   * @description Accept a contract by ID. 
   *     
   *     You can only accept contracts that were offered to you, were not accepted yet, and whose deadlines has not passed yet.
   */
  async acceptContract(
    contractId: operations['accept-contract']['parameters']['path']['contractId']
  ): Promise<operations['accept-contract']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/contracts/${contractId}/accept`,
    });
  }

  /**
   * Deliver Cargo to Contract
   * @description Deliver cargo to a contract.
   *     
   *     In order to use this API, a ship must be at the delivery location (denoted in the delivery terms as `destinationSymbol` of a contract) and must have a number of units of a good required by this contract in its cargo.
   *     
   *     Cargo that was delivered will be removed from the ship's cargo.
   */
  async deliverContract(
    contractId: operations['deliver-contract']['parameters']['path']['contractId'],
    requestBody: operations['deliver-contract']['requestBody']['content']['application/json']
  ): Promise<operations['deliver-contract']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/contracts/${contractId}/deliver`,
      requestBody,
    });
  }

  /**
   * Fulfill Contract
   * @description Fulfill a contract. Can only be used on contracts that have all of their delivery terms fulfilled.
   */
  async fulfillContract(
    contractId: operations['fulfill-contract']['parameters']['path']['contractId']
  ): Promise<operations['fulfill-contract']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/contracts/${contractId}/fulfill`,
    });
  }

  /**
   * List Ships
   * @description Return a paginated list of all of ships under your agent's ownership.
   */
  async getMyShips(
    query: operations['get-my-ships']['parameters']['query']
  ): Promise<operations['get-my-ships']['responses']['200']['content']['application/json']> {
    return this.client.request({
      method: 'GET',
      path: `/my/ships`,
      query,
    });
  }

  /**
   * Purchase Ship
   * @description Purchase a ship from a Shipyard. In order to use this function, a ship under your agent's ownership must be in a waypoint that has the `Shipyard` trait, and the Shipyard must sell the type of the desired ship.
   *     
   *     Shipyards typically offer ship types, which are predefined templates of ships that have dedicated roles. A template comes with a preset of an engine, a reactor, and a frame. It may also include a few modules and mounts.
   */
  async purchaseShip(
    requestBody: operations['purchase-ship']['requestBody']['content']['application/json']
  ): Promise<operations['purchase-ship']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships`,
      requestBody,
    });
  }

  /**
   * Get Ship
   * @description Retrieve the details of a ship under your agent's ownership.
   */
  async getMyShip(
    shipSymbol: operations['get-my-ship']['parameters']['path']['shipSymbol']
  ): Promise<operations['get-my-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/ships/${shipSymbol}`,
    });
  }

  /**
   * Get Ship Cargo
   * @description Retrieve the cargo of a ship under your agent's ownership.
   */
  async getMyShipCargo(
    shipSymbol: operations['get-my-ship-cargo']['parameters']['path']['shipSymbol']
  ): Promise<operations['get-my-ship-cargo']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/ships/${shipSymbol}/cargo`,
    });
  }

  /**
   * Orbit Ship
   * @description Attempt to move your ship into orbit at its current location. The request will only succeed if your ship is capable of moving into orbit at the time of the request.
   *     
   *     Orbiting ships are able to do actions that require the ship to be above surface such as navigating or extracting, but cannot access elements in their current waypoint, such as the market or a shipyard.
   *     
   *     The endpoint is idempotent - successive calls will succeed even if the ship is already in orbit.
   */
  async orbitShip(
    shipSymbol: operations['orbit-ship']['parameters']['path']['shipSymbol']
  ): Promise<operations['orbit-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/orbit`,
    });
  }

  /**
   * Ship Refine
   * @description Attempt to refine the raw materials on your ship. The request will only succeed if your ship is capable of refining at the time of the request. In order to be able to refine, a ship must have goods that can be refined and have installed a `Refinery` module that can refine it.
   *     
   *     When refining, 30 basic goods will be converted into 10 processed goods.
   */
  async shipRefine(
    shipSymbol: operations['ship-refine']['parameters']['path']['shipSymbol'],
    requestBody: operations['ship-refine']['requestBody']['content']['application/json']
  ): Promise<operations['ship-refine']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/refine`,
      requestBody,
    });
  }

  /**
   * Create Chart
   * @description Command a ship to chart the waypoint at its current location.
   *     
   *     Most waypoints in the universe are uncharted by default. These waypoints have their traits hidden until they have been charted by a ship.
   *     
   *     Charting a waypoint will record your agent as the one who created the chart, and all other agents would also be able to see the waypoint's traits.
   */
  async createChart(
    shipSymbol: operations['create-chart']['parameters']['path']['shipSymbol']
  ): Promise<operations['create-chart']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/chart`,
    });
  }

  /**
   * Get Ship Cooldown
   * @description Retrieve the details of your ship's reactor cooldown. Some actions such as activating your jump drive, scanning, or extracting resources taxes your reactor and results in a cooldown.
   *     
   *     Your ship cannot perform additional actions until your cooldown has expired. The duration of your cooldown is relative to the power consumption of the related modules or mounts for the action taken.
   *     
   *     Response returns a 204 status code (no-content) when the ship has no cooldown.
   */
  async getShipCooldown(
    shipSymbol: operations['get-ship-cooldown']['parameters']['path']['shipSymbol']
  ): Promise<operations['get-ship-cooldown']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/ships/${shipSymbol}/cooldown`,
    });
  }

  /**
   * Dock Ship
   * @description Attempt to dock your ship at its current location. Docking will only succeed if your ship is capable of docking at the time of the request.
   *     
   *     Docked ships can access elements in their current location, such as the market or a shipyard, but cannot do actions that require the ship to be above surface such as navigating or extracting.
   *     
   *     The endpoint is idempotent - successive calls will succeed even if the ship is already docked.
   */
  async dockShip(
    shipSymbol: operations['dock-ship']['parameters']['path']['shipSymbol']
  ): Promise<operations['dock-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/dock`,
    });
  }

  /**
   * Create Survey
   * @description Create surveys on a waypoint that can be extracted such as asteroid fields. A survey focuses on specific types of deposits from the extracted location. When ships extract using this survey, they are guaranteed to procure a high amount of one of the goods in the survey.
   *     
   *     In order to use a survey, send the entire survey details in the body of the extract request.
   *     
   *     Each survey may have multiple deposits, and if a symbol shows up more than once, that indicates a higher chance of extracting that resource.
   *     
   *     Your ship will enter a cooldown after surveying in which it is unable to perform certain actions. Surveys will eventually expire after a period of time or will be exhausted after being extracted several times based on the survey's size. Multiple ships can use the same survey for extraction.
   *     
   *     A ship must have the `Surveyor` mount installed in order to use this function.
   */
  async createSurvey(
    shipSymbol: operations['create-survey']['parameters']['path']['shipSymbol']
  ): Promise<operations['create-survey']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/survey`,
    });
  }

  /**
   * Extract Resources
   * @description Extract resources from a waypoint that can be extracted, such as asteroid fields, into your ship. Send an optional survey as the payload to target specific yields.
   *     
   *     The ship must be in orbit to be able to extract and must have mining equipments installed that can extract goods, such as the `Gas Siphon` mount for gas-based goods or `Mining Laser` mount for ore-based goods.
   *     
   *     The survey property is now deprecated. See the `extract/survey` endpoint for more details.
   */
  async extractResources(
    shipSymbol: operations['extract-resources']['parameters']['path']['shipSymbol'],
    requestBody: operations['extract-resources']['requestBody']['content']['application/json']
  ): Promise<operations['extract-resources']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/extract`,
      requestBody,
    });
  }

  /**
   * Siphon Resources
   * @description Siphon gases, such as hydrocarbon, from gas giants.
   *     
   *     The ship must be in orbit to be able to siphon and must have siphon mounts and a gas processor installed.
   */
  async siphonResources(
    shipSymbol: operations['siphon-resources']['parameters']['path']['shipSymbol']
  ): Promise<operations['siphon-resources']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/siphon`,
    });
  }

  /**
   * Extract Resources with Survey
   * @description Use a survey when extracting resources from a waypoint. This endpoint requires a survey as the payload, which allows your ship to extract specific yields.
   *     
   *     Send the full survey object as the payload which will be validated according to the signature. If the signature is invalid, or any properties of the survey are changed, the request will fail.
   */
  async extractResourcesWithSurvey(
    shipSymbol: operations['extract-resources-with-survey']['parameters']['path']['shipSymbol'],
    requestBody: operations['extract-resources-with-survey']['requestBody']['content']['application/json']
  ): Promise<operations['extract-resources-with-survey']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/extract/survey`,
      requestBody,
    });
  }

  /**
   * Jettison Cargo
   * @description Jettison cargo from your ship's cargo hold.
   */
  async jettison(
    shipSymbol: operations['jettison']['parameters']['path']['shipSymbol'],
    requestBody: operations['jettison']['requestBody']['content']['application/json']
  ): Promise<operations['jettison']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/jettison`,
      requestBody,
    });
  }

  /**
   * Jump Ship
   * @description Jump your ship instantly to a target connected waypoint. The ship must be in orbit to execute a jump.
   *     
   *     A unit of antimatter is purchased and consumed from the market when jumping. The price of antimatter is determined by the market and is subject to change. A ship can only jump to connected waypoints
   */
  async jumpShip(
    shipSymbol: operations['jump-ship']['parameters']['path']['shipSymbol'],
    requestBody: operations['jump-ship']['requestBody']['content']['application/json']
  ): Promise<operations['jump-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/jump`,
      requestBody,
    });
  }

  /**
   * Navigate Ship
   * @description Navigate to a target destination. The ship must be in orbit to use this function. The destination waypoint must be within the same system as the ship's current location. Navigating will consume the necessary fuel from the ship's manifest based on the distance to the target waypoint.
   *     
   *     The returned response will detail the route information including the expected time of arrival. Most ship actions are unavailable until the ship has arrived at it's destination.
   *     
   *     To travel between systems, see the ship's Warp or Jump actions.
   */
  async navigateShip(
    shipSymbol: operations['navigate-ship']['parameters']['path']['shipSymbol'],
    requestBody: operations['navigate-ship']['requestBody']['content']['application/json']
  ): Promise<operations['navigate-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/navigate`,
      requestBody,
    });
  }

  /**
   * Patch Ship Nav
   * @description Update the nav configuration of a ship.
   *     
   *     Currently only supports configuring the Flight Mode of the ship, which affects its speed and fuel consumption.
   */
  async patchShipNav(
    shipSymbol: operations['patch-ship-nav']['parameters']['path']['shipSymbol'],
    requestBody: operations['patch-ship-nav']['requestBody']['content']['application/json']
  ): Promise<operations['patch-ship-nav']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'PATCH',
      path: `/my/ships/${shipSymbol}/nav`,
      requestBody,
    });
  }

  /**
   * Get Ship Nav
   * @description Get the current nav status of a ship.
   */
  async getShipNav(
    shipSymbol: operations['get-ship-nav']['parameters']['path']['shipSymbol']
  ): Promise<operations['get-ship-nav']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/ships/${shipSymbol}/nav`,
    });
  }

  /**
   * Warp Ship
   * @description Warp your ship to a target destination in another system. The ship must be in orbit to use this function and must have the `Warp Drive` module installed. Warping will consume the necessary fuel from the ship's manifest.
   *     
   *     The returned response will detail the route information including the expected time of arrival. Most ship actions are unavailable until the ship has arrived at its destination.
   */
  async warpShip(
    shipSymbol: operations['warp-ship']['parameters']['path']['shipSymbol'],
    requestBody: operations['warp-ship']['requestBody']['content']['application/json']
  ): Promise<operations['warp-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/warp`,
      requestBody,
    });
  }

  /**
   * Sell Cargo
   * @description Sell cargo in your ship to a market that trades this cargo. The ship must be docked in a waypoint that has the `Marketplace` trait in order to use this function.
   */
  async sellCargo(
    shipSymbol: operations['sell-cargo']['parameters']['path']['shipSymbol'],
    requestBody: operations['sell-cargo']['requestBody']['content']['application/json']
  ): Promise<operations['sell-cargo']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/sell`,
      requestBody,
    });
  }

  /**
   * Scan Systems
   * @description Scan for nearby systems, retrieving information on the systems' distance from the ship and their waypoints. Requires a ship to have the `Sensor Array` mount installed to use.
   *     
   *     The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
   */
  async createShipSystemScan(
    shipSymbol: operations['create-ship-system-scan']['parameters']['path']['shipSymbol']
  ): Promise<operations['create-ship-system-scan']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/scan/systems`,
    });
  }

  /**
   * Scan Waypoints
   * @description Scan for nearby waypoints, retrieving detailed information on each waypoint in range. Scanning uncharted waypoints will allow you to ignore their uncharted state and will list the waypoints' traits.
   *     
   *     Requires a ship to have the `Sensor Array` mount installed to use.
   *     
   *     The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
   */
  async createShipWaypointScan(
    shipSymbol: operations['create-ship-waypoint-scan']['parameters']['path']['shipSymbol']
  ): Promise<operations['create-ship-waypoint-scan']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/scan/waypoints`,
    });
  }

  /**
   * Scan Ships
   * @description Scan for nearby ships, retrieving information for all ships in range.
   *     
   *     Requires a ship to have the `Sensor Array` mount installed to use.
   *     
   *     The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
   */
  async createShipShipScan(
    shipSymbol: operations['create-ship-ship-scan']['parameters']['path']['shipSymbol']
  ): Promise<operations['create-ship-ship-scan']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/scan/ships`,
    });
  }

  /**
   * Refuel Ship
   * @description Refuel your ship by buying fuel from the local market.
   *     
   *     Requires the ship to be docked in a waypoint that has the `Marketplace` trait, and the market must be selling fuel in order to refuel.
   *     
   *     Each fuel bought from the market replenishes 100 units in your ship's fuel.
   *     
   *     Ships will always be refuel to their frame's maximum fuel capacity when using this action.
   */
  async refuelShip(
    shipSymbol: operations['refuel-ship']['parameters']['path']['shipSymbol'],
    requestBody: operations['refuel-ship']['requestBody']['content']['application/json']
  ): Promise<operations['refuel-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/refuel`,
      requestBody,
    });
  }

  /**
   * Purchase Cargo
   * @description Purchase cargo from a market.
   *     
   *     The ship must be docked in a waypoint that has `Marketplace` trait, and the market must be selling a good to be able to purchase it.
   *     
   *     The maximum amount of units of a good that can be purchased in each transaction are denoted by the `tradeVolume` value of the good, which can be viewed by using the Get Market action.
   *     
   *     Purchased goods are added to the ship's cargo hold.
   */
  async purchaseCargo(
    shipSymbol: operations['purchase-cargo']['parameters']['path']['shipSymbol'],
    requestBody: operations['purchase-cargo']['requestBody']['content']['application/json']
  ): Promise<operations['purchase-cargo']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/purchase`,
      requestBody,
    });
  }

  /**
   * Transfer Cargo
   * @description Transfer cargo between ships.
   *     
   *     The receiving ship must be in the same waypoint as the transferring ship, and it must able to hold the additional cargo after the transfer is complete. Both ships also must be in the same state, either both are docked or both are orbiting.
   *     
   *     The response body's cargo shows the cargo of the transferring ship after the transfer is complete.
   */
  async transferCargo(
    shipSymbol: operations['transfer-cargo']['parameters']['path']['shipSymbol'],
    requestBody: operations['transfer-cargo']['requestBody']['content']['application/json']
  ): Promise<operations['transfer-cargo']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/transfer`,
      requestBody,
    });
  }

  /**
   * Negotiate Contract
   * @description Negotiate a new contract with the HQ.
   *     
   *     In order to negotiate a new contract, an agent must not have ongoing or offered contracts over the allowed maximum amount. Currently the maximum contracts an agent can have at a time is 1.
   *     
   *     Once a contract is negotiated, it is added to the list of contracts offered to the agent, which the agent can then accept. 
   *     
   *     The ship must be present at any waypoint with a faction present to negotiate a contract with that faction.
   */
  async negotiateContract(
    shipSymbol: operations['negotiateContract']['parameters']['path']['shipSymbol']
  ): Promise<operations['negotiateContract']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/negotiate/contract`,
    });
  }

  /**
   * Get Mounts
   * @description Get the mounts installed on a ship.
   */
  async getMounts(
    shipSymbol: operations['get-mounts']['parameters']['path']['shipSymbol']
  ): Promise<operations['get-mounts']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/ships/${shipSymbol}/mounts`,
    });
  }

  /**
   * Install Mount
   * @description Install a mount on a ship.
   *     
   *     In order to install a mount, the ship must be docked and located in a waypoint that has a `Shipyard` trait. The ship also must have the mount to install in its cargo hold.
   *     
   *     An installation fee will be deduced by the Shipyard for installing the mount on the ship. 
   */
  async installMount(
    shipSymbol: operations['install-mount']['parameters']['path']['shipSymbol'],
    requestBody: operations['install-mount']['requestBody']['content']['application/json']
  ): Promise<operations['install-mount']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/mounts/install`,
      requestBody,
    });
  }

  /**
   * Remove Mount
   * @description Remove a mount from a ship.
   *     
   *     The ship must be docked in a waypoint that has the `Shipyard` trait, and must have the desired mount that it wish to remove installed.
   *     
   *     A removal fee will be deduced from the agent by the Shipyard.
   */
  async removeMount(
    shipSymbol: operations['remove-mount']['parameters']['path']['shipSymbol'],
    requestBody: operations['remove-mount']['requestBody']['content']['application/json']
  ): Promise<operations['remove-mount']['responses']['201']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/mounts/remove`,
      requestBody,
    });
  }

  /**
   * Get Scrap Ship
   * @description Get the amount of value that will be returned when scrapping a ship.
   */
  async getScrapShip(
    shipSymbol: operations['get-scrap-ship']['parameters']['path']['shipSymbol']
  ): Promise<operations['get-scrap-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/ships/${shipSymbol}/scrap`,
    });
  }

  /**
   * Scrap Ship
   * @description Scrap a ship, removing it from the game and returning a portion of the ship's value to the agent. The ship must be docked in a waypoint that has the `Shipyard` trait in order to use this function. To preview the amount of value that will be returned, use the Get Ship action.
   */
  async scrapShip(
    shipSymbol: operations['scrap-ship']['parameters']['path']['shipSymbol']
  ): Promise<operations['scrap-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/scrap`,
    });
  }

  /**
   * Get Repair Ship
   * @description Get the cost of repairing a ship.
   */
  async getRepairShip(
    shipSymbol: operations['get-repair-ship']['parameters']['path']['shipSymbol']
  ): Promise<operations['get-repair-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'GET',
      path: `/my/ships/${shipSymbol}/repair`,
    });
  }

  /**
   * Repair Ship
   * @description Repair a ship, restoring the ship to maximum condition. The ship must be docked at a waypoint that has the `Shipyard` trait in order to use this function. To preview the cost of repairing the ship, use the Get action.
   */
  async repairShip(
    shipSymbol: operations['repair-ship']['parameters']['path']['shipSymbol']
  ): Promise<operations['repair-ship']['responses']['200']['content']['application/json']['data']> {
    return this.client.request({
      method: 'POST',
      path: `/my/ships/${shipSymbol}/repair`,
    });
  }
}

export interface SpaceTradersSdkOptions {
  token?: string;
}
