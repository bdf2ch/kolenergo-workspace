import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-division-delete-dialog',
  templateUrl: './division-delete-dialog.component.html',
  styleUrls: ['./division-delete-dialog.component.less']
})
export class DivisionDeleteDialogComponent implements OnInit {
  constructor(
              private readonly dialogRef: MatDialogRef<DivisionDeleteDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {
  }

  ngOnInit() {}

  /**
   * Отмена удаления структурного подразделения и закрытие модального окна
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Удаление структурного подразделения
   */
  deleteDivision() {
    this.companies.deleteDivision(this.companies.selectedDivision$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Структурное подразделение удалено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }
}
