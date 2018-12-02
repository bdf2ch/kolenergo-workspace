import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Application } from '../models/application.model';
import { OperativeSituationService } from '../services/operative-situation.service';
import { DashboardService } from '../../dashboard/services/dashboard.service';

@Injectable()
export class ApplicationsResolveGuard implements Resolve<Application[]> {

  constructor(private readonly applications: OperativeSituationService,
              private readonly dashboard: DashboardService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Application[]> {
    const applications = await this.applications.fetchApplicationsList().toPromise();
    const appMenuItem = this.dashboard.menu.getItemById('applications');
    applications.forEach((app: Application) => {
      if (!appMenuItem.getById(String(app.id))) {
        appMenuItem.add({
          id: String(app.id),
          title: app.title,
          link: `/applications/${app.id}`,
          icon: 'web'
        });
      }
    });
    // console.log(this.dashboard.menu.getItems().subscribe());
    console.log('state', state);
    this.dashboard.menu.setActiveItem(state.url);
    return applications;
  }
}
