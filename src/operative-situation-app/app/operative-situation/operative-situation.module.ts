import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { OperativeSituationService } from './services/operative-situation.service';
import { OperativeSituationResource } from './resources/operative-situation.resource';
import { OperativeSituationComponent } from './components/operative-situation/operative-situation.component';
import { ReportsResolveGuard } from './guards/reports.resolve.guard';
import { ReportAddDialogComponent } from './components/report-add-dialog/report-add-dialog.component';


@NgModule({
  imports: [
    ExportsModule,
  ],
  declarations: [
    OperativeSituationComponent,
    ReportAddDialogComponent
  ],
  providers: [
    OperativeSituationResource,
    OperativeSituationService,
    ReportsResolveGuard
  ],
  entryComponents: [
    ReportAddDialogComponent
  ]
})
export class OperativeSituationModule {

  constructor() {}
}
