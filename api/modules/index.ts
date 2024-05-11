import type { $Fetch, FetchOptions } from "ofetch";

export type ApiMethods = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export default class HttpFactory {
  private readonly $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  private async call<T>(
    method: ApiMethods,
    url: string,
    body?: any,
    options: FetchOptions = {},
  ): Promise<T> {
    return await this.$fetch(url, { method, body, ...options });
  }

  protected async get<T>(url: string, options?: FetchOptions) {
    return await this.call<T>("GET", url, undefined, options);
  }

  protected async post<T>(url: string, body?: any, options?: FetchOptions) {
    return await this.call<T>("POST", url, body, options);
  }

  protected async put<T>(url: string, body?: any, options?: FetchOptions) {
    return await this.call<T>("PUT", url, body, options);
  }

  protected async patch<T>(url: string, options?: FetchOptions) {
    return await this.call<T>("PATCH", url, undefined, options);
  }

  protected async delete<T>(url: string, options?: FetchOptions) {
    return await this.call<T>("DELETE", url, undefined, options);
  }
}
