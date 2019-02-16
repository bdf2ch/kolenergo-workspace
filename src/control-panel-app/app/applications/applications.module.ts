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
import { ExceptSelectedPermissionsPipe } from './pipes/except-selected-permissions.pipe';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { Application, Company, IApplication, ICompany, IControlPanelInitialData } from '@kolenergo/cpa';
import {ApplicationMenuItemControl} from '../dashboard/models/application-menu-item-control.model';
import {CompanyAddDialogComponent} from '../companies/components/company-add-dialog/company-add-dialog.component';
import {ApplicationMenuItem} from '../dashboard/models/application-menu-item.model';
import { SettingsComponent } from './components/settings/settings.component';
import { RolesComponent } from './components/roles/roles.component';
import { EmployeesComponent } from './components/employees/employees.component';


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
    RoleAddDialogComponent,
    ExceptSelectedPermissionsPipe,
    SettingsComponent,
    RolesComponent,
    EmployeesComponent
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

  constructor(private readonly dashboard: DashboardService,
              private readonly applications: ApplicationsService) {
    this.dashboard.initialData().subscribe((data: IControlPanelInitialData) => {
      const applications_ = [];
      const applicationsMenuItem = this.dashboard.menu.getItemById('applications');
      data.applications.forEach((item: IApplication) => {
        const application = new Application(item);
        application.backup.setup(['title', 'description']);
        applications_.push(application);
        this.dashboard.menu.addItem(new ApplicationMenuItem({
          id: String(application.id),
          title: application.title,
          link: `/applications/${application.id}`,
          icon: 'web'
        }), applicationsMenuItem);
      });
      this.applications.applications$.next(applications_);
    });
  }
}
