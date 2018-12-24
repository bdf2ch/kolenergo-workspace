import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { OperativeSituationService } from '../services/operative-situation.service';
import { AuthenticationService } from '@kolenergo/cpa';

@Injectable()
export class SessionCanActivateGuard implements CanActivate, CanActivateChild {

  constructor(private readonly router: Router,
              private readonly auth: AuthenticationService,
              private readonly osr: OperativeSituationService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.auth.check(
      window.localStorage && window.localStorage.getItem('app_code')
        ? window.localStorage.getItem('app_code')
        : null
    );
    if (!user) {
      this.router.navigate(['auth']);
    }
    return true;
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.auth.check(
      window.localStorage && window.localStorage.getItem('app_code')
        ? window.localStorage.getItem('app_code')
        : null
    );
    if (!user) {
      this.router.navigate(['auth']);
    }
    return true;
  }
}
