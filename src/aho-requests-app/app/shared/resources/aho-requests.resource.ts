import { Injectable } from '@angular/core';
import {
  IResourceMethod,
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod
} from '@ngx-resource/core';
import { IAhoRequestType } from '../interfaces/aho-request-type.interface';
import { IAddAhoRequestType } from '../interfaces/aho-request-type.add.interface';
import { IAddAhoRequest } from '../interfaces/aho-request.add.interface';
import { IAhoRequest } from '../interfaces/aho-request.interface';
import { environment } from '../../../../_common/environments/environment';
import { IAhoRequestStatus } from '../interfaces/aho-request-status.interface';


@Injectable()
@ResourceParams({
  pathPrefix: environment.apiUrl + 'aho'
})
export class AhoRequestsResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }


  @ResourceAction({
    path: '/types',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequestTypes: IResourceMethod<void, IAhoRequestType[]>;

  @ResourceAction({
    path: '/types',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addType: IResourceMethod<IAddAhoRequestType, IAhoRequestType>;

  @ResourceAction({
    path: '/types/{!id}',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  editType: IResourceMethod<{ id: number, requestType: IAddAhoRequestType }, IAhoRequestType>;

  @ResourceAction({
    path: '/statuses',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequestStatuses: IResourceMethod<void, IAhoRequestStatus[]>;

  @ResourceAction({
    path: '/requests',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequests: IResourceMethod<void, IAhoRequest[]>;


  @ResourceAction({
    path: '/requests',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequestsByStatusId: IResourceMethodStrict<void, {statusId: number}, void, IAhoRequest[]>;

  @ResourceAction({
    path: '/requests/{!id}',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequestById: IResourceMethod<{id: number}, IAhoRequest>;

  @ResourceAction({
    path: '/requests',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addRequest: IResourceMethod<IAddAhoRequest, IAhoRequest>;
}
