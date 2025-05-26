import { useAuthStore } from "@/stores/auth.store";
import type {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

class Request {
  private instance: AxiosInstance;
  private url = import.meta.env.VITE_API_URL;

  constructor() {
    this.instance = axios.create({
      baseURL: this.url,
      headers: { "Content-Type": "application/json" },
    });

    this.initConfig();
  }

  setAuthorizationToken(token?: string): void {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  removeAuthorizationToken(): void {
    delete this.instance.defaults.headers.common.Authorization;
  }

  initConfig(): void {
    try {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        this.setAuthorizationToken(accessToken);
      }
    } catch (error) {
      console.error("Error parsing token from cookies", error);
    } finally {
      this.setInterceptors();
    }
  }

  private setInterceptors(): void {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        // request.headers["Content-Type"] = "application/json";

        if (request.data) {
          request.data = decamelizeKeys(request.data);
        }
        if (request.params) {
          request.params = decamelizeKeys(request.params);
        }

        return request;
      },
      (error) => Promise.reject(this.parseError(error))
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data) {
          response.data = camelizeKeys(response.data);
        }
        return response;
      },
      async (error) => Promise.reject(this.parseError(error))
    );
  }
  private parseError(error: { [key: string]: any }): {
    [key: string]: unknown;
  } {
    if (!error.response) {
      return {
        message: "Network error. Please check your connection.",
        originalError: error,
      };
    }

    const contentType = error.response?.headers["content-type"];
    const data =
      contentType?.includes("application/json") && error.response?.data
        ? camelizeKeys(error.response.data)
        : {};

    return {
      ...error,
      response: {
        ...error.response,
        data: {
          ...data,
          _error: error.response?.data?.non_field_errors || [],
          message: error.response?.data?.message || "Unknown error occurred",
        },
      },
    };
  }

  get<P>(url: string, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.get(url, config);
  }

  post<P>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): AxiosPromise<P> {
    return this.instance.post(url, data, config);
  }

  put<P>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): AxiosPromise<P> {
    return this.instance.put(url, data, config);
  }

  delete<P>(url: string, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.delete(url, config);
  }
}

export const request = new Request();
