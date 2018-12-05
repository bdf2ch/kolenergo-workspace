import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Permission } from '@kolenergo/lib';
import { MatSnackBar } from '@angular/material';

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
   * Сохранение измененийв выбранном праве
   */
  saveChanges() {
    /*
    this.applications.editPermission(this.applications.selectedPermission())
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Изменения в праве пользователя сохранены`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
      */
  }

  /**
   * Закрывает диалоговое окно редактирования права пользователя
   */
  closeDialog() {
    /*
    this.dialogRef.close();
    this.applications.selectedPermission().backup.restore();
    this.editPermissionForm.reset({
      code: this.applications.selectedPermission().code,
      title: this.applications.selectedPermission().title
    });
    */
  }

}
