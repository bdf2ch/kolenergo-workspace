import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Permission } from '@kolenergo/lib';
import {MatSlideToggleChange, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-permission-dialog',
  templateUrl: './report-edit-dialog.component.html',
  styleUrls: ['./report-edit-dialog.component.less']
})
export class ReportEditDialogComponent implements OnInit {
  public editReportForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<ReportEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly osr: OperativeSituationService) {}

  ngOnInit() {
    console.log('dialog init');
    this.editReportForm = this.builder.group({
      time: new FormControl(this.osr.selectedReport().periodTime, Validators.required),
      lep_110_150: new FormControl(this.osr.selectedReport().equipment_35_150.lep_110_150),
      lep_35: new FormControl(this.osr.selectedReport().equipment_35_150.lep_35),
      ps_110_150: new FormControl(this.osr.selectedReport().equipment_35_150.ps_110_150),
      ps_35: new FormControl(this.osr.selectedReport().equipment_35_150.ps_35),
      tp_6_20_effect_110_150: new FormControl(this.osr.selectedReport().equipment_35_150.effect.tp_6_20),
      population_effect_110_150: new FormControl(this.osr.selectedReport().equipment_35_150.effect.population),
      power_effect_110_150: new FormControl(this.osr.selectedReport().equipment_35_150.effect.power),
      szo_effect_110_150: new FormControl(this.osr.selectedReport().equipment_35_150.effect.szo),
      lep_6_20: new FormControl(this.osr.selectedReport().equipment_network.lep_6_20),
      tp_6_20: new FormControl(this.osr.selectedReport().equipment_network.tp_6_20),
      population_effect_network: new FormControl(this.osr.selectedReport().equipment_network.effect.population),
      power_effect_network: new FormControl(this.osr.selectedReport().equipment_network.effect.power),
      szo_effect_network: new FormControl(this.osr.selectedReport().equipment_network.effect.szo),
      weather_min: new FormControl(this.osr.selectedReport().weather.min, Validators.required),
      weather_max: new FormControl(this.osr.selectedReport().weather.max, Validators.required),
      weather_wind: new FormControl(this.osr.selectedReport().weather.wind, Validators.required),
      weather_precipitations: new FormControl(this.osr.selectedReport().weather.precipitations, Validators.required),
      weather_rpg: new FormControl(this.osr.selectedReport().weather.rpg),
      weather_orr: new FormControl(this.osr.selectedReport().weather.orr),
      resources_brigades: new FormControl(this.osr.selectedReport().resources.brigades),
      resources_people: new FormControl(this.osr.selectedReport().resources.people),
      resources_technics: new FormControl(this.osr.selectedReport().resources.technics),
    });
  }


  /**
   * Отправляет данные нового отчета об оперативной обстановке на сервер
   */
  editReport() {
    this.osr.editReport(this.osr.selectedReport())
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Отчет об оперативной обстановке на ${this.osr.selectedReport().periodTime} изменен`, 'Закрыть', {
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
    this.osr.selectedReport().backup.restore();
  }

  changeRPGMode(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.osr.selectedReport().weather.orr = false;
    }
  }

  changeORRMode(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.osr.selectedReport().weather.rpg = false;
    }
  }

}
