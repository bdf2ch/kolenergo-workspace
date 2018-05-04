import { Injectable } from '@angular/core';
import { IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable()
@ResourceParams({
  pathPrefix: 'authentication'
})
export class AuthenticationResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    method: ResourceRequestMethod.Post,
    path: 'signIn'
  })
  signIn: IResourceMethod<{account: string, password: string}, IUser | null>;

}
