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
import { PermissionEditDialogComponent } from './components/permission-edit-dialog/permission-edit-dialog.component';
import { PermissionAddDialogComponent } from './components/permission-add-dialog/permission-add-dialog.component';
import { RoleEditDialogComponent } from './components/role-edit-dialog/role-edit-dialog.component';
import { RoleAddDialogComponent } from './components/role-add-dialog/role-add-dialog.component';


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
    PermissionEditDialogComponent,
    PermissionAddDialogComponent,
    RoleEditDialogComponent,
    RoleAddDialogComponent
  ],
  providers: [
    ApplicationsResource,
    ApplicationsService,
    ApplicationsResolveGuard
  ],
  entryComponents: [
    RoleAddDialogComponent,
    RoleEditDialogComponent,
    PermissionAddDialogComponent,
    PermissionEditDialogComponent
  ]
})
export class ApplicationsModule {

  constructor() {}
}
