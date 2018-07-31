import {IServerResponse} from '@kolenergo/lib';

export interface IAhoServerResponse<T> extends IServerResponse<T>  {
  data: T;
  totalRequests?: number;
}
