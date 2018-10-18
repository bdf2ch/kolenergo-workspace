import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '@kolenergo/lib';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router,
              private readonly auth: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.auth.getCurrentUser()) {
      this.router.navigate(['/welcome']);
      return true;
    }
  }
}
