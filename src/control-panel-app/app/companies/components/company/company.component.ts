import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
import { Department, Office } from '../../models';
import { OfficeAddDialogComponent } from '../office-add-dialog/office-add-dialog.component';
import { Division } from '../../models/division.model';
import { TreeItem } from '../../../basic/models/tree-item.model';
import { DivisionAddDialogComponent } from '../division-add-dialog/division-add-dialog.component';
import { DivisionEditDialogComponent } from '../division-edit-dialog/division-edit-dialog.component';
import { DivisionDeleteDialogComponent } from '../division-delete-dialog/division-delete-dialog.component';
import { Tree } from '../../../basic/models/tree.model';
import {OfficeEditDialogComponent} from '../office-edit-dialog/office-edit-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
})
export class CompanyComponent implements OnInit {
  public departmentsDataSource: MatTableDataSource<Department>;
  public departmentsDisplayColumns: string[];
  public officesDataSource: MatTableDataSource<Office>;

  constructor(private readonly route: ActivatedRoute,
              private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<OfficeAddDialogComponent>,
              public readonly companies: CompaniesService) {
    this.departmentsDataSource = new MatTableDataSource<Department>([]);
    this.officesDataSource = new MatTableDataSource<Office>([]);
    this.departmentsDisplayColumns = ['title', 'controls'];
    this.route.params.subscribe((data: any) => {
      if (data['id']) {
        const company = this.companies.getCompanyById(Number(data['id']));
        if (company) {
          this.companies.selectedCompany(company);
          this.departmentsDataSource = new MatTableDataSource<Department>(company.departments);
          this.officesDataSource = new MatTableDataSource<Office>(company.offices);
          this.companies.selectedCompanyDivisionTree = new Tree<Division>(company.divisions, 'id', 'parentId', 'title');
          this.companies.selectedDivision$.next(null);
        }
      }
    });
  }


  ngOnInit() {
    this.dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result === true) {
          this.officesDataSource = new MatTableDataSource<Office>(this.companies.selectedCompany$.getValue().offices);
        }
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
   * Открытие диалогового окна изменения офиса организации
   */
  openEditOfficeDialog(office: Office) {
    this.companies.selectedOffice(office);
    this.dialog.open(OfficeEditDialogComponent, {
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
   * Открытие диалогового окна удаления структурного подразделения организации
   */
  openDeleteDivisionDialog() {
    this.dialog.open(DivisionDeleteDialogComponent, {
      width: '450px'
    });
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
