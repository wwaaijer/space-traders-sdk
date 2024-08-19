import { RateLimiter } from "./rateLimiter";

const baseUrl = 'https://api.spacetraders.io/v2';

export class BaseClient {
  private token?: string;
  private rateLimiter: RateLimiter;

  constructor(options?: BaseClientOptions) {
    this.rateLimiter = new RateLimiter();

    if (!options) {
      return;
    }

    if (options.token) {
      this.token = options.token;
    }
  }

  async request(options: BaseClientRequestOptions) {  
    const urlParts = [baseUrl, options.path];
    if (options.query) {
      urlParts.push(`?${buildQueryString(options.query)}`);
    }
    const url = urlParts.join('');

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: {},
    };

    if (this.token) {
      fetchOptions.headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (options.requestBody) {
      fetchOptions.headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(options.requestBody);
    }

    const response = await this.rateLimiter.run(() => fetch(url, fetchOptions));

    if (response.ok) {
      const data = await response.json();
      const dataKeys = Object.keys(data);

      if (dataKeys.length === 1 && dataKeys[0] === 'data') {
        return data.data;
      }

      return data;
    } else {
      console.log(response);
      throw new Error(`Request failed with status ${response.status}`);
    }
  }
}

export interface BaseClientOptions {
  token?: string;
}

export interface BaseClientRequestOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  query?: { [key: string]: string | number | boolean | Array<string | number | boolean> };
  requestBody?: any;
}

function buildQueryString(query: BaseClientRequestOptions['query']) {
  return Object.entries(query)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map(item => `${key}=${item}`).join('&');
      }
      return `${key}=${value}`;
    })
    .join('&');
}
