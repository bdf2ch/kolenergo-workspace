import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Division } from '../../models/division.model';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-division-add-dialog',
  templateUrl: './division-add-dialog.component.html',
  styleUrls: ['./division-add-dialog.component.less']
})
export class DivisionAddDialogComponent implements OnInit {
  public newDivision: Division;
  public newDivisionForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<DivisionAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly companies: CompaniesService) {
    this.newDivision = new Division();
  }

  ngOnInit() {
    this.newDivisionForm = this.builder.group({
      title: new FormControl(this.newDivision.title, Validators.required),
      order: new FormControl(this.newDivision.order)
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
  addDivision() {
    const company = this.companies.selectedCompany$.getValue();
    const division = this.companies.selectedDivision$.getValue();
    this.newDivision.companyId = company.id;
    this.newDivision.parentId = division ? division.id : 0;
    this.companies.addDivision(this.newDivision)
      .toPromise()
      .then(() => {
        this.dialogRef.close(true);
        this.snackBar.open('Структурное подразделение добавлено', 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }
}
