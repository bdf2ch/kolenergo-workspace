import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyComponent } from './components/company/company.component';
import {CompaniesResolveGuard} from './guards/companies.resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: CompaniesComponent,
    resolve: [
      CompaniesResolveGuard
    ],
    children: [
      {
        path: '',
        component: CompaniesListComponent
      },
      {
        path: ':id',
        component: CompanyComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CompaniesRoutingModule { }
