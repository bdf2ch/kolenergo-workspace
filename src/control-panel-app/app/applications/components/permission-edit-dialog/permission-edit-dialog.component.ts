import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationsService } from '../../services/applications.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-permission-dialog',
  templateUrl: './permission-edit-dialog.component.html',
  styleUrls: ['./permission-edit-dialog.component.less']
})
export class PermissionEditDialogComponent implements OnInit {
  public editPermissionForm: FormGroup;

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<PermissionEditDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly applications: ApplicationsService) {}

  ngOnInit() {
    const selectedPermission = this.applications.selectedPermission();
    this.editPermissionForm = this.builder.group({
      code: new FormControl(selectedPermission ? selectedPermission.code : null, Validators.required),
      title: new FormControl(selectedPermission ? selectedPermission.title : null, Validators.required)
    });
    console.log('after dialog init', this.applications.selectedPermission());
  }

  /**
   * Сохранение измененийв выбранном праве
   */
  saveChanges() {
    this.applications.editPermission(this.applications.selectedPermission())
      .subscribe(() => {
        this.closeDialog();
        this.snackBar.open(`Изменения в праве пользователя сохранены`, 'Закрыть', {
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
    this.applications.selectedPermission().backup.restore();
    this.editPermissionForm.reset({
      code: this.applications.selectedPermission().code,
      title: this.applications.selectedPermission().title
    });
  }

}
