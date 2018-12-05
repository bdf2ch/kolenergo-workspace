import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OperativeSituationComponent } from './operative-situation/components/operative-situation/operative-situation.component';
import { ReportsResolveGuard } from './operative-situation/guards/reports.resolve.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './operative-situation/operative-situation.module#OperativeSituationModule'
  },
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
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
export class ApplicationRoutingModule {}
