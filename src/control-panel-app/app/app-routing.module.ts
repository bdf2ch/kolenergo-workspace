import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { InitDataResolveGuard } from './dashboard/guards/init-data.resolve.guard';
import { StartComponent } from './dashboard/components/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: [
      // InitDataResolveGuard
    ],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: StartComponent
      },
      {
        path: 'companies',
        loadChildren: './companies/companies.module#CompaniesModule',
      },
      {
        path: 'applications',
        loadChildren: './applications/applications.module#ApplicationsModule',
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
