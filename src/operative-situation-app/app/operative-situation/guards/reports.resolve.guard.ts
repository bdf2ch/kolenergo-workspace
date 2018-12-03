import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { OperativeSituationService } from '../services/operative-situation.service';
import { OperativeSituationReport } from '@kolenergo/osr';

@Injectable()
export class ReportsResolveGuard implements Resolve<OperativeSituationReport[]> {

  constructor(private readonly osr: OperativeSituationService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<OperativeSituationReport[]> {
    const companies = await this.osr.fetchCompanies().toPromise();
    this.osr.selectedCompany(companies[0]);
    const reports = await this.osr.fetchReports(1).toPromise();
    return reports;
  }
}
