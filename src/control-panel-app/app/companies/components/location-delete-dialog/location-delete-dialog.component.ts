import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-location-delete-dialog',
  templateUrl: './location-delete-dialog.component.html',
  styleUrls: ['./location-delete-dialog.component.less']
})
export class LocationDeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LocationDeleteDialogComponent>,
              private snackBar: MatSnackBar,
              public companies: CompaniesService) {}

  ngOnInit() {}

  /**
   * Отмена удаления помещения в здании организации и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Удаление помещения орагнизации
   */
  deleteLocation() {
    this.companies.deleteLocation(this.companies.selectedLocation$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Помещение удалено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

}
