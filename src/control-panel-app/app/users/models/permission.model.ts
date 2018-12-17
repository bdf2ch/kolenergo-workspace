import { IPermission } from '../interfaces/permission.interface';
import { Backup } from '@kolenergo/lib';

export class Permission extends Backup implements IPermission {
  id: number;             // Идентификатор
  applicationId: number;  // Идентификатор приложения
  code: string;           // Код права пользователя
  title: string;          // Наименование
  isEnabled: boolean;     // Включен ли

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IPermission) {
    super();
    this.id = config ? config.id : 0;
    this.applicationId = config ? config.applicationId : null;
    this.code = config ? config.code : null;
    this.title = config ? config.title : null;
    this.isEnabled = config && config.isEnabled ? config.isEnabled : false;
  }
}
