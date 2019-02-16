import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-department-delete-dialog',
  templateUrl: './department-delete-dialog.component.html',
  styleUrls: ['./department-delete-dialog.component.less']
})
export class DepartmentDeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DepartmentDeleteDialogComponent>,
              private snackBar: MatSnackBar,
              public companies: CompaniesService) {}

  ngOnInit() {}

  /**
   * Отмена удаления подразделения организации и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Удаление подразделения организации
   */
  deleteDepartment() {
    this.companies.deleteDepartment(this.companies.selectedDepartment$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Подразделение удалено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }
}
