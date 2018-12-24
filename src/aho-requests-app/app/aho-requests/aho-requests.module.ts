import { NgModule } from '@angular/core';
import { AhoRequestsRouterModule } from './aho-requests.router.module';
import { ExportsModule } from '../exports.module';
import { UsersModule } from '@kolenergo/cpa';
import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';
import { StartComponent } from './components/start/start.component';
import { NewRequestDialogComponent } from './components/new-request-dialog/new-request-dialog.component';
import { RequestDetailsDialogComponent } from './components/request-details-dialog/request-details-dialog.component';
import { AhoRequestsService } from './services/aho-requests.service';
import { AhoRequestsResolveGuard } from './guards/aho-requests-resolve.guard';
import { AhoRequestsResource } from './resources/aho-requests.resource';
import { AhoRequestResolveGuard } from './guards/aho-request-resolve.guard.';
import { TaskContentByRequestTypePipe } from './pipes/task-content-by-request-type.pipe';
import { MatIconRegistry } from '@angular/material/icon';
import { EmployeeByRequestTypePipe } from './pipes/employee-by-request-type.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { NeedsByRequestTypeIdPipe } from './pipes/needs.pipe';
import { AhoRequestsAdminGuard } from './guards/admin.can-activate.guard';
import { FiltersDialogComponent } from './components/filters-dialog/filters-dialog.component';
import { ShowCompletedRequestsPipe } from './pipes/show-completed-requests.pipe';
import { ExceptSelectedEmployeesPipe } from './pipes/except-selected-employees.pipe';
import { RejectRequestComponent } from './components/reject-request-dialog/reject-request.component';
import { RejectReasonsByRequestTypePipe } from './pipes/reject-reasons-by-request-type.pipe';
import { ExceptSelectedTasksPipe } from './pipes/except-selected-tasks.pipe';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { ResumeRequestDialogComponent } from './components/resume-request-dialog/resume-request-dialog.component';
import { DeleteRequestDialogComponent } from './components/delete-request-dialog/delete-request-dialog.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AhoRequestsWrapperComponent } from './components/aho-requests-wrapper/aho-requests-wrapper.component';
import { CancelRequestDialogComponent } from './components/cancel-request-dialog/cancel-request-dialog.component';

const moment = _rollupMoment || _moment;

@NgModule({
  imports: [
    ExportsModule,
    AhoRequestsRouterModule,
    UsersModule
  ],
  declarations: [
    AhoRequestsComponent,
    StartComponent,
    RequestDetailsDialogComponent,
    NewRequestDialogComponent,
    TaskContentByRequestTypePipe,
    EmployeeByRequestTypePipe,
    AdminComponent,
    NeedsByRequestTypeIdPipe,
    FiltersDialogComponent,
    ShowCompletedRequestsPipe,
    ExceptSelectedEmployeesPipe,
    RejectRequestComponent,
    RejectReasonsByRequestTypePipe,
    ExceptSelectedTasksPipe,
    ResumeRequestDialogComponent,
    DeleteRequestDialogComponent,
    WelcomeComponent,
    AhoRequestsWrapperComponent,
    CancelRequestDialogComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    AhoRequestsResource,
    AhoRequestsService,
    AhoRequestsResolveGuard,
    AhoRequestResolveGuard,
    AhoRequestsAdminGuard,
    MatIconRegistry,
    ShowCompletedRequestsPipe,
    AuthGuard
  ],
  entryComponents: [
    RequestDetailsDialogComponent,
    NewRequestDialogComponent,
    FiltersDialogComponent,
    RejectRequestComponent,
    ResumeRequestDialogComponent,
    DeleteRequestDialogComponent,
    CancelRequestDialogComponent
  ],
  exports: []
})
export class AhoRequestsModule {
  constructor(private readonly matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('fortawesome', 'fas');
    matIconRegistry.registerFontClassAlias('fortawesome', 'far');

  }
}
