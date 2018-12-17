import {IMobilePhone} from '../interfaces/mobile-phone.interface';

/**
 * Класс, реализующий интерфейс номера мобильного телефона
 */
export class MobilePhone implements IMobilePhone {
  id: number;       // Идентификатор номера мобильного телефона
  userId: number;   // Идентификатор пользователя
  number: string;   // Номер мобильного телефона

  /**
   * Конструктор
   * @param {IMobilePhone} config - Параметры инициализации
   */
  constructor(config?: IMobilePhone) {
    this.id = config ? config.id : 0;
    this.userId = config ? config.userId : 0;
    this.number = config ? config.number : '';
  }
}
