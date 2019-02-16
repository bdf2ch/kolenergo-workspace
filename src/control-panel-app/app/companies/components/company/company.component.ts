import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange, MatTableDataSource } from '@angular/material';
import { Department, Office, Division } from '../../models';
import { Tree, TreeItem } from '../../../basic/models';
import { OfficeAddDialogComponent } from '../office-add-dialog/office-add-dialog.component';
import { OfficeEditDialogComponent } from '../office-edit-dialog/office-edit-dialog.component';
import { DivisionAddDialogComponent } from '../division-add-dialog/division-add-dialog.component';
import { DivisionEditDialogComponent } from '../division-edit-dialog/division-edit-dialog.component';
import { DivisionDeleteDialogComponent } from '../division-delete-dialog/division-delete-dialog.component';
import { OfficeDeleteDialogComponent } from '../office-delete-dialog/office-delete-dialog.component';
import {LocationAddDialogComponent} from '../location-add-dialog/location-add-dialog.component';
import {LocationDeleteDialogComponent} from '../location-delete-dialog/location-delete-dialog.component';
import {LocationEditDialogComponent} from '../location-edit-dialog/location-edit-dialog.component';
import {DepartmentAddDialogComponent} from '../department-add-dialog/department-add-dialog.component';
import {DepartmentEditDialogComponent} from '../department-edit-dialog/department-edit-dialog.component';
import {DepartmentDeleteDialogComponent} from '../department-delete-dialog/department-delete-dialog.component';
import {CompanyEditDialogComponent} from '../company-edit-dialog/company-edit-dialog.component';
import {CompanyDeleteDialogComponent} from '../company-delete-dialog/company-delete-dialog.component';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
})
export class CompanyComponent implements OnInit {
  public departmentsDisplayColumns: string[];

  constructor(private readonly route: ActivatedRoute,
              private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<OfficeAddDialogComponent>,
              public readonly companies: CompaniesService) {
    this.departmentsDisplayColumns = ['title', 'controls'];
    this.route.params.subscribe((data: any) => {
      if (data['id']) {
        const company = this.companies.getCompanyById(Number(data['id']));
        if (company) {
          this.companies.selectedCompany(company);
          // this.companies.officesDataSource = new MatTableDataSource<Office>(company.offices);
          // this.companies.departmentsDataSource = new MatTableDataSource<Department>(company.departments);
          // this.companies.selectedDepartment(company.departments.length > 0 ? company.departments[0] : null);
          // this.companies.selectedCompanyDivisionTree = new Tree<Division>(company.divisions, 'id', 'parentId', 'title');
          // this.companies.selectedOffice(company.offices.length > 0 ? company.offices[0] : null);
          // const office = this.companies.selectedOffice$.getValue();
          // if (office) {
          //  this.companies.selectedFloor$.next(office.floors_.length > 0 ? office.floors_[0] : null);
          // }
          // this.companies.selectedDivision$.next(null);
        }
      }
    });
  }


  ngOnInit() {}

  /**
   * Открытие диалогового окна добавления подразделения организации
   */
  openDepartmentAddDialog() {
    this.dialog.open(DepartmentAddDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна добавления офиса организации
   */
  openAddOfficeDialog() {
    this.dialog.open(OfficeAddDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна изменения организации
   */
  openCompanyEditDialog() {
    this.dialog.open(CompanyEditDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна изменения подразделения организации
   */
  openDepartmentEditDialog() {
    this.dialog.open(DepartmentEditDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна удаления подразделения организации
   */
  openDepartmentDeleteDialog() {
    this.dialog.open(DepartmentDeleteDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна изменения офиса организации
   */
  openEditOfficeDialog(office: Office) {
    this.companies.selectedOffice(office);
    this.dialog.open(OfficeEditDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна добавления помещения организации
   */
  openAddLocationDialog() {
    this.dialog.open(LocationAddDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна изменения помещения в здании организации
   */
  openEditLocationDialog() {
    this.dialog.open(LocationEditDialogComponent, {
      width: '450px'
    });
  }


  /**
   * Открытие диалогового окна удаления помещения в здании организации
   */
  openDeleteLocationDialog() {
    this.dialog.open(LocationDeleteDialogComponent, {
      width: '450px'
    });
  }


  /**
   * Открытие диалогового окна добавления структурного подразделения организации
   */
  openAddDivisionDialog() {
    this.dialog.open(DivisionAddDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна изменения структурного подразделения организации
   */
  openEditDivisionDialog() {
    this.dialog.open(DivisionEditDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна удаления организации
   */
  openCompanyDeleteDialog() {
    this.dialog.open(CompanyDeleteDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна удаления помещения организации
   */
  openDeleteOfficeDialog(office: Office) {
    this.companies.selectedOffice$.next(office);
    this.dialog.open(OfficeDeleteDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Открытие диалогового окна удаления структурного подразделения организации
   */
  openDeleteDivisionDialog() {
    this.dialog.open(DivisionDeleteDialogComponent, {
      width: '450px'
    });
  }

  /**
   * Выбор подразделения организации
   * @param event - Событие выбора элемента выпадающего списка
   */
  selectDepartment(event: MatSelectChange) {
    this.companies.selectedDepartment(event.value);
  }


  /**
   * Выбор офиса организации
   * @param event - Событие выбора элемента выпадающего списка
   */
  selectOffice(event: MatSelectChange) {
    this.companies.selectedOffice(event.value);
  }

  /**
   * Выбор этажа помещения организации
   * @param event - Событие выбора выпадающего списка
   */
  selectFloor(event: MatSelectChange) {
    this.companies.selectedFloor(event.value);
  }

  /**
   * Выбор структурного подразделения
   * @param division - Выбранное структурное подразделение
   */
  selectDivision(item: TreeItem<Division>) {
    if (item) {
      this.companies.selectedDivision$.next(item.item);
    } else {
      this.companies.selectedDivision$.next(null);
    }
    console.log('selected division', this.companies.selectedDivision$.getValue());
  }
}
