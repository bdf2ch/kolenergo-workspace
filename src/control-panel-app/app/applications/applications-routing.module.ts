import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationsResolveGuard } from './guards/applications.resolve.guard';
import { SettingsComponent } from './components/settings/settings.component';
import {RolesComponent} from './components/roles/roles.component';
import {EmployeesComponent} from './components/employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    resolve: [
      // ApplicationsResolveGuard
    ],
    children: [
      {
        path: '',
        component: ApplicationsListComponent
      },
      {
        path: ':id',
        component: ApplicationComponent,
        children: [
          {
            path: '',
            redirectTo: 'roles',
            pathMatch: 'full'
          },
          {
            path: 'roles',
            component: RolesComponent
          },
          {
            path: 'employees',
            component: EmployeesComponent
          },
          {
            path: 'settings',
            component: SettingsComponent
          }
        ]
      },
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
export class ApplicationsRoutingModule {}
