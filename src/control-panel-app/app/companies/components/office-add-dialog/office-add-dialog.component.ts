import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Office } from '../../models/office.model';
import { CompaniesService } from '../../services/companies.service';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-office-add-dialog',
  templateUrl: './office-add-dialog.component.html',
  styleUrls: ['./office-add-dialog.component.less']
})
export class OfficeAddDialogComponent implements OnInit {
  public newOffice: Office;
  public newOfficeForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<OfficeAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {
    this.newOffice = new Office();
  }

  ngOnInit() {
    this.newOfficeForm = this.builder.group({
      departmentId: new FormControl(this.newOffice.departmentId, Validators.required),
      title: new FormControl(this.newOffice.title, Validators.required),
      description: new FormControl(this.newOffice.description),
      address: new FormControl(this.newOffice.address, Validators.required),
      floors: new FormControl(this.newOffice.floors, Validators.required),
      isWithLoft: new FormControl(this.newOffice.isWithLoft),
      isWithBasement: new FormControl(this.newOffice.isWithBasement)
    });
  }

  /**
   * Отмена добавления нового офиса организации и закрытие модального окна
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Добавление нового офиса организации
   */
  addOffice() {
    this.newOffice.companyId = this.companies.selectedCompany$.getValue().id;
    this.companies.addOffice(this.newOffice)
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Офис добавлен', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3
        });
      });
  }

}
