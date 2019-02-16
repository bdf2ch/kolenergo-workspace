import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-office-delete-dialog',
  templateUrl: './office-delete-dialog.component.html',
  styleUrls: ['./office-delete-dialog.component.less']
})
export class OfficeDeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OfficeDeleteDialogComponent>,
              private snackBar: MatSnackBar,
              public companies: CompaniesService) {}

  ngOnInit() {}

  /**
   * Отмена удаления здания организации и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Удаление здания организации
   */
  deleteOffice() {
    this.companies.deleteOffice(this.companies.selectedOffice$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Здание удалено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

}
