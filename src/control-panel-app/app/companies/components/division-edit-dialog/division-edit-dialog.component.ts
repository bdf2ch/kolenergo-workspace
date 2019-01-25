import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-division-edit-dialog',
  templateUrl: './division-edit-dialog.component.html',
  styleUrls: ['./division-edit-dialog.component.less']
})
export class DivisionEditDialogComponent implements OnInit {
  public editDivisionForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<DivisionEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {
  }

  ngOnInit() {
    this.editDivisionForm = this.builder.group({
      title: new FormControl(this.companies.selectedDivision$.getValue().title, Validators.required),
      order: new FormControl(this.companies.selectedDivision$.getValue().order)
    });
  }

  /**
   * Отмена изменения структурного подразделения и закрытие модального окна
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Изменение структурного подразделения
   */
  editDivision() {
    this.companies.editDivision(this.companies.selectedDivision$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Структурное подразделение изменено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

}
