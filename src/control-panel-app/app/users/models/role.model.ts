import { IRole } from '../interfaces/role.interface';
import { Backup } from '../../common/models/backup.model';

/**
 * Класс, реализующий интерфейс роли пользователя
 */
export class Role extends Backup implements IRole {
  id: number;                 // Идентификатор
  applicationId: number;      // Идентификатор приложения
  code: string;               // Код роли
  title: string;              // Наименование роли
  isEnabled?: boolean;        // Включена ли роль
  backup?: any;

  /**
   * Конструктор
   * @param {IRole} config - Параметры инициализации
   */
  constructor(config?: IRole) {
    super();
    this.id = config ? config.id : 0;
    this.applicationId = config ? config.applicationId : 0;
    this.code = config ? config.code : null;
    this.title = config ? config.title : null;
    this.isEnabled = config && config.isEnabled ? config.isEnabled : false;
  }
}
