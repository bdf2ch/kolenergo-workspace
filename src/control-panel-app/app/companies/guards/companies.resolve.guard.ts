import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { Company } from '@kolenergo/cpa';
import { CompaniesService } from '../services/companies.service';

@Injectable()
export class CompaniesResolveGuard implements Resolve<Company[]> {

  constructor(private readonly companies: CompaniesService,
              private readonly dashboard: DashboardService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Company[]> {
    const companies = await this.companies.fetchCompaniesList().toPromise();
    const appMenuItem = this.dashboard.menu.getItemById('companies');
    companies.forEach((company: Company) => {
      if (!appMenuItem.getById(String(company.id))) {
        appMenuItem.add({
          id: String(company.id),
          title: company.shortTitle,
          link: `/companies/${company.id}`,
          icon: 'business'
        });
      }
    });
    this.dashboard.menu.setActiveItem(state.url);
    return companies;
  }
}
