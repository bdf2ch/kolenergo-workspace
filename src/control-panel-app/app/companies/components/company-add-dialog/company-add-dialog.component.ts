import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../models';


@Component({
  selector: 'app-company-add-dialog',
  templateUrl: './company-add-dialog.component.html',
  styleUrls: ['./company-add-dialog.component.less']
})
export class CompanyAddDialogComponent implements OnInit {
  public newCompany: Company;
  public newCompanyForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<CompanyAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {
    this.newCompany = new Company();
  }

  ngOnInit() {
    this.newCompanyForm = this.builder.group({
      title: new FormControl(this.newCompany.title, Validators.required),
      shortTitle: new FormControl(this.newCompany.shortTitle),
      activeDirectoryUid: new FormControl(this.newCompany.activeDirectoryUid)
    });
  }

  /**
   * Отмена добавления новой организации и закрытие диалогового окна
   */
  cancel() {
    this.dialogRef.close(false);
  }

  /**
   * Добавление новой организации
   */
  addCompany() {
    this.companies.addCompany(this.newCompany)
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Организация добавлена', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }
}
