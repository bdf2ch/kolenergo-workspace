import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsResource } from './resources/applications.resource';
import { ApplicationComponent } from './components/application/application.component';
import { ApplicationsResolveGuard } from './guards/applications.resolve.guard';
import { EditPermissionDialogComponent } from './components/edit-permission-dialog/edit-permission-dialog.component';
import { AddPermissionDialogComponent } from './components/add-permission-dialog/add-permission-dialog.component';


@NgModule({
  imports: [
    ExportsModule,
    DashboardModule,
    ApplicationsRoutingModule
  ],
  declarations: [
    ApplicationsComponent,
    ApplicationsListComponent,
    ApplicationComponent,
    EditPermissionDialogComponent,
    AddPermissionDialogComponent
  ],
  providers: [
    ApplicationsResource,
    ApplicationsService,
    ApplicationsResolveGuard
  ],
  entryComponents: [
    EditPermissionDialogComponent
  ]
})
export class ApplicationsModule {

  constructor() {}
}
