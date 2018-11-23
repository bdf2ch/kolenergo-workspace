import { Injectable } from '@angular/core';
import { ApplicationsResource } from '../resources/applications.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Application } from '../models/application.model';
import { IApplication } from '../interfaces/application.interface';
import { IPermission, IServerResponse, Role } from '@kolenergo/lib';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { MatTableDataSource } from '@angular/material';
import { Permission } from '@kolenergo/lib';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { finalize, map } from 'rxjs/operators';


@Injectable()
export class ApplicationsService {
  private applications$: BehaviorSubject<Application[]>;
  private selectedApplication$: BehaviorSubject<Application>;
  private selectedApplicationRolesDataSource: MatTableDataSource<Role>;
  private selectedApplicationPermissionsDataSource: MatTableDataSource<Permission>;
  private selectedPermission$: BehaviorSubject<Permission>;
  private fetchingData$: BehaviorSubject<boolean>;
  private addingPermission$: BehaviorSubject<boolean>;
  private editingPermission$: BehaviorSubject<boolean>;

  constructor(private readonly resource: ApplicationsResource,
              private readonly dashboard: DashboardService) {
    this.applications$ = new BehaviorSubject<Application[]>([]);
    this.selectedApplication$ = new BehaviorSubject<Application>(null);
    this.selectedApplicationRolesDataSource = new MatTableDataSource<Role>([]);
    this.selectedApplicationPermissionsDataSource = new MatTableDataSource<Permission>([]);
    this.selectedPermission$ = new BehaviorSubject<Permission>(null);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingPermission$ = new BehaviorSubject<boolean>(false);
    this.editingPermission$ = new BehaviorSubject<boolean>(false);
  }

  /**
   * Получение списка приложений с сервера
   */
  fetchApplicationsList(): Observable<Application[]> {
    this.fetchingData$.next(true);
    return from(this.resource.getAll())
      .pipe(
        map((response: IServerResponse<IApplication[]>) => {
          const result = [];
          response.data.forEach((item: IApplication) => {
            const application = new Application(item);
            application.backup.setup(['roles', 'permissions']);
            result.push(application);
          });
          this.applications$.next(result);
          return result;
        }),
        finalize(() => {
          this.fetchingData$.next(false);
        })
      );
  }

  /**
   * Добавление нового права пользователя
   * @param permission - Добавляемое право пользователя
   */
  addPermission(permission: Permission): Observable<Permission | null> {
    this.addingPermission$.next(true);
    return from(this.resource.addPermission(permission))
      .pipe(
        map((response: IServerResponse<IPermission>) => {
          const newPermission = new Permission(response.data);
          newPermission.backup.setup(['code', 'title', 'isEnabled']);
          const permissions = this.selectedApplication$.getValue().permissions;
          permissions.push(newPermission);
          this.selectedApplicationPermissionsDataSource = new MatTableDataSource<Permission>(permissions);
          return newPermission;
        }),
        finalize(() => {
          this.addingPermission$.next(false);
        })
      );
  }

  /**
   * Изменение права пользователя
   * @param permission - Изменяемое право пользователя
   */
  editPermission(permission: Permission): Observable<Permission | null> {
    this.editingPermission$.next(true);
    console.log(permission);
    return from(this.resource.editPermission(permission))
      .pipe(
        map((response: IServerResponse<IPermission>) => {
          permission.backup.setup(['code', 'title', 'isEnabled']);
          return permission;
        }),
        finalize(() => {
          this.editingPermission$.next(false);
        })
      );
  }

  /**
   * Установка / получение выбранного приложения
   * @param applicationId - Идентификатор приложения
   */
  selectedApplication(applicationId?: number): Application | null {
    if (applicationId) {
      const findApplicationById = (application: Application) => Number(application.id) === applicationId;
      const searchResult = this.applications$.getValue().find(findApplicationById);
      if (searchResult) {
        this.selectedApplication$.next(searchResult);
        this.selectedApplicationRolesDataSource = new MatTableDataSource<Role>(searchResult.roles);
        this.selectedApplicationPermissionsDataSource = new MatTableDataSource<Permission>(searchResult.permissions);
      }
    }
    return this.selectedApplication$.getValue();
  }

  /**
   * Установка / получение выбранного права пользователя
   * @param permission - Устанавливаемое текущим право пользователя
   */
  selectedPermission(permission?: Permission): Permission | null {
    if (permission) {
      this.selectedPermission$.next(permission);
    }
    return this.selectedPermission$.getValue();
  }

  /**
   * Возвращает DataSource ролей пользователей приложения
   */
  selectedApplicationRoles(): MatTableDataSource<Role> {
    return this.selectedApplicationRolesDataSource;
  }

  /**
   * Возвращает DataSource прав пользователей приложения
   */
  selectedApplicationPermissions(): MatTableDataSource<Permission> {
    return this.selectedApplicationPermissionsDataSource;
  }

  /**
   * Выпорлняется ли получение данных с сервера
   */
  isFetchingData(): Observable<boolean> {
    return this.fetchingData$.asObservable();
  }

  /**
   * Выполняется ли добавлени нового права пользователя
   */
  isAddingPermission(): Observable<boolean> {
    return this.addingPermission$.asObservable();
  }

  /**
   * Выполняется ли сохранение изменений прав пользователя
   */
  isEditingPermission(): Observable<boolean> {
    return this.editingPermission$.asObservable();
  }
}
