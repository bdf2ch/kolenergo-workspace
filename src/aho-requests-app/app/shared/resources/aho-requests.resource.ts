import { Injectable } from '@angular/core';
import { IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { IAhoRequestType } from '../interfaces/aho-request-type.interface';
import { IAddAhoRequestType } from '../interfaces/aho-request-type.add.interface';
import { environment } from '../../../../_common/environments/environment';


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
}
