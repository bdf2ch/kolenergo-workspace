import { IRole } from '../interfaces/role.interface';

/**
 * Класс, реализующий интерфейс роли пользователя
 */
export class Role implements IRole {
  id: number;                 // Идентификатор
  applicationId: number;      // Идентификатор приложения
  isEnabled: boolean;         // Включена ли роль

  /**
   * Конструктор
   * @param {IRole} config - Параметры инициализации
   */
  constructor(config?: IRole) {
    this.id = config ? config.id : 0;
    this.applicationId = config ? config.applicationId : 0;
    this.isEnabled = config ? config.isEnabled : false;
  }
}
