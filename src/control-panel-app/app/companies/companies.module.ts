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
import {DashboardService} from '../dashboard/services/dashboard.service';

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
  constructor(private readonly dashboard: DashboardService,
              private readonly companies: CompaniesService) {
    this.companies.companies$.next(this.dashboard.companies);
  }
}
