import { Injectable } from '@angular/core';
import { IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { environment } from '../../../_common/environments/environment';
import { IUser } from './interfaces/user.interface';
import { IAddUser } from './interfaces/user.add.interface';

@Injectable()
@ResourceParams({
  pathPrefix: environment.apiUrl + 'users'
})
export class UsersResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getAll: IResourceMethod<void, IUser[]>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  add: IResourceMethod<IAddUser, IUser>;

  @ResourceAction({
    path: '{!id}',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getById: IResourceMethod<{id: number}, IUser>;
}
