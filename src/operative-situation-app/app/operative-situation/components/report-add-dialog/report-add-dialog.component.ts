import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { OperativeSituationReport } from '@kolenergo/osr';
import { AuthenticationService, User } from '@kolenergo/lib';

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
              private readonly auth: AuthenticationService,
              public readonly osr: OperativeSituationService) {
    this.newReport = new OperativeSituationReport();
  }

  ngOnInit() {
    this.addReportForm = this.builder.group({
      time: new FormControl(this.newReport.periodTime, Validators.required),
      consumption: new FormControl(this.newReport.consumption),
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
      weather_min: new FormControl(this.newReport.weather.min, Validators.required),
      weather_max: new FormControl(this.newReport.weather.max, Validators.required),
      weather_wind: new FormControl(this.newReport.weather.wind, Validators.required),
      weather_precipitations: new FormControl(this.newReport.weather.precipitations, Validators.required),
      weather_rpg: new FormControl(this.newReport.weather.rpg),
      weather_orr: new FormControl(this.newReport.weather.orr),
      resources_brigades: new FormControl(this.newReport.resources.brigades),
      resources_people: new FormControl(this.newReport.resources.people),
      resources_technics: new FormControl(this.newReport.resources.technics),
      violations_total_6: new FormControl(this.newReport.violations.total_6),
      violations_uapv_35: new FormControl(this.newReport.violations.uapv_35),
      violations_napv_35: new FormControl(this.newReport.violations.napv_35),
      violations_power_off_35: new FormControl(this.newReport.violations.power_off_35),
      violations_lep_rs: new FormControl(this.newReport.violations.lep_rs),
      violations_tn_cancel: new FormControl(this.newReport.violations.tn_cancel),
      violations_from_6_04: new FormControl(this.newReport.violations.from_6_04),
      violations_power_off_04: new FormControl(this.newReport.violations.power_off_04),
      violations_greater_3_04: new FormControl(this.newReport.violations.greater_3_04),
      violations_population_srez_o4: new FormControl(this.newReport.violations.population_srez_04),
      violations_population_greater_3_04: new FormControl(this.newReport.violations.population_greater_3_04)
    });
  }

  /**
   * Отправляет данные нового отчета об оперативной обстановке на сервер
   */
  addReport() {
    // this.newReport.company = this.auth.getCurrentUser().company;
    this.newReport.company = this.osr.selectedCompany();
    this.newReport.user = this.auth.getCurrentUser();
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

  changeRPGMode(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.newReport.weather.orr = false;
    }
  }

  changeORRMode(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.newReport.weather.rpg = false;
    }
  }

}
