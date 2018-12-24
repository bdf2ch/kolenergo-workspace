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
import { IUser } from '../interfaces/user.interface';
import { IAddUser } from '../interfaces/user.add.interface';
import { environment } from '../../../../_common/environments/environment';


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
  getAll: IResourceMethodStrict<void, {appCode?: string}, void, IUser[]>;

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
