import { Component, OnInit } from '@angular/core';
import { OperativeSituationConsumption } from '@kolenergo/osr';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '@kolenergo/lib';
import { OperativeSituationService } from '../../services/operative-situation.service';

@Component({
  selector: 'app-consumption-add-dialog',
  templateUrl: './consumption-add-dialog.component.html',
  styleUrls: ['./consumption-add-dialog.component.less']
})
export class ConsumptionAddDialogComponent implements OnInit {
  public consumption: OperativeSituationConsumption;
  public addConsumptionForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<ConsumptionAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              private readonly auth: AuthenticationService,
              public readonly osr: OperativeSituationService) {
    this.consumption = new OperativeSituationConsumption();
  }

  ngOnInit() {
    this.addConsumptionForm = this.builder.group({
      consumption: new FormControl(this.consumption.consumption, Validators.required)
    });
  }

  /**
   * Отправляет данные нового отчета о максимальном потреблении за прошедшие сутки на сервер
   */
  addConsumption() {
    // this.newReport.company = this.auth.getCurrentUser().company;
    this.consumption.company = this.osr.selectedCompany();
    this.consumption.user = this.auth.getCurrentUser();
    this.osr.addConsumption(this.consumption)
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Сведения о максимальном потреблении за прошедшие сутки добавлены`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

  /**
   * Закрывает диалоговое окна добавления отчета о максимальном потреблении за прошедшие сутки
   */
  closeDialog() {
    this.dialogRef.close();
    this.addConsumptionForm.reset();
  }
}
