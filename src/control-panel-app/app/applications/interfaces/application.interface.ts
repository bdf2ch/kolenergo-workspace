import { IPermission } from '../../users/interfaces/permission.interface';
import { IRole } from '../../users/interfaces/role.interface';
import { IApplicationSettingGroup } from './application-setting-group.interface';

/**
 * Интерфейс, описывающий приложение
 */
export interface IApplication {
  id: number;                             // Идентификатор приложения
  code: string;                           // Код приложения
  title: string;                          // Наименование приложения
  description: string;                    // Описание приложения
  permissions?: IPermission[];            // Права пользователей приложения
  roles?: IRole[];                        // Роли пользователей приложения
  settings?: IApplicationSettingGroup[];  // Настройки приложения
}
