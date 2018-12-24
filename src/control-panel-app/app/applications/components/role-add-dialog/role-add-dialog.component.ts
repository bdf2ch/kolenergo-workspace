import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MatSelectChange, MatSnackBar, MatTableDataSource} from '@angular/material';
import { ApplicationsService } from '../../services/applications.service';
import { Role } from '../../../users/models/role.model';
import { Permission } from '../../../users/models/permission.model';

@Component({
  selector: 'app-role-add-dialog',
  templateUrl: './role-add-dialog.component.html',
  styleUrls: ['./role-add-dialog.component.less']
})
export class RoleAddDialogComponent implements OnInit {
  public addRoleForm: FormGroup;
  public newRole: Role;
  public permissions: Permission[];
  public rolePermissionsDataSource: MatTableDataSource<Permission>;
  public rolePermissionDisplayColumns: string[];

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRed: MatDialogRef<RoleAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly applications: ApplicationsService) {
    this.newRole = new Role();
    this.rolePermissionsDataSource = new MatTableDataSource<Permission>([]);
    this.rolePermissionDisplayColumns = ['title', 'controls'];
  }

  ngOnInit() {
    this.addRoleForm = this.builder.group({
      code: new FormControl(this.newRole.code, Validators.required),
      title: new FormControl(this.newRole.title, Validators.required)
    });
  }


  onSelectPermission(event: MatSelectChange) {
    console.log(event);
    this.newRole.permissions.push(event.value);
    this.rolePermissionsDataSource = new MatTableDataSource<Permission>(this.newRole.permissions);
  }

  deletePermission(permission: Permission) {
    this.newRole.permissions.forEach((item: Permission, index: number) => {
      if (permission.id === item.id) {
        this.newRole.permissions.splice(index, 1);
      }
    });
    this.rolePermissionsDataSource = new MatTableDataSource<Permission>(this.newRole.permissions);
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
