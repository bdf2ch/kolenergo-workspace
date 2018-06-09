import { IPermission } from '../interfaces/permission.interface';
import { Permission } from './permission.model';

/**
 * Класс, реализующий механизм доступа к правам  пользователя
 */
export class UserPermissions {
  permissions: IPermission[];

  /**
   * Конструктор
   * @param {IPermission[]} config - Параметры инициализации
   */
  constructor(config?: IPermission[]) {
    this.permissions = [];

    if (config) {
      config.forEach((item: IPermission) => {
        const permission = new Permission(item);
        this.permissions.push(permission);
      });
    }
  }

  /**
   * Получение права пользователя по идентификатору
   * @param {number} id - Идентификатор права пользователя
   * @returns {Permission | null}
   */
  getById(id: number): boolean | null {
    const findPermissionById = (perm: IPermission) => perm.id === id;
    const permission = this.permissions.find(findPermissionById);
    return permission ? permission.isEnabled : null;
  }

  /**
   * Получение права пользователя по коду
   * @param {string} code - Код права пользователя
   * @returns {Permission | null}
   */
  getByCode(code: string): boolean | null {
    const findPermissionByCode = (perm: IPermission) => perm.code === code;
    const permission = this.permissions.find(findPermissionByCode);
    return permission ? permission.isEnabled : null;
  }
}
