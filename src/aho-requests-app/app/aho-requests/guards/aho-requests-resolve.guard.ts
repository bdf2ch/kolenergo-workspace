import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router, CanActivate, CanActivateChild } from '@angular/router';
import { AhoRequestsService } from '../services/aho-requests.service';
import { AuthenticationService } from '@kolenergo/cpa';
import { environment } from '../../../environments/environment';

@Injectable()
export class AhoRequestsResolveGuard implements Resolve<boolean>, CanActivate, CanActivateChild {
  constructor(private readonly router: Router,
              private readonly auth: AuthenticationService,
              private readonly aho: AhoRequestsService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('CURRENT USER', this.auth.getCurrentUser());
    console.log('start resolving requests');
    await this.auth.check(window.localStorage && window.localStorage.getItem('app_code') ? window.localStorage.getItem('app_code') : null);
    await this.aho.fetchInitialData(this.auth.getCurrentUser() ? this.auth.getCurrentUser().id : 0, environment.settings.requestsOnPage);

    /*
    if (!this.auth.getCurrentUser()) {
      this.router.navigate(['/welcome']);
    }
    */

    // await this.aho.fetchRequestTypes();
    // await this.aho.fetchRequestStatuses();
    // await this.aho.fetchRequestRejectReasons();
    // await this.aho.fetchEmployees();
    // await this.aho.fetchRequests(0, 0, 0, 0, 0);
    // await this.aho.fetchRequestTasksContent();
    /*
    if (this.auth.getCurrentUser()) {
      await this.aho.fetchRequestsByEmployeeId(this.auth.getCurrentUser().id);
      if (this.auth.getCurrentUser().permissions.getRoleById(1)) {
        await this.aho.fetchNeeds();
      }
    }
    */
    return true;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('CURRENT USER', this.auth.getCurrentUser());
    console.log('start resolving requests');
    await this.auth.check(window.localStorage && window.localStorage.getItem('app_code') ? window.localStorage.getItem('app_code') : null);
    await this.aho.fetchInitialData(this.auth.getCurrentUser() ? this.auth.getCurrentUser().id : 0, environment.settings.requestsOnPage);
    return true;
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('CURRENT USER', this.auth.getCurrentUser());
    console.log('start resolving requests');
    await this.auth.check(window.localStorage && window.localStorage.getItem('app_code') ? window.localStorage.getItem('app_code') : null);
    await this.aho.fetchInitialData(this.auth.getCurrentUser() ? this.auth.getCurrentUser().id : 0, environment.settings.requestsOnPage);
    return true;
  }
}
