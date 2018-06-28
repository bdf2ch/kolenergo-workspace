import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { AhoRequestsService } from '../services/aho-requests.service';
import { AuthenticationService } from '@kolenergo/lib';

@Injectable()
export class AhoRequestsResolveGuard implements Resolve<boolean> {
  constructor(private readonly authenticationService: AuthenticationService,
              private readonly ahoRequestsService: AhoRequestsService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.ahoRequestsService.fetchRequestTypes();
    await this.ahoRequestsService.fetchRequestStatuses();
    await this.ahoRequestsService.fetchEmployees();
    await this.ahoRequestsService.fetchRequests(0, 0, 0, 0, 0);
    await this.ahoRequestsService.fetchRequestTasksContent();
    if (this.authenticationService.getCurrentUser()) {
      await this.ahoRequestsService.fetchRequestsByEmployeeId(this.authenticationService.getCurrentUser().id);
      if (this.authenticationService.getCurrentUser().permissions.getRoleById(1)) {
        await this.ahoRequestsService.fetchNeeds();
      }
    }
    return true;
  }
}
