import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyComponent } from './components/company/company.component';
import { CompaniesService } from './services/companies.service';
import { CompaniesResource } from './resources/companies.resource';
import { CompaniesResolveGuard } from './guards/companies.resolve.guard';
import { CompanyAddDialogComponent } from './components/company-add-dialog/company-add-dialog.component';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { ApplicationMenuItem } from '../dashboard/models/application-menu-item.model';
import { Company, ICompany, IControlPanelInitialData } from '@kolenergo/cpa';
import { ApplicationMenuItemControl } from '../dashboard/models/application-menu-item-control.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { OfficeAddDialogComponent } from './components/office-add-dialog/office-add-dialog.component';
import { DivisionAddDialogComponent } from './components/division-add-dialog/division-add-dialog.component';
import { DivisionEditDialogComponent } from './components/division-edit-dialog/division-edit-dialog.component';
import { DivisionDeleteDialogComponent } from './components/division-delete-dialog/division-delete-dialog.component';
import { OfficeEditDialogComponent } from './components/office-edit-dialog/office-edit-dialog.component';
import { OfficeDeleteDialogComponent } from './components/office-delete-dialog/office-delete-dialog.component';
import { LocationAddDialogComponent } from './components/location-add-dialog/location-add-dialog.component';
import { OfficesByDepartmentPipe } from './pipes/offices-by-department.pipe';
import { LocationDeleteDialogComponent } from './components/location-delete-dialog/location-delete-dialog.component';
import { LocationsByFloorPipe } from './pipes/locations-by-floor.pipe';
import { LocationEditDialogComponent } from './components/location-edit-dialog/location-edit-dialog.component';
import { DepartmentAddDialogComponent } from './components/department-add-dialog/department-add-dialog.component';
import { DepartmentEditDialogComponent } from './components/department-edit-dialog/department-edit-dialog.component';
import { DepartmentDeleteDialogComponent } from './components/department-delete-dialog/department-delete-dialog.component';
import { CompanyEditDialogComponent } from './components/company-edit-dialog/company-edit-dialog.component';
import { CompanyDeleteDialogComponent } from './components/company-delete-dialog/company-delete-dialog.component';

@NgModule({
  imports: [
    ExportsModule,
    CompaniesRoutingModule
  ],
  declarations: [
    CompaniesComponent,
    CompaniesListComponent,
    CompanyComponent,
    CompanyAddDialogComponent,
    OfficeAddDialogComponent,
    DivisionAddDialogComponent,
    DivisionEditDialogComponent,
    DivisionDeleteDialogComponent,
    OfficeEditDialogComponent,
    OfficeDeleteDialogComponent,
    LocationAddDialogComponent,
    OfficesByDepartmentPipe,
    LocationDeleteDialogComponent,
    LocationsByFloorPipe,
    LocationEditDialogComponent,
    DepartmentAddDialogComponent,
    DepartmentEditDialogComponent,
    DepartmentDeleteDialogComponent,
    CompanyEditDialogComponent,
    CompanyDeleteDialogComponent
  ],
  providers: [
    CompaniesResource,
    CompaniesService,
    CompaniesResolveGuard,
    LocationsByFloorPipe,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    },
  ],
  entryComponents: [
    CompanyAddDialogComponent,
    CompanyEditDialogComponent,
    CompanyDeleteDialogComponent,
    DepartmentAddDialogComponent,
    DepartmentEditDialogComponent,
    DepartmentDeleteDialogComponent,
    OfficeAddDialogComponent,
    OfficeEditDialogComponent,
    OfficeDeleteDialogComponent,
    LocationAddDialogComponent,
    LocationEditDialogComponent,
    LocationDeleteDialogComponent,
    DivisionAddDialogComponent,
    DivisionEditDialogComponent,
    DivisionDeleteDialogComponent
  ]
})
export class CompaniesModule {
  constructor(private readonly dialog: MatDialog,
              private readonly dashboard: DashboardService,
              private readonly companies: CompaniesService) {
    this.dashboard.initialData().subscribe((data: IControlPanelInitialData) => {
      const companies_ = [];
      const companiesMenuItem = this.dashboard.menu.getItemById('companies');
      data.companies.forEach((item: ICompany) => {
        const company = new Company(item);
        company.backup.setup(['title', 'shortTitle', 'activeDirectoryUid']);
        companies_.push(company);
        this.dashboard.menu.addItem(new ApplicationMenuItem({
          id: `company${company.id}`,
          title: company.shortTitle ? company.shortTitle : company.title,
          link: `/companies/${company.id}`,
          icon: 'business'
        }), companiesMenuItem);
      });
      this.companies.companies$.next(companies_);
      companiesMenuItem.buttons.push(new ApplicationMenuItemControl({
        title: 'Добавить',
        icon: 'add',
        action: () => {
          this.dialog.open(CompanyAddDialogComponent, {
            width: '450px'
          });
        }
      }));
    });
  }
}
