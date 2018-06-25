import { IPermission } from '../interfaces/permission.interface';
import { Permission } from './permission.model';
import { IRole } from "../interfaces/role.interface";
import { Role } from '../models/role.model';

/**
 * Класс, реализующий механизм доступа к правам  пользователя
 */
export class UserPermissionsManager {
  permissions: IPermission[];
  roles: IRole[];

  /**
   * Конструктор
   * @param {IPermission[]} config - Параметры инициализации
   */
  constructor(config?: {permissions: IPermission[], roles: IRole[]}) {
    this.permissions = [];
    this.roles = [];

    if (config) {
      config.permissions.forEach((item: IPermission) => {
        const permission = new Permission(item);
        this.permissions.push(permission);
      });
      config.roles.forEach((item: IRole) => {
        const role = new Role(item);
        this.roles.push(role);
      });
    }
  }

  /**
   * Получение роли пользователя по идентификатору
   * @param {number} id - Идентификатор роли пользователя
   * @returns {Role | null}
   */
  getRoleById(id: number): Role | null {
    const findRoleById = (item: Role) => item.id === id;
    const role = this.roles.find(findRoleById);
    return role ? role : null;
  }

  /**
   * Получение роли пользователя по коду
   * @param {number} code - Код роли прользователя
   * @returns {Role | null}
   */
  getRoleByCode(code: string): Role | null {
    const findRoleByCode = (item: Role) => item.code === code;
    const role = this.roles.find(findRoleByCode);
    return role ? role : null;
  }

  /**
   * Получение права пользователя по идентификатору
   * @param {number} id - Идентификатор права пользователя
   * @returns {Permission | null}
   */
  getPermissionById(id: number): boolean | null {
    const findPermissionById = (perm: IPermission) => perm.id === id;
    const permission = this.permissions.find(findPermissionById);
    return permission ? permission.isEnabled : null;
  }

  /**
   * Получение права пользователя по коду
   * @param {string} code - Код права пользователя
   * @returns {Permission | null}
   */
  getPermissionByCode(code: string): boolean | null {
    const findPermissionByCode = (perm: IPermission) => perm.code === code;
    const permission = this.permissions.find(findPermissionByCode);
    return permission ? permission.isEnabled : null;
  }
}
