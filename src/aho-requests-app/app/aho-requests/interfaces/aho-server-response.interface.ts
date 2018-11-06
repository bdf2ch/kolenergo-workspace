import { IUser } from '@kolenergo/lib';
import { IAhoRequest, IAhoRequestRejectReason, IAhoRequestStatus, IAhoRequestTaskContent, IAhoRequestType } from '../../../exports';

export interface IAhoServerResponse  {
  types?: IAhoRequestType[];
  statuses?: IAhoRequestStatus[];
  tasks?: IAhoRequestTaskContent[];
  rejectReasons?: IAhoRequestRejectReason[];
  employees?: IUser[];
  requests: IAhoRequest[];
  ownRequests?: number;
  employeeRequests?: number;
  expiredRequests?: number;
  totalRequests: number;
}
