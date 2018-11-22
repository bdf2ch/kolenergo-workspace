import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationsService } from '../../services/applications.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Permission } from '@kolenergo/lib';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-permission-dialog',
  templateUrl: './edit-permission-dialog.component.html',
  styleUrls: ['./edit-permission-dialog.component.less']
})
export class EditPermissionDialogComponent implements OnInit {
  public editPermissionForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<EditPermissionDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly applications: ApplicationsService) {}

  ngOnInit() {
    const selectedPermission = this.applications.selectedPermission();
    this.editPermissionForm = this.builder.group({
      code: new FormControl(selectedPermission ? selectedPermission.code : null, Validators.required),
      title: new FormControl(selectedPermission ? selectedPermission.title : null, Validators.required)
    });
  }

  /**
   * Сохранение измененийв выбранном праве
   */
  saveChanges() {
    this.applications.editPermission(this.applications.selectedPermission())
      .subscribe(() => {
        this.snackBar.open(`Изменения в праве сохранены`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
      });
  }

  /**
   * Закрывает диалоговое окно редактирования права пользователя
   */
  closeDialog() {
    this.dialogRef.close();
    this.editPermissionForm.reset();
  }

}
