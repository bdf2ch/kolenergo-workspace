import { Injectable } from '@angular/core';
import {
  IResourceMethod,
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod, ResourceResponseBodyType
} from '@ngx-resource/core';
import { IAhoRequestType } from '../interfaces/aho-request-type.interface';
import { IAddAhoRequestType } from '../interfaces/aho-request-type.add.interface';
import { IAddAhoRequest } from '../interfaces/aho-request.add.interface';
import { IAhoRequest } from '../interfaces/aho-request.interface';
import { environment } from '../../../../_common/environments/environment';
import { IAhoRequestStatus } from '../interfaces/aho-request-status.interface';
import { IAhoRequestTaskContent } from '../interfaces/aho-request-task-content.interface';
import {IAhoRequestComment} from '../interfaces/aho-request-comment.interface';
import {IAhoRequestNeed} from '../interfaces/aho-request-need.interface';


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
    path: '/tasks',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequestTasksContent: IResourceMethod<void, IAhoRequestTaskContent[]>;

  @ResourceAction({
    path: '/statuses',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequestStatuses: IResourceMethod<void, IAhoRequestStatus[]>;

  @ResourceAction({
    path: '/needs',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getNeeds: IResourceMethod<void, IAhoRequestNeed[]>;

  @ResourceAction({
    path: '/needs/export',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  exportNeeds: IResourceMethod<void, any>;

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
    path: '/requests',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequestsByEmployeeId: IResourceMethodStrict<void, {employeeId: number}, void, IAhoRequest[]>;

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

  @ResourceAction({
    path: '/requests/{!id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editRequest: IResourceMethodStrict<IAhoRequest, void, {id: number}, IAhoRequest>;

  @ResourceAction({
    path: '/requests/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  deleteRequest: IResourceMethod<{id: number}, boolean>;

  @ResourceAction({
    path: '/requests/{!id}/comments',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addComment: IResourceMethodStrict<IAhoRequestComment, void, {id: number}, IAhoRequestComment>;

}
