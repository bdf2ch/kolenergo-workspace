import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {
    console.log(window.localStorage);
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const result = await this.authenticationService.check(
      window.localStorage && window.localStorage.getItem('app_code') ? window.localStorage.getItem('app_code') : null
    );
    return result ? true : false;
  }
}
