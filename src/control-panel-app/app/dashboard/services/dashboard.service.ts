import { Injectable } from '@angular/core';
import { ApplicationMenuManager } from '../models/application-menu-manager.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DashboardResource } from '../resources/dashboard.resource';
import { IServerResponse } from '../../common/interfaces/server-response.interface';
import { IControlPanelInitialData } from '../interfaces/control-panel.init.interface';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { IApplication } from '../../applications/interfaces/application.interface';
import { Application } from '../../applications/models/application.model';
import { ApplicationMenuItem } from '../models/application-menu-item.model';
import { Company } from '../../companies/models/company.model';
import { ICompany } from '../../companies/interfaces/company.interface';
import { MatDialog } from '@angular/material';
import { CompanyAddDialogComponent } from '../../companies/components/company-add-dialog/company-add-dialog.component';

@Injectable()
export class DashboardService {
  public readonly menu: ApplicationMenuManager;
  public readonly applications: Application[];
  public readonly companies: Company[];

  constructor(private readonly resource: DashboardResource,
              private readonly router: Router,
              public readonly dialog: MatDialog) {
    this.applications = [];
    this.companies = [];
    this.menu = new ApplicationMenuManager();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        console.log(event);
        console.log(this.menu);
        this.menu.setActiveItem(event.urlAfterRedirects);
      }
    );

    this.menu.getActiveItem()
      .subscribe((item: ApplicationMenuItem) => {
        console.log('active', item);
      });

    this.menu.items.subscribe((items: ApplicationMenuItem[]) => {
      console.log('items changed', items);
    });
  }

  fetchInitialData(): Observable<IServerResponse<IControlPanelInitialData>> {
    return from(this.resource.getInitialData())
      .pipe(
        map((response: IServerResponse<IControlPanelInitialData>) => {
          if (response.data.applications.length > 0) {
            const applicationsMenuItem = this.menu.getItemById('applications');
            response.data.applications.forEach((item: IApplication) => {
              const application = new Application(item);
              application.backup.setup(['code', 'title', 'description']);
              this.applications.push(application);
              if (!applicationsMenuItem.getById(String(application.id))) {
                applicationsMenuItem.add({
                  id: String(application.id),
                  title: application.title,
                  link: `/applications/${application.id}`,
                  icon: 'web'
                });
              }
            });
          }

          if (response.data.companies.length > 0) {
            const companiesMenuItem = this.menu.getItemById('companies');
            response.data.companies.forEach((item: ICompany) => {
              const company = new Company(item);
              company.backup.setup(['title', 'shortTitle', 'departments', 'offices']);
              this.companies.push(company);
              if (!companiesMenuItem.getById(String(company.id))) {
                companiesMenuItem.add({
                  id: String(company.id),
                  title: company.shortTitle,
                  link: `/companies/${company.id}`,
                  icon: 'business'
                });
              }
            });
          }

          return response;
        })
      );
  }

  public openAddCompanyDialog() {
    console.log('open callback');
    this.dialog.open(CompanyAddDialogComponent, {
      width: '400px'
    });
  }

}
