import { Injectable } from '@angular/core';
import { IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { environment } from '../../../../_common/environments/environment';
import { IServerResponse } from '../../common/interfaces/server-response.interface';
import { IControlPanelInitData } from '../interfaces/control-panel-init-data.interface';

@Injectable()
@ResourceParams({
  pathPrefix: environment.apiUrl + 'cp'
})
export class DashboardResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/init',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getInitialData: IResourceMethod<void, IServerResponse<IControlPanelInitData>>;

}
