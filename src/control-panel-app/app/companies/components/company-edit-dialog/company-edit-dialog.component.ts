import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-company-edit-dialog',
  templateUrl: './company-edit-dialog.component.html',
  styleUrls: ['./company-edit-dialog.component.less']
})
export class CompanyEditDialogComponent implements OnInit {
  public editCompanyForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<CompanyEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {}

  ngOnInit() {
    this.editCompanyForm = this.builder.group({
      title: new FormControl(this.companies.selectedCompany$.getValue().title, Validators.required),
      shortTitle: new FormControl(this.companies.selectedCompany$.getValue().shortTitle),
      activeDirectoryUid: new FormControl(this.companies.selectedCompany$.getValue().activeDirectoryUid)
    });
  }

  /**
   * Отмена изменения организации и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close(false);
    this.companies.selectedCompany$.getValue().backup.restore();
  }

  /**
   * Изменение организации
   */
  editCompany() {
    this.companies.editCompany(this.companies.selectedCompany$.getValue())
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Организация изменена', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }
}
