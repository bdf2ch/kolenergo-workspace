import { IApplication } from '../interfaces/application.interface';
import { IRole, Role, IPermission, Permission, Backup } from '@kolenergo/lib';

/**
 * Класс, реализующий интерфейс приложения
 */
export class Application extends Backup implements IApplication {
  id: number;                   // Идентификатор приложения
  code: string;                 // Код приложения
  title: string;                // Наименование приложения
  roles: Role[];                // Роли пользователей приложения
  permissions: Permission[];    // Права пользователей приложения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplication) {
    super();
    this.id = config ? config.id : null;
    this.code = config ? config.code : null;
    this.title = config ? config.title : null;
    this.roles = [];
    this.permissions = [];

    if (config && config.roles) {
      config.roles.forEach((item: IRole) => {
        const role = new Role(item);
        role.backup.setup(['code', 'title', 'isEnabled']);
        this.roles.push(role);
      });
    }

    if (config && config.permissions) {
      config.permissions.forEach((item: IPermission) => {
        const permission = new Permission(item);
        permission.backup.setup(['code', 'title', 'isEnabled']);
        this.permissions.push(permission);
      });
    }
  }
}
