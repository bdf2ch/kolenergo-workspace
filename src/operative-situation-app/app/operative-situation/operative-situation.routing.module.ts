import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperativeSituationComponent } from './components/operative-situation/operative-situation.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportsResolveGuard } from './guards/reports.resolve.guard';
import { SessionCanActivateGuard } from './guards/session.can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: OperativeSituationComponent,
    canActivate: [
      SessionCanActivateGuard
    ],
    resolve: [
      ReportsResolveGuard
    ],
    children: [
      {
        path: '',
        component: ReportListComponent
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
export class OperativeSituationRoutingModule {}
