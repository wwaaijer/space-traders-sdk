import { SpaceTradersError } from "./errors";
import type { SpaceTradersOperationResult, SpaceTradersOperationStart } from "./spyOnOperations";

export interface SpaceTradersOptions {
  token?: string;
  onRequest?: (request: SpaceTradersRequest) => void;
  onResponse?: (response: SpaceTradersResponse) => void;
  onError?: (response: SpaceTradersErrorResponse) => void;
  onOperationStart?: (operation: SpaceTradersOperationStart) => void;
  onOperationResult?: (operation: SpaceTradersOperationResult) => void;
}

export interface SpaceTradersRequest {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  query?: { [key: string]: string | number | boolean | Array<string | number | boolean> };
  requestBody?: any;
}

export interface SpaceTradersResponse {
  request: SpaceTradersRequest;
  responseBody: any;
}

export interface SpaceTradersErrorResponse {
  request: SpaceTradersRequest;
  response?: Response;
  error: Error | SpaceTradersError;
}

export { SpaceTradersOperationResult, SpaceTradersOperationStart };
