export interface IServerResponse<T> {
  data: T;
  meta?: {
    totalRequests?: number;
    success?: boolean
  };
}
