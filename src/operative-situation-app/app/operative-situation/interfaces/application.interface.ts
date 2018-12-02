import { IPermission, IRole } from '@kolenergo/lib';

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
