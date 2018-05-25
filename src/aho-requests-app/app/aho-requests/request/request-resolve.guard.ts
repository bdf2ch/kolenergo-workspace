import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AhoRequestsService } from '../../shared/services/aho-requests.service';
import { AhoRequest } from '../../shared/models/aho-request.model';

@Injectable()
export class RequestResolveGuard implements Resolve<AhoRequest | null> {
  constructor(private readonly ahoRequestsService: AhoRequestsService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<AhoRequest | null> {
    console.log('request resolve');
    const id = parseInt(route.params.id);
    console.log('id = ', id);
    if (!this.ahoRequestsService.getSelectedRequest()) {

      this.ahoRequestsService.getRequests().forEach((req: AhoRequest) => {
        if (req.id === id) {
          this.ahoRequestsService.setSelectedRequest(req);
          console.log('local request found');
        }
      });

      if (!this.ahoRequestsService.getSelectedRequest()) {
        console.log('fetching remote request');
        const request = await this.ahoRequestsService.fetchRequestById(id);
        this.ahoRequestsService.setSelectedRequest(request);
        return request;
      }
    }
  }
}
