import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import { Department, Office } from '../../models';
import { OfficeAddDialogComponent } from '../office-add-dialog/office-add-dialog.component';

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
    this.departmentsDisplayColumns = ['title'];
    this.route.params.subscribe((data: any) => {
      if (data['id']) {
        const company = this.companies.getCompanyById(Number(data['id']));
        if (company) {
          this.companies.selectedCompany(company);
          this.departmentsDataSource = new MatTableDataSource<Department>(company.departments);
          this.officesDataSource = new MatTableDataSource<Office>(company.offices);
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
}
