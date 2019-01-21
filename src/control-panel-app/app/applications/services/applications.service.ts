import { Injectable } from '@angular/core';
import { ApplicationsResource } from '../resources/applications.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Application } from '../models/application.model';
import { IApplication } from '../interfaces/application.interface';
import { IServerResponse } from '../../basic/interfaces/server-response.interface';
import { IPermission } from '../../users/interfaces/permission.interface';
import { IRole } from '../../users/interfaces/role.interface';
import { Role } from '../../users/models/role.model';
import { Permission } from '../../users/models/permission.model';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { finalize, map } from 'rxjs/operators';


@Injectable()
export class ApplicationsService {
  public applications$: BehaviorSubject<Application[]>;
  private selectedApplication$: BehaviorSubject<Application>;
  private selectedApplicationRolesDataSource: MatTableDataSource<Role>;
  private selectedApplicationPermissionsDataSource: MatTableDataSource<Permission>;
  private selectedRole$: BehaviorSubject<Role>;
  private selectedPermission$: BehaviorSubject<Permission>;
  private fetchingData$: BehaviorSubject<boolean>;
  private addingRole$: BehaviorSubject<boolean>;
  private editingRole$: BehaviorSubject<boolean>;
  private addingPermission$: BehaviorSubject<boolean>;
  private editingPermission$: BehaviorSubject<boolean>;

  constructor(private readonly resource: ApplicationsResource) {
    this.applications$ = new BehaviorSubject<Application[]>([]);
    this.selectedApplication$ = new BehaviorSubject<Application>(null);
    this.selectedApplicationRolesDataSource = new MatTableDataSource<Role>([]);
    this.selectedApplicationPermissionsDataSource = new MatTableDataSource<Permission>([]);
    this.selectedRole$ = new BehaviorSubject<Role>(null);
    this.selectedPermission$ = new BehaviorSubject<Permission>(null);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingRole$ = new BehaviorSubject<boolean>(false);
    this.editingRole$ = new BehaviorSubject<boolean>(false);
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
   * Добавление новой роли пользователя
   * @param role - Добавляемая роль пользователя
   */
  addRole(role: Role): Observable<Role | null> {
    this.addingRole$.next(true);
    return from(this.resource.addRole(role))
      .pipe(
        map((response: IServerResponse<IRole>) => {
          const newRole = new Role(response.data);
          newRole.backup.setup(['code', 'title', 'isEnabled']);
          const roles = this.selectedApplication$.getValue().roles;
          roles.push(newRole);
          this.selectedApplicationRolesDataSource = new MatTableDataSource<Role>(roles);
          return newRole;
        }),
        finalize(() => {
          this.addingRole$.next(false);
        })
      );
  }

  /**
   * Изменение роли пользователя
   * @param role - Изменяемая роль пользователя
   */
  editRole(role: Role): Observable<Role | null> {
    this.editingRole$.next(true);
    return from(this.resource.editRole(role, null, {id: role.id}))
      .pipe(
        map((response: IServerResponse<IRole>) => {
          role.backup.setup(['code', 'title', 'isEnabled', 'permissions']);
          return role;
        }),
        finalize(() => {
          this.editingRole$.next(false);
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
    return from(this.resource.editPermission(permission, null, {id: permission.id}))
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
   * Установка / получение выбранной роли пользователя
   * @param role - Устанавливаемая текущей роль пользователя
   */
  selectedRole(role?: Role): Role | null {
    if (role) {
      this.selectedRole$.next(role);
    }
    return this.selectedRole$.getValue();
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
   * Выполняется ли добавление новой роли пользователя
   */
  isAddingRole(): Observable<boolean> {
    return this.addingRole$.asObservable();
  }

  /**
   * Выполняется ли сохранение изменений роли пользователя
   */
  isEditingRole(): Observable<boolean> {
    return this.editingRole$.asObservable();
  }

  /**
   * Выполняется ли добавлени нового права пользователя
   */
  isAddingPermission(): Observable<boolean> {
    return this.addingPermission$.asObservable();
  }

  /**
   * Выполняется ли сохранение изменений права пользователя
   */
  isEditingPermission(): Observable<boolean> {
    return this.editingPermission$.asObservable();
  }
}
