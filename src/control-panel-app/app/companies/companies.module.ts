import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  imports: [
    ExportsModule,
    CompaniesRoutingModule
  ],
  declarations: [
    CompaniesComponent,
    CompaniesListComponent,
    CompanyComponent
  ]
})
export class CompaniesModule { }
