import "axios";

export type ApiSuccess<T = unknown> = {
  status: number;
  success: true;
  message: string;
  data: T;
};

export type ApiError = {
  status: number;
  success: false;
  message: string;
  error: unknown;
};

declare module "axios" {
  export interface CustomResponse<T = unknown> extends AxiosResponse {
    data: ApiSuccess<T>;
  }

  export interface AxiosInstance {
    get<T = unknown, R = CustomResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;

    post<T = unknown, R = CustomResponse<T>>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<R>;

    patch<T = unknown, R = CustomResponse<T>>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<R>;

    delete<T = unknown, R = CustomResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;

    put<T = unknown, R = CustomResponse<T>>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig
    ): Promise<R>;
  }
}

export {};
