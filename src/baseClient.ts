import { SpaceTradersOptions } from ".";
import { SpaceTradersError, SpaceTradersErrorCode } from "./errors";
import { RateLimiter } from "./rateLimiter";
import { SpaceTradersRequest } from "./types";

const baseUrl = 'https://api.spacetraders.io/v2';

export class BaseClient {
  private options?: SpaceTradersOptions;
  private limiter: RateLimiter;

  constructor(options?: SpaceTradersOptions) {
    this.options = options;
    this.limiter = new RateLimiter();
  }

  async request(request: SpaceTradersRequest) {
    try {
      return await this.limiter.enqueue(() => this.requestAttempt(request));
    } catch (error) {
      while (error instanceof SpaceTradersError && error.code === SpaceTradersErrorCode.rateLimitError) {
        try {
          return await this.limiter.retry(() => this.requestAttempt(request));  
        } catch (retryError) {
          error = retryError;
        }
      }

      throw error;
    }
  }

  async requestAttempt(request: SpaceTradersRequest) {
    let response: Response;

    try {
      if (this.options?.onRequest) {
        this.options.onRequest(request);
      }

      const urlParts = [baseUrl, request.path];
      if (request.query) {
        urlParts.push(`?${buildQueryString(request.query)}`);
      }
      const url = urlParts.join('');

      const fetchOptions: RequestInit = {
        method: request.method,
        headers: {},
      };

      if (this.options?.token) {
        fetchOptions.headers['Authorization'] = `Bearer ${this.options.token}`;
      }

      if (request.requestBody) {
        fetchOptions.headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(request.requestBody);
      }

      response = await fetch(url, fetchOptions);

      if (response.ok) {
        const responseBody = await response.json();

        if (this.options?.onResponse) {
          this.options.onResponse({ request, responseBody });
        }

        const responseKeys = Object.keys(responseBody);

        if (responseKeys.length === 1 && responseKeys[0] === 'data') {
          return responseBody.data;
        }

        return responseBody;
      } else {
        await handleErrorResponse(response);
      }
    } catch (error) {
      if (this.options?.onError) {
        this.options.onError({ request, response, error });
      }
      throw error; 
    }
  }
}

function buildQueryString(query: SpaceTradersRequest['query']) {
  return Object.entries(query)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map(item => `${key}=${item}`).join('&');
      }
      return `${key}=${value}`;
    })
    .join('&');
}

async function handleErrorResponse(response: Response) {
  let responseText: string;
  try {
    responseText = await response.text();
  } catch (error) {
    console.log(response);
    console.log(error);
    throw new Error(`Request failed with status ${response.status} and could not get the request body`)
  }

  let responseJson: any;
  try {
    responseJson = JSON.parse(responseText);
  } catch (error) {
    console.log(response);
    console.log(error);
    throw new Error(`Request failed with status ${response.status} and the response body could not be parsed: ${responseText}`);
  }
  
  if (!responseJson.error || !responseJson.error.message || !responseJson.error.code) {
    console.log(response);
    throw new Error(`Request failed with status ${response.status} and the response body was not a proper error response: ${responseText}`);
  }
  
  const { message, code, data } = responseJson.error;
  throw new SpaceTradersError(message, code, data);
}
