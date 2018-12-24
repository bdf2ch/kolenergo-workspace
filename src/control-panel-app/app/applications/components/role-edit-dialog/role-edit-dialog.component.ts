import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSelectChange, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ApplicationsService } from '../../services/applications.service';
import { Permission } from '../../../users/models/permission.model';

@Component({
  selector: 'app-role-edit-dialog',
  templateUrl: './role-edit-dialog.component.html',
  styleUrls: ['./role-edit-dialog.component.less']
})
export class RoleEditDialogComponent implements OnInit {
  public editRoleForm: FormGroup;
  public rolePermissionsDataSource: MatTableDataSource<Permission>;
  public rolePermissionDisplayColumns: string[];

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<RoleEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly applications: ApplicationsService) {
    this.rolePermissionDisplayColumns = ['title', 'controls'];
  }

  ngOnInit() {
    const role = this.applications.selectedRole();
    this.rolePermissionsDataSource = new MatTableDataSource<Permission>(role.permissions);
    this.editRoleForm = this.builder.group({
      code: new FormControl(role ? role.code : null, Validators.required),
      title: new FormControl(role ? role.title : null, Validators.required)
    });
  }

  /**
   * Добавление права пользователя к роли
   * @param event - Событие выбора права пользователя
   */
  onSelectPermission(event: MatSelectChange) {
    const role = this.applications.selectedRole();
    role.permissions.push(event.value);
    this.rolePermissionsDataSource = new MatTableDataSource<Permission>(role.permissions);
    this.editRoleForm.markAsDirty();
  }

  /**
   * Удаление права пользователя из роли
   * @param permission - Удаляемое право пользователя
   */
  deletePermission(permission: Permission) {
    const role = this.applications.selectedRole();
    role.permissions.forEach((item: Permission, index: number) => {
      if (item.id === permission.id) {
        role.permissions.splice(index, 1);
      }
    });
    this.rolePermissionsDataSource = new MatTableDataSource<Permission>(role.permissions);
    this.editRoleForm.markAsDirty();
  }

  /**
   * Сохранение изменений в роли пользователя
   */
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
