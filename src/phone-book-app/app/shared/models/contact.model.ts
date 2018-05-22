import { IContact } from '../interfaces/contact.interface';
import { User } from '../../../../shared-lib/app/users/models/user.model';
import { Phone } from './phone.model';

/**
 * Класс, реализующий интерфейс абонента
 */
export class Contact extends User implements IContact {
  userId: number;           // Идентификатор пользователя
  officeId: number;         // Идентификатор офиса организации
  photo: string;            // Фото абонента
  room: string;             // Кабинет абонента
  viewOrder: number;        // Порядок следования в структурном подразделении
  isInFavorites: boolean;   // Абонент является избранным
  phones: Phone[];          // Контактные телефоны абонента

  /**
   * Конструктор
   * @param {IContact} config - Параметры инициализации
   */
  constructor(config?: IContact) {
    super(config ? config : null);
    this.userId = config ? config.userId : 0;
    this.officeId = config && config.officeId ? config.officeId : 0;
    this.photo = config && config.photo ? config.photo : '';
    this.room = config && config.room ? config.room : '';
    this.viewOrder = config && config ? config.viewOrder : 0;
    this.isInFavorites = config && config.isInFavorites ? config.isInFavorites : false;
    this.phones = config ? config.phones : [];
  }
}
