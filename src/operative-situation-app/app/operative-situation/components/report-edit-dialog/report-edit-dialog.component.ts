import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-permission-dialog',
  templateUrl: './report-edit-dialog.component.html',
  styleUrls: ['./report-edit-dialog.component.less']
})
export class ReportEditDialogComponent implements OnInit {
  public editReportForm: FormGroup;
  weatherSummaryDisplayColumns: string[];

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<ReportEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly osr: OperativeSituationService) {
    this.weatherSummaryDisplayColumns = ['title', 'temperature', 'wind', 'precipitations', 'icon'];

  }

  ngOnInit() {
    this.editReportForm = this.builder.group({
      time: new FormControl(this.osr.selectedReport$.getValue().periodTime, Validators.required),
      consumption: new FormControl(this.osr.selectedReport$.getValue().consumption),
      lep_110_150: new FormControl(this.osr.selectedReport$.getValue().equipment_35_150.lep_110_150),
      lep_35: new FormControl(this.osr.selectedReport$.getValue().equipment_35_150.lep_35),
      ps_110_150: new FormControl(this.osr.selectedReport$.getValue().equipment_35_150.ps_110_150),
      ps_35: new FormControl(this.osr.selectedReport$.getValue().equipment_35_150.ps_35),
      tp_6_20_effect_110_150: new FormControl(this.osr.selectedReport$.getValue().equipment_35_150.effect.tp_6_20),
      population_effect_110_150: new FormControl(this.osr.selectedReport$.getValue().equipment_35_150.effect.population),
      power_effect_110_150: new FormControl(this.osr.selectedReport$.getValue().equipment_35_150.effect.power),
      szo_effect_110_150: new FormControl(this.osr.selectedReport$.getValue().equipment_35_150.effect.szo),
      lep_6_20: new FormControl(this.osr.selectedReport$.getValue().equipment_network.lep_6_20),
      tp_6_20: new FormControl(this.osr.selectedReport$.getValue().equipment_network.tp_6_20),
      population_effect_network: new FormControl(this.osr.selectedReport$.getValue().equipment_network.effect.population),
      power_effect_network: new FormControl(this.osr.selectedReport$.getValue().equipment_network.effect.power),
      szo_effect_network: new FormControl(this.osr.selectedReport$.getValue().equipment_network.effect.szo),
      // weather_min: new FormControl(this.osr.selectedReport$.getValue().weather.min, Validators.required),
      // weather_max: new FormControl(this.osr.selectedReport$.getValue().weather.max, Validators.required),
      // weather_wind: new FormControl(this.osr.selectedReport$.getValue().weather.wind, Validators.required),
      // weather_precipitations: new FormControl(this.osr.selectedReport$.getValue().weather.precipitations, Validators.required),
      weather_rpg: new FormControl(this.osr.selectedReport$.getValue().weather.rpg),
      weather_orr: new FormControl(this.osr.selectedReport$.getValue().weather.orr),
      resources_rise: new FormControl(this.osr.selectedReport$.getValue().resources.rise),
      resources_rise_sum_power: new FormControl(this.osr.selectedReport$.getValue().resources.riseSumPower),
      resources_rise_people: new FormControl(this.osr.selectedReport$.getValue().resources.risePeople),
      resources_brigades: new FormControl(this.osr.selectedReport$.getValue().resources.brigades),
      resources_people: new FormControl(this.osr.selectedReport$.getValue().resources.people),
      resources_technics: new FormControl(this.osr.selectedReport$.getValue().resources.technics),
      violations_total_6: new FormControl(this.osr.selectedReport$.getValue().violations.total_6),
      violations_uapv_35: new FormControl(this.osr.selectedReport$.getValue().violations.uapv_35),
      violations_napv_35: new FormControl(this.osr.selectedReport$.getValue().violations.napv_35),
      violations_power_off_35: new FormControl(this.osr.selectedReport$.getValue().violations.power_off_35),
      violations_lep_rs: new FormControl(this.osr.selectedReport$.getValue().violations.lep_rs),
      violations_tn_cancel: new FormControl(this.osr.selectedReport$.getValue().violations.tn_cancel),
      violations_from_6_04: new FormControl(this.osr.selectedReport$.getValue().violations.from_6_04),
      violations_power_off_04: new FormControl(this.osr.selectedReport$.getValue().violations.power_off_04),
      violations_greater_3_04: new FormControl(this.osr.selectedReport$.getValue().violations.greater_3_04),
      violations_population_srez_o4: new FormControl(this.osr.selectedReport$.getValue().violations.population_srez_04),
      violations_population_greater_3_04: new FormControl(this.osr.selectedReport$.getValue().violations.population_greater_3_04)
    });

    if (!this.osr.selectedReport$.getValue().weatherSummary) {
      this.editReportForm.addControl('weather_min', new FormControl(this.osr.selectedReport$.getValue().weather.min, Validators.required));
      this.editReportForm.addControl('weather_max', new FormControl(this.osr.selectedReport$.getValue().weather.max, Validators.required));
      this.editReportForm.addControl(
        'weather_wind',
        new FormControl(this.osr.selectedReport$.getValue().weather.wind, Validators.required)
      );
      this.editReportForm.addControl(
        'weather_precipitations',
        new FormControl(this.osr.selectedReport$.getValue().weather.precipitations, Validators.required)
      );
    }
  }

  /**
   * Отправляет данные нового отчета об оперативной обстановке на сервер
   */
  editReport() {
    if (this.osr.selectedReport$.getValue().weatherSummary) {
      this.osr.selectedReport$.getValue().weather.min = 0;
      this.osr.selectedReport$.getValue().weather.max = 0;
      this.osr.selectedReport$.getValue().weather.wind = '';
      this.osr.selectedReport$.getValue().weather.precipitations = '';
    }
    this.osr.editReport(this.osr.selectedReport$.getValue())
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Отчет об оперативной обстановке на ${this.osr.selectedReport$.getValue().periodTime} изменен`, 'Закрыть', {
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
    this.editReportForm.reset();
    const report = this.osr.selectedReport$.getValue();
    report.backup.restore();
    this.osr.selectedReport$.next(report);
  }

  /**
   * Изменение режима РПГ
   * @param event - Событие изменения состояния слайдера
   */
  changeRPGMode(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.osr.selectedReport$.getValue().weather.orr = false;
    }
  }

  /**
   * Изменение режима ОРР
   * @param event - Событие изменения состояния слайдера
   */
  changeORRMode(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.osr.selectedReport$.getValue().weather.rpg = false;
    }
  }
}
