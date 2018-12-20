import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { OperativeSituationService } from '../services/operative-situation.service';
import { OperativeSituationReport } from '@kolenergo/osr';
import { AuthenticationService } from '@kolenergo/lib';

@Injectable()
export class ReportsResolveGuard implements Resolve<OperativeSituationReport[]> {

  constructor(private readonly auth: AuthenticationService,
              private readonly osr: OperativeSituationService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<OperativeSituationReport[]> {
    const reports = await this.osr.fetchInitialData(this.auth.getCurrentUser().company.id === 8
      ? 2
      : this.auth.getCurrentUser().company.id
    ).toPromise();
    return reports;
  }
}
