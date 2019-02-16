import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-location-edit-dialog',
  templateUrl: './location-edit-dialog.component.html',
  styleUrls: ['./location-edit-dialog.component.less']
})
export class LocationEditDialogComponent implements OnInit {
  public editLocationForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<LocationEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {}

  ngOnInit() {
    const location = this.companies.selectedLocation$.getValue();
    this.editLocationForm = this.builder.group({
      title: new FormControl(location.title, Validators.required),
      description: new FormControl(location.description)
    });
  }

  /**
   * Отмена изменения помещения в здании организации и закрытие модального окна
   */
  cancel() {
    this.dialogRef.close(false);
  }

  /**
   * Сохранение изменений помещения в здании организации
   */
  addLocation() {
    this.companies.editLocation(this.companies.selectedLocation$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Помещение добавлено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

}
