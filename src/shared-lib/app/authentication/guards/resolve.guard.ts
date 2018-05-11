import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ResolveGuard implements Resolve<User | null> {
  constructor(private authenticationService: AuthenticationService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User | null> {
    const result = await this.authenticationService.check();
    return result;
  }

}
