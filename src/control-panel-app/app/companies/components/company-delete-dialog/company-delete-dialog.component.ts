import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-company-delete-dialog',
  templateUrl: './company-delete-dialog.component.html',
  styleUrls: ['./company-delete-dialog.component.less']
})
export class CompanyDeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CompanyDeleteDialogComponent>,
              private snackBar: MatSnackBar,
              public companies: CompaniesService) {}

  ngOnInit() {}

  /**
   * Отмена удаления организации и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Удаление организации
   */
  deleteCompany() {
    this.companies.deleteCompany(this.companies.selectedCompany$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Организация удалена', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

}
