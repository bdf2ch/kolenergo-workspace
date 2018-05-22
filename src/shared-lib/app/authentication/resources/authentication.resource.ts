import { Injectable } from '@angular/core';
import { IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { IUser } from '../../users/interfaces/user.interface';
import { environment } from '../../../../_common/environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: environment.apiUrl + 'authentication'
})
export class AuthenticationResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  check: IResourceMethod<void, IUser | null>;

  @ResourceAction({
    method: ResourceRequestMethod.Post,
    path: '/login',
    withCredentials: true
  })
  login: IResourceMethod<{account: string, password: string, addIfNotExists?: boolean}, IUser>;

  @ResourceAction({
    path: '/logout',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  logout: IResourceMethod<void, void>;

}
