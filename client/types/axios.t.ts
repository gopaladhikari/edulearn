import "axios";

export type ApiSuccess<T = any> = {
  status: number;
  success: true;
  message: string;
  data: T;
};

declare module "axios" {
  export interface CustomResponse<T = any> extends AxiosResponse {
    data: ApiSuccess<T>;
  }

  export interface AxiosInstance {
    get<T = any, R = CustomResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;

    post<T = any, R = CustomResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;

    patch<T = any, R = CustomResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;

    delete<T = any, R = CustomResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;

    put<T = any, R = CustomResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;
  }
}

export {};
