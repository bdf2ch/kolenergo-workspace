import { IUser } from '@kolenergo/cpa';
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
  allRequests: {
    totalRequestsCount: number;
    newRequestsCount: number;
  };
  ownRequests_: {
    totalRequestsCount: number;
    uncompletedRequestsCount: number;
  };
  employeeRequests_: {
    totalRequestsCount: number;
    uncompletedRequestsCount: number;
  };
  expiredRequests_: {
    totalRequestsCount: number;
  };
}
