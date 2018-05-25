import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AhoRequestsService } from '../../../../aho-requests-app/app/shared/services/aho-requests.service';
import { User } from '../../users/models/user.model';


@Injectable()
export class AuthenticationResolveGuard implements Resolve<User | null> {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User | null> {
    const result = await this.authenticationService.check();
    return result;
  }

}
