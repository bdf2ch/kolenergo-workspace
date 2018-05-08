import { IPhone } from '../interfaces/phone.interface';

/**
 * Класс, реализующий интерфейс контактного телефона абонента
 */
export class Phone implements IPhone {
  id: number;               // Идентификатор контактного телефона абонента
  atsId: number;            // Идентификатор АТС
  contactId: number;        // Идентификатор абоеннта
  code: string;             // Код выхода на АТС
  number: string;           // Номер телефона
  tunneledNumber: string;   // Номер телефона с учетом маршрутизации

  /**
   * Конструктор
   * @param {IPhone} config - Параметры инициализации
   */
  constructor(config?: IPhone) {
    this.id  = config && config.id ? config.id : 0;
    this.atsId = config ? config.atsId : 0;
    this.contactId = config ? config.contactId : 0;
    this.code = config ? config.code : '';
    this.number = config ? config.number : '';
    this.tunneledNumber = config ? config.tunneledNumber : '';
  }

}
