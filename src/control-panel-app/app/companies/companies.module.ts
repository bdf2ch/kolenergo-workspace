import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyComponent } from './components/company/company.component';
import { CompaniesService } from './services/companies.service';
import { CompaniesResource } from './resources/companies.resource';
import { CompaniesResolveGuard } from './guards/companies.resolve.guard';

@NgModule({
  imports: [
    ExportsModule,
    CompaniesRoutingModule
  ],
  declarations: [
    CompaniesComponent,
    CompaniesListComponent,
    CompanyComponent
  ],
  providers: [
    CompaniesResource,
    CompaniesService,
    CompaniesResolveGuard
  ]
})
export class CompaniesModule { }
