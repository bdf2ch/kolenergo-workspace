import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { OperativeSituationService } from '../../services/operative-situation.service';

@Component({
  selector: 'app-consumption-edit-dialog',
  templateUrl: './consumption-edit-dialog.component.html',
  styleUrls: ['./consumption-edit-dialog.component.less']
})
export class ConsumptionEditDialogComponent implements OnInit {
  public editConsumptionForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<ConsumptionEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly osr: OperativeSituationService) {}

  ngOnInit() {
    this.editConsumptionForm = this.builder.group({
      consumption: new FormControl(this.osr.getConsumption().consumption, Validators.required)
    });
  }


  /**
   * Отправляет данные нового отчета о максимальном потреблении за прошедшие сутки
   */
  editConsumption() {
    this.osr.editConsumption(this.osr.getConsumption())
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Сведения о максимальном потреблении за прошедшие сутки изменены`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

  /**
   * Закрывает диалоговое окна изменения отчета об оперативной обстановке,
   * возвращает изначальные значения полей
   */
  closeDialog() {
    this.dialogRef.close();
    this.editConsumptionForm.reset();
    this.osr.getConsumption().backup.restore();
  }
}
