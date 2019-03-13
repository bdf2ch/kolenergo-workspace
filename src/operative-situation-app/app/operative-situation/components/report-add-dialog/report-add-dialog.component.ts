import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MatRadioChange, MatSlideToggleChange, MatSnackBar, MatTableDataSource} from '@angular/material';
import { OperativeSituationService } from '../../services/operative-situation.service';
import {ILocation, ILocationWeather, OperativeSituationReport} from '@kolenergo/osr';
import { AuthenticationService } from '@kolenergo/cpa';

@Component({
  selector: 'app-add-permission-dialog',
  templateUrl: './report-add-dialog.component.html',
  styleUrls: ['./report-add-dialog.component.less']
})
export class ReportAddDialogComponent implements OnInit {
  public newReport: OperativeSituationReport;
  public addReportForm: FormGroup;
  public locationsDataSource: MatTableDataSource<ILocation>;
  public weatherSummaryDisplayColumns: string[];
  public useWeatherSummary: boolean;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<ReportAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              private readonly auth: AuthenticationService,
              public readonly osr: OperativeSituationService) {
    this.newReport = new OperativeSituationReport();
    this.locationsDataSource = new MatTableDataSource<ILocation>([]);
    this.weatherSummaryDisplayColumns = ['title', 'temperature', 'wind', 'precipitations', 'icon'];
    this.useWeatherSummary = true;
  }

  ngOnInit() {
    this.addReportForm = this.builder.group({
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
      weather_min: new FormControl({value: this.newReport.weather.min, disabled: this.useWeatherSummary === true}, Validators.required),
      weather_max: new FormControl({value: this.newReport.weather.max, disabled: this.useWeatherSummary === true}, Validators.required),
      weather_wind: new FormControl({value: this.newReport.weather.wind, disabled: this.useWeatherSummary === true}, Validators.required),
      weather_precipitations: new FormControl({value: this.newReport.weather.precipitations, disabled: this.useWeatherSummary === true}, Validators.required),
      weather_rpg_1: new FormControl({value: this.newReport.weather.rpg, disabled: this.useWeatherSummary}),
      weather_orr_1: new FormControl({value: this.newReport.weather.orr, disabled: this.useWeatherSummary}),
      weather_rpg_2: new FormControl(this.newReport.weather.rpg),
      weather_orr_2: new FormControl(this.newReport.weather.orr),
      resources_rise: new FormControl(this.newReport.resources.rise),
      resources_rise_sum_power: new FormControl(this.newReport.resources.riseSumPower),
      resources_rise_people: new FormControl(this.newReport.resources.risePeople),
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
      violations_population_greater_3_04: new FormControl(this.newReport.violations.population_greater_3_04),
      useWeatherSummary: new FormControl(this.useWeatherSummary)
    });
    this.locationsDataSource = new MatTableDataSource<ILocation>(this.osr.selectedCompany().weatherSummary.locations);
    this.osr.fetchWeatherSummary(this.osr.selectedCompany().id).subscribe();
  }

  /**
   * Отправляет данные нового отчета об оперативной обстановке на сервер
   */
  addReport() {
    this.newReport.periodTime = this.osr.selectedPeriod();
    this.newReport.company = this.osr.selectedCompany();
    this.newReport.user = this.auth.getCurrentUser();
    if (this.useWeatherSummary) {
      this.newReport.weatherSummary = this.osr.selectedCompany().weatherSummary;
      this.newReport.weather.min = 0;
      this.newReport.weather.max = 0;
      this.newReport.weather.wind = '0';
      this.newReport.weather.precipitations = '';
    }
    this.osr.addReport(this.newReport)
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Отчет об оперативной обстановке добавлен`, 'Закрыть', {
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

  /**
   * Изменение режима РПГ
   * @param event - Событие изменения состояния слайдера
   */
  changeRPGMode(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.newReport.weather.orr = false;
    }
  }

  /**
   * Изменение режима ОРР
   * @param event - Событие изменения состояния слайдера
   */
  changeORRMode(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.newReport.weather.rpg = false;
    }
  }

  weatherInputModeSelect(event: MatRadioChange) {
    if (event.value === true) {
      this.addReportForm.controls['weather_min'].disable();
      this.addReportForm.controls['weather_max'].disable();
      this.addReportForm.controls['weather_wind'].disable();
      this.addReportForm.controls['weather_precipitations'].disable();
      this.addReportForm.controls['weather_rpg_1'].disable();
      this.addReportForm.controls['weather_orr_1'].disable();
      this.addReportForm.controls['weather_rpg_2'].enable();
      this.addReportForm.controls['weather_orr_2'].enable();
    } else {
      this.addReportForm.controls['weather_min'].enable();
      this.addReportForm.controls['weather_max'].enable();
      this.addReportForm.controls['weather_wind'].enable();
      this.addReportForm.controls['weather_precipitations'].enable();
      this.addReportForm.controls['weather_rpg_1'].enable();
      this.addReportForm.controls['weather_orr_1'].enable();
      this.addReportForm.controls['weather_rpg_2'].disable();
      this.addReportForm.controls['weather_orr_2'].disable();
    }
  }

}
