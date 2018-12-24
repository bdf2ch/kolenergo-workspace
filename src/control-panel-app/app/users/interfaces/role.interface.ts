import { IPermission } from '../interfaces/permission.interface';


/**
 * Интерфейс, описывающий роль пользователя
 */
export interface IRole {
  id: number;                   // Идентификатор
  applicationId: number;        // Идентификатор приложения
  code: string;                 // Код роли
  title: string;                // Наименование роли
  isEnabled?: boolean;          // Включена ли роль
  permissions: IPermission[];   // Права пользователей роли
}
