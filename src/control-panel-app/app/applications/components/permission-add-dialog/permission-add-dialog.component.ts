import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Permission } from '@kolenergo/lib';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-add-permission-dialog',
  templateUrl: './permission-add-dialog.component.html',
  styleUrls: ['./permission-add-dialog.component.less']
})
export class PermissionAddDialogComponent implements OnInit {
  public newPermission: Permission;
  public addPermissionForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<PermissionAddDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly applications: ApplicationsService) {
    this.newPermission = new Permission();
  }

  ngOnInit() {
    this.addPermissionForm = this.builder.group({
      code: new FormControl(this.newPermission.code, Validators.required),
      title: new FormControl(this.newPermission.title, Validators.required)
    });
  }

  /**
   * Отправляет данные нового правва пользователя на сервер
   */
  addPermission() {
    this.newPermission.applicationId = this.applications.selectedApplication().id;
    this.applications.addPermission(this.newPermission)
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Право пользователя добавлено`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

  /**
   * Закрывает диалоговое окна добавления нового права пользователя
   */
  closeDialog() {
    this.dialogRef.close();
    this.addPermissionForm.reset();
  }

}
