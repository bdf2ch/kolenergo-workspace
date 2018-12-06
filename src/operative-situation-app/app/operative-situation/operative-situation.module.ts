import { NgModule } from '@angular/core';
import { OperativeSituationRoutingModule } from './operative-situation.routing.module';
import { ExportsModule } from '../exports.module';
import { OperativeSituationService } from './services/operative-situation.service';
import { OperativeSituationResource } from './resources/operative-situation.resource';
import { OperativeSituationComponent } from './components/operative-situation/operative-situation.component';
import { SessionCanActivateGuard } from './guards/session.can-activate.guard';
import { ReportsResolveGuard } from './guards/reports.resolve.guard';
import { ReportAddDialogComponent } from './components/report-add-dialog/report-add-dialog.component';
import { ReportEditDialogComponent } from './components/report-edit-dialog/report-edit-dialog.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { TimePeriodsPipe } from './pipes/time-periods.pipe';


@NgModule({
  imports: [
    ExportsModule,
    OperativeSituationRoutingModule
  ],
  declarations: [
    OperativeSituationComponent,
    ReportAddDialogComponent,
    ReportEditDialogComponent,
    ReportListComponent,
    TimePeriodsPipe
  ],
  providers: [
    OperativeSituationResource,
    OperativeSituationService,
    SessionCanActivateGuard,
    ReportsResolveGuard
  ],
  entryComponents: [
    ReportAddDialogComponent,
    ReportEditDialogComponent
  ]
})
export class OperativeSituationModule {}
