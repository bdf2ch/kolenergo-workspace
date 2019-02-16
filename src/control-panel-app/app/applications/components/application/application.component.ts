import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit, Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../../services/applications.service';
import { MatDialog } from '@angular/material';
import { PermissionEditDialogComponent } from '../permission-edit-dialog/permission-edit-dialog.component';
import { Role } from '../../../users/models/role.model';
import { Permission } from '../../../users/models/permission.model';
import { PermissionAddDialogComponent } from '../permission-add-dialog/permission-add-dialog.component';
import { RoleEditDialogComponent } from '../role-edit-dialog/role-edit-dialog.component';
import { RoleAddDialogComponent } from '../role-add-dialog/role-add-dialog.component';
import { ApplicationMenuItem } from '../../../dashboard/models/application-menu-item.model';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less'],
})
export class ApplicationComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
  public applicationRolesDisplayColumns = ['id', 'code', 'title', 'controls'];
  public applicationPermissionsDisplayColumns = ['id', 'code', 'title', 'controls'];
  @ViewChild('content') public content: ElementRef;
  public rowHeight: number;
  public content$: BehaviorSubject<ElementRef>;

  constructor(private readonly detector: ChangeDetectorRef,
              private readonly renderer: Renderer2,
              private readonly route: ActivatedRoute,
              private readonly dialog: MatDialog,
              private readonly dashboard: DashboardService,
              public readonly applications: ApplicationsService) {
    this.route.params.subscribe((data: any) => {
      if (data['id']) {
        this.applications.selectedApplication(Number(data['id']));
        console.log('selected application', this.applications.selectedApplication());
      }
    });
    this.rowHeight = 0;
    this.content$ = new BehaviorSubject<ElementRef>(null);
    this.content$.asObservable()
      .subscribe((value: ElementRef) => {
        console.log('CONTENT', value);
        if (value && value.nativeElement) {
          console.log('CONTENT HEIGHT', value.nativeElement.clientHeight);
          this.rowHeight = value.nativeElement.clientHeight / 2;
          this.detector.detectChanges();
          console.log('rowHeight', this.rowHeight);
        }
      });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //console.log('content height', this.content.nativeElement.clientHeight);
    //this.rowHeight = this.content.nativeElement.clientHeight / 2;
    //this.detector.detectChanges();
    //this.content$.next(this.content.nativeElement);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.rowHeight = this.content.nativeElement.clientHeight / 2;
    // console.log(this.content.nativeElement.clientHeight / 2);
  }

  /**
   * Открывает диалоговое окно добавления новой роли пользователя
   */
  openAddRoleDialog() {
    this.dialog.open(RoleAddDialogComponent, {
      width: '500px'
    });
  }

  /**
   * Открывает диалоговое окно редактирования роли пользователя
   * @param role - Редактируемая роль пользователя
   */
  openEditRoleDialog(role: Role) {
    this.applications.selectedRole(role);
    this.dialog.open(RoleEditDialogComponent, {
      width: '500px'
    });
  }

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
    console.log('selected permission', this.applications.selectedPermission());
    this.dialog.open(PermissionEditDialogComponent, {
      width: '500px'
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterViewChecked(): void {
    this.content$.next(this.content);
  }

}
