import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { OperativeSituationService } from '../../services/operative-situation.service';
import {OperativeSituationReport} from '@kolenergo/osr';
import {User} from '@kolenergo/lib';

@Component({
  selector: 'app-add-permission-dialog',
  templateUrl: './report-add-dialog.component.html',
  styleUrls: ['./report-add-dialog.component.less']
})
export class ReportAddDialogComponent implements OnInit {
  public newReport: OperativeSituationReport;
  public addReportForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<ReportAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly osr: OperativeSituationService) {
    this.newReport = new OperativeSituationReport();
  }

  ngOnInit() {
    this.addReportForm = this.builder.group({
      time: new FormControl(this.newReport.periodTime, Validators.required),
      lep_110_150: new FormControl(this.newReport.equipment_35_150.lep_110_150),
      lep_35: new FormControl(this.newReport.equipment_35_150.lep_35),
      ps_110_150: new FormControl(this.newReport.equipment_35_150.ps_110_150),
      ps_35: new FormControl(this.newReport.equipment_35_150.ps_35),
      tp_6_20_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.tp_6_20),
      population_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.population),
      power_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.power),
      szo_effect_110_150: new FormControl(this.newReport.equipment_35_150.effect.szo),
      lep_6_20: new FormControl(this.newReport.equipment_network.lep_6_20),
      tp_6_20: new FormControl(this.newReport.equipment_network.tp_6_20),
      population_effect_network: new FormControl(this.newReport.equipment_network.effect.population),
      power_effect_network: new FormControl(this.newReport.equipment_network.effect.power),
      szo_effect_network: new FormControl(this.newReport.equipment_network.effect.szo),
    });
  }

  /**
   * Отправляет данные нового отчета об оперативной обстановке на сервер
   */
  addReport() {
    this.newReport.company = this.osr.selectedCompany();
    this.newReport.user = new User();
    this.newReport.user.id = 7;
    this.osr.addReport(this.newReport)
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Отчет об оперативнйо обстановке добавлен`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

  /**
   * Закрывает диалоговое окна добавления нового отчета об оперативной обстановке
   */
  closeDialog() {
    this.dialogRef.close();
    this.addReportForm.reset();
  }

}
