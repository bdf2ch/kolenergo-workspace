import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthenticationService } from "@kolenergo/lib";
import { AhoRequestsService } from "../services/aho-requests.service";

@Injectable()
export class AhoRequestsAdminGuard implements CanActivate {
  constructor (private readonly router: Router,
               private readonly authenticationService: AuthenticationService,
               private readonly ahoRequestsService: AhoRequestsService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authenticationService.getCurrentUser() && this.authenticationService.getCurrentUser().permissions.getRoleById(1)) {
      if (this.ahoRequestsService.getNeeds().length === 0) {
        await this.ahoRequestsService.fetchNeeds();
      }
      return true;
    } else {
      this.router.navigate(['']);
    }
  }
}
