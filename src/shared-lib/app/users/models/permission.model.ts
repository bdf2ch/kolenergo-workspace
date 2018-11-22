import { IPermission } from '../interfaces/permission.interface';
import { Backup } from '@kolenergo/lib';

export class Permission extends Backup implements IPermission {
  id: number;             // Идентификатор
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
    this.code = config ? config.code : '';
    this.title = config ? config.title : '';
    this.isEnabled = config && config.isEnabled ? config.isEnabled : false;
  }
}
