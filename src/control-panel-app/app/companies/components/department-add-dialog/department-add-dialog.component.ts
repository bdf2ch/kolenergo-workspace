import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';
import { Department } from '../../models';

@Component({
  selector: 'app-department-add-dialog',
  templateUrl: './department-add-dialog.component.html',
  styleUrls: ['./department-add-dialog.component.less']
})
export class DepartmentAddDialogComponent implements OnInit {
  public newDepartment: Department;
  public newDepartmentForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<DepartmentAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {
    this.newDepartment = new Department();
  }

  ngOnInit() {
    this.newDepartmentForm = this.builder.group({
      title: new FormControl(this.newDepartment.title, Validators.required),
      activeDirectoryUid: new FormControl(this.newDepartment.activeDirectoryUid)
    });

    this.dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        console.log('office add dialog result', result);
      });
  }

  /**
   * Отмена добавления нового подразделения организации и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close(false);
  }

  /**
   * Добавление нового подразделения организации
   */
  addDepartment() {
    this.newDepartment.companyId = this.companies.selectedCompany$.getValue().id;
    this.companies.addDepartment(this.newDepartment)
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Подразделение добавлено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }
}
