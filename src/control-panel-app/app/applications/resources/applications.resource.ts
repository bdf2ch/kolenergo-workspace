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

import { IApplication } from '../interfaces/application.interface';
import { IServerResponse } from '../../basic/interfaces/server-response.interface';
import { IRole } from '../../users/interfaces/role.interface';
import { IPermission } from '../../users/interfaces/permission.interface';
import { environment } from '../../../../_common/environments/environment';

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
    path: '/roles',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addRole: IResourceMethod<IRole, IServerResponse<IRole>>;

  @ResourceAction({
    path: '/roles/{:id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editRole: IResourceMethodStrict<IRole, void, {id: number}, IServerResponse<IRole>>;

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
  editPermission: IResourceMethodStrict<IPermission, void, {id: number}, IServerResponse<IPermission>>;
}
