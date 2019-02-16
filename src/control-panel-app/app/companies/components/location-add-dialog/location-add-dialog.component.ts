import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { OfficeLocation } from '../../../companies/models';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-location-add-dialog',
  templateUrl: './location-add-dialog.component.html',
  styleUrls: ['./location-add-dialog.component.less']
})
export class LocationAddDialogComponent implements OnInit {
  public newLocation: OfficeLocation;
  public newLocationForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<LocationAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {
    this.newLocation = new OfficeLocation();
  }

  ngOnInit() {
    const company = this.companies.selectedCompany$.getValue();
    this.newLocationForm = this.builder.group({
      title: new FormControl(this.newLocation.title, Validators.required),
      description: new FormControl(this.newLocation.description)
    });

    this.dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        console.log('office add dialog result', result);
      });
  }

  /**
   * Отмена добавления нового офиса организации и закрытие модального окна
   */
  cancel() {
    this.dialogRef.close(false);
  }

  /**
   * Добавление нового офиса организации
   */
  addLocation() {
    this.newLocation.companyId = this.companies.selectedCompany$.getValue().id;
    this.newLocation.officeId = this.companies.selectedOffice$.getValue().id;
    this.newLocation.departmentId = this.companies.selectedOffice$.getValue().departmentId;
    this.newLocation.floor = this.companies.selectedFloor$.getValue().number;
    this.companies.addLocation(this.newLocation)
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
