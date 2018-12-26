import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyComponent } from './components/company/company.component';
import { CompaniesService } from './services/companies.service';
import { CompaniesResource } from './resources/companies.resource';
import { CompaniesResolveGuard } from './guards/companies.resolve.guard';
import { CompanyAddDialogComponent } from './components/company-add-dialog/company-add-dialog.component';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { ApplicationMenuItem } from '../dashboard/models/application-menu-item.model';
import {Company, ICompany, IControlPanelInitialData} from "@kolenergo/cpa";
import { ApplicationMenuItemControl } from '../dashboard/models/application-menu-item-control.model';
import { MatDialog } from '@angular/material';

@NgModule({
  imports: [
    ExportsModule,
    CompaniesRoutingModule
  ],
  declarations: [
    CompaniesComponent,
    CompaniesListComponent,
    CompanyComponent,
    CompanyAddDialogComponent
  ],
  providers: [
    CompaniesResource,
    CompaniesService,
    CompaniesResolveGuard
  ],
  entryComponents: [
    CompanyAddDialogComponent
  ]
})
export class CompaniesModule {
  constructor(private readonly dialog: MatDialog,
              private readonly dashboard: DashboardService,
              private readonly companies: CompaniesService) {
    this.dashboard.initialData().subscribe((data: IControlPanelInitialData) => {
      const companies_ = [];
      const companiesMenuItem = this.dashboard.menu.getItemById('companies');
      data.companies.forEach((item: ICompany) => {
        const company = new Company(item);
        company.backup.setup(['title', 'shortTitle', 'departments', 'offices']);
        companies_.push(company);
        if (!companiesMenuItem.getById(String(company.id))) {
          companiesMenuItem.add({
            id: String(company.id),
            title: company.shortTitle,
            link: `/companies/${company.id}`,
            icon: 'business'
          });
        }
      });
      this.companies.companies$.next(companies_);
      companiesMenuItem.buttons.push(new ApplicationMenuItemControl({
        title: 'Добавить',
        icon: 'add',
        action: () => {
          this.dialog.open(CompanyAddDialogComponent, {
            width: '450px'
          });
        }
      }));
    });
  }
}
