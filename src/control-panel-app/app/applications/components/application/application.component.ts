import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../../services/applications.service';
import { Application } from '../../models/application.model';
import { MatDialog } from '@angular/material';
import { PermissionEditDialogComponent } from '../permission-edit-dialog/permission-edit-dialog.component';
import { Permission } from '@kolenergo/lib';
import {PermissionAddDialogComponent} from '../permission-add-dialog/permission-add-dialog.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less']
})
export class ApplicationComponent implements OnInit {
  public applicationRolesDisplayColumns = ['id', 'code', 'title', 'controls'];
  public applicationPermissionsDisplayColumns = ['id', 'code', 'title', 'controls'];

  constructor(private readonly route: ActivatedRoute,
              private readonly dialog: MatDialog,
              public readonly applications: ApplicationsService) {
    this.route.params.subscribe((data: any) => {
      if (data['id']) {
        this.applications.selectedApplication(Number(data['id']));
      }
    });
  }

  ngOnInit() {}

  /**
   * Открывает диалоговое окно добавления нового права пользователя
   */
  openAddPermissionDialog() {
    this.dialog.open(PermissionAddDialogComponent, {
      width: '500px'
    });
  }

  /**
   * Открывает диалоговое окно редактирования права пользователя
   * @param permission - Редактируемое право пользователя
   */
  openEditPermissionDialog(permission: Permission) {
    this.applications.selectedPermission(permission);
    console.log(this.applications.selectedPermission());
    this.dialog.open(PermissionEditDialogComponent, {
      width: '500px'
    });
  }

}
