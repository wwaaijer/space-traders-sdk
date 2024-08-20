export interface SpaceTradersOptions {
  token?: string;
  onRequest?: (request: SpaceTradersRequest) => void;
  onResponse?: (response: SpaceTradersResponse) => void;
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
