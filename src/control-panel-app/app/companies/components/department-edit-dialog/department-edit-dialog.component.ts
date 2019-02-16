import { Component, OnInit } from '@angular/core';
import {Department} from '../../models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {CompaniesService} from '../../services/companies.service';

@Component({
  selector: 'app-department-edit-dialog',
  templateUrl: './department-edit-dialog.component.html',
  styleUrls: ['./department-edit-dialog.component.less']
})
export class DepartmentEditDialogComponent implements OnInit {
  public editDepartmentForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<DepartmentEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {}

  ngOnInit() {
    this.editDepartmentForm = this.builder.group({
      title: new FormControl(this.companies.selectedDepartment$.getValue().title, Validators.required),
      activeDirectoryUid: new FormControl(this.companies.selectedDepartment$.getValue().activeDirectoryUid)
    });
  }

  /**
   * Отмена измеения нового подразделения организации и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close(false);
    this.companies.selectedDepartment$.getValue().backup.restore();
  }

  /**
   * Изменение подразделения организации
   */
  editDepartment() {
    this.companies.editDepartment(this.companies.selectedDepartment$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Подразделение изменено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }
}
