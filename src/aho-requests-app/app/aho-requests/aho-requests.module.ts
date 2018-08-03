import { NgModule } from '@angular/core';
import { AhoRequestsRouterModule } from './aho-requests.router.module';
import { ExportsModule } from '../exports.module';
import { UsersModule } from '@kolenergo/lib';

import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';
import { StartComponent } from './components/start/start.component';
import { NewRequestComponent } from './components/new-request/new-request.component';
import { AhoRequestComponent } from './components/request/aho-request.component';
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
import { FiltersComponent } from './components/filters/filters.component';
import { ShowCompletedRequestsPipe } from './pipes/show-completed-requests.pipe';
import { ExceptSelectedEmployeesPipe } from './pipes/except-selected-employees.pipe';
import { RejectRequestComponent } from './components/reject-request/reject-request.component';
import { RejectReasonsByRequestTypePipe } from './pipes/reject-reasons-by-request-type.pipe';
import { ExceptSelectedTasksPipe } from './pipes/except-selected-tasks.pipe';

@NgModule({
  imports: [
    ExportsModule,
    AhoRequestsRouterModule,
    UsersModule
  ],
  declarations: [
    AhoRequestsComponent,
    StartComponent,
    AhoRequestComponent,
    NewRequestComponent,
    TaskContentByRequestTypePipe,
    EmployeeByRequestTypePipe,
    AdminComponent,
    NeedsByRequestTypeIdPipe,
    FiltersComponent,
    ShowCompletedRequestsPipe,
    ExceptSelectedEmployeesPipe,
    RejectRequestComponent,
    RejectReasonsByRequestTypePipe,
    ExceptSelectedTasksPipe
  ],
  providers: [
    AhoRequestsResource,
    AhoRequestsService,
    AhoRequestsResolveGuard,
    AhoRequestResolveGuard,
    AhoRequestsAdminGuard,
    MatIconRegistry,
    ShowCompletedRequestsPipe
  ],
  entryComponents: [
    AhoRequestComponent,
    NewRequestComponent,
    FiltersComponent,
    RejectRequestComponent
  ],
  exports: []
})
export class AhoRequestsModule {
  constructor(private readonly matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('fortawesome', 'fas');
  }
}
