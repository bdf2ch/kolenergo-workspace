import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OperativeSituationComponent } from './operative-situation/components/operative-situation/operative-situation.component';
import { ReportsResolveGuard } from './operative-situation/guards/reports.resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: OperativeSituationComponent,
    resolve: [
      ReportsResolveGuard
    ]
  },
  {
    path: '',

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
