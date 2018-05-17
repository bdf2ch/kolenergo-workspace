import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AhoRequestsService } from '../services/aho-requests.service';

@Injectable()
export class AhoRequestsResolveGuard implements Resolve<boolean> {
  constructor(private readonly ahoRequestsService: AhoRequestsService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.ahoRequestsService.fetchRequestTypes();
    await this.ahoRequestsService.fetchRequestStatuses();
    await this.ahoRequestsService.fetchRequests();
    return true;
  }
}
