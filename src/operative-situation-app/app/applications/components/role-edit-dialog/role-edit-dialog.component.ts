import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-role-edit-dialog',
  templateUrl: './role-edit-dialog.component.html',
  styleUrls: ['./role-edit-dialog.component.less']
})
export class RoleEditDialogComponent implements OnInit {
  public editRoleForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<RoleEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly applications: ApplicationsService) { }

  ngOnInit() {
    const role = this.applications.selectedRole();
    this.editRoleForm = this.builder.group({
      code: new FormControl(role ? role.code : null, Validators.required),
      title: new FormControl(role ? role.title : null, Validators.required)
    });
  }

  saveChanges() {
    this.applications.editRole(this.applications.selectedRole())
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Изменения в роли пользователя сохранены`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

  /**
   * Закрывает диалоговое окно редактирования роли пользователя
   */
  closeDialog() {
    this.dialogRef.close();
    this.applications.selectedRole().backup.restore();
    this.editRoleForm.reset({
      code: this.applications.selectedRole().code,
      title: this.applications.selectedRole().title
    });
  }

}
