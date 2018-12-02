import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { OperativeSituationService } from '../../services/operative-situation.service';
import { Role } from '@kolenergo/lib';

@Component({
  selector: 'app-role-add-dialog',
  templateUrl: './role-add-dialog.component.html',
  styleUrls: ['./role-add-dialog.component.less']
})
export class RoleAddDialogComponent implements OnInit {
  public addRoleForm: FormGroup;
  public newRole: Role;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRed: MatDialogRef<RoleAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly applications: OperativeSituationService) {
    this.newRole = new Role();
  }

  ngOnInit() {
    this.addRoleForm = this.builder.group({
      code: new FormControl(this.newRole.code, Validators.required),
      title: new FormControl(this.newRole.title, Validators.required)
    });
  }

  /**
   * Добавление новой роли пользователя приложения
   */
  addRole() {
    this.newRole.applicationId = this.applications.selectedApplication().id;
    this.applications.addRole(this.newRole)
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Роль пользователя добавлена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

  /**
   * Закрывает диалоговое окно добавления новой роли пользователя
   */
  closeDialog() {
    this.addRoleForm.reset();
    this.dialogRed.close();
  }

}
