import { IPermission } from '../../users/interfaces/permission.interface';
import { IRole } from '../../users/interfaces/role.interface';

/**
 * Интерфейс, описывающий приложение
 */
export interface IApplication {
  id: number;                   // Идентификатор приложения
  code: string;                 // Код приложения
  title: string;                // Наименование приложения
  permissions?: IPermission[];  // Права пользователей приложения
  roles?: IRole[];              // Роли пользователей приложения
}
