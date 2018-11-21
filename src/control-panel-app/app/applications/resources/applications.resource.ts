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
import { environment } from '../../../../_common/environments/environment';
import { IApplication } from '../interfaces/application.interface';
import { IServerResponse } from '@kolenergo/lib';

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

}
