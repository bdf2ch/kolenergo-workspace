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
import { IUser } from '../../users/interfaces/user.interface';
import { WindowRef } from '../services/window.service';
import { environment } from '../../../../_common/environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: environment.apiUrl + 'authentication',
  withCredentials: true
})
export class AuthenticationResource extends Resource {

  constructor(private window: WindowRef,
              private handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  check: IResourceMethodStrict<{appCode: string | null}, void, void, IUser | null>;

  @ResourceAction({
    method: ResourceRequestMethod.Post,
    path: '/login',
    withCredentials: true
  })
  login: IResourceMethod<{account: string, password: string, addIfNotExists?: boolean, appCode?: string}, IUser>;

  @ResourceAction({
    path: '/logout',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  logout: IResourceMethod<void, void>;

}
