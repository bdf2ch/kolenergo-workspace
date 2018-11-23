import { Injectable } from '@angular/core';
import { IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { environment } from '../../../../_common/environments/environment';
import { IApplication } from '../interfaces/application.interface';
import { IPermission, IServerResponse } from '@kolenergo/lib';

@Injectable()
@ResourceParams({
  pathPrefix: environment.apiUrl + 'cp/applications'
})
export class ApplicationsResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getAll: IResourceMethod<void, IServerResponse<IApplication[]>>;

  @ResourceAction({
    path: '/permissions',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addPermission: IResourceMethod<IPermission, IServerResponse<IPermission>>;

  @ResourceAction({
    path: '/permissions/{:id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editPermission: IResourceMethod<IPermission, IServerResponse<IPermission>>;
}
