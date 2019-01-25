import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-office-edit-dialog',
  templateUrl: './office-edit-dialog.component.html',
  styleUrls: ['./office-edit-dialog.component.less']
})
export class OfficeEditDialogComponent implements OnInit {
  public editOfficeForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<OfficeEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {}

  ngOnInit() {
    const office = this.companies.selectedOffice$.getValue();
    this.editOfficeForm = this.builder.group({
      departmentId: new FormControl(office.departmentId, Validators.required),
      title: new FormControl(office.title, Validators.required),
      description: new FormControl(office.description),
      address: new FormControl(office.address, Validators.required),
      floors: new FormControl(office.floors, Validators.required),
      isWithLoft: new FormControl(office.isWithLoft),
      isWithBasement: new FormControl(office.isWithBasement)
    });
  }

  /**
   * Отмена изменения офиса организации и закрытие модального окна
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Изменение офиса организации
   */
  editOffice() {
    this.companies.editOffice(this.companies.selectedOffice$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Помещение изменено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

}
