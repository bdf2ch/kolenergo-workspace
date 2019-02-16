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
    const company = this.companies.selectedCompany$.getValue();
    console.log(company);
    this.newOfficeForm = this.builder.group({
      title: new FormControl(this.newOffice.title, Validators.required),
      description: new FormControl(this.newOffice.description),
      address: new FormControl(this.newOffice.address, Validators.required),
      floors: new FormControl(this.newOffice.floors, Validators.required),
      isWithLoft: new FormControl(this.newOffice.isWithLoft),
      isWithBasement: new FormControl(this.newOffice.isWithBasement)
    });

    this.dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        console.log('office add dialog result', result);
      });
  }

  /**
   * Отмена добавления нового помещения и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close(false);
  }

  /**
   * Добавление нового помещения
   */
  addOffice() {
    this.newOffice.companyId = this.companies.selectedCompany$.getValue().id;
    this.newOffice.departmentId = this.companies.selectedDepartment$.getValue().id;
    this.companies.addOffice(this.newOffice)
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Здание добавлено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

}
