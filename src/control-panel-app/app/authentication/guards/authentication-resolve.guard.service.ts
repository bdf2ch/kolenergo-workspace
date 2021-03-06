import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../../users/models/user.model';


@Injectable()
export class AuthenticationResolveGuard implements Resolve<User | null> {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User | null> {
    console.log('start auth resolving');
    const result = await this.authenticationService.check(
      window.localStorage && window.localStorage.getItem('app_code') ? window.localStorage.getItem('app_code') : null
    );
    console.log('finish auth resolving');
    return result;
  }

}
