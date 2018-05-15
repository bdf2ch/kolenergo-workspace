import { IAhoRequest } from '../interfaces/aho-request.interface';
import { User } from '@kolenergo/lib';

/**
 * Класс, реализующий интерфейс заявки АХО
 */
export class AhoRequest implements IAhoRequest {
  id: number;               // Идентификатор заявки
  userId: number;           // Идентификатор пользователя, подавшего заявку
  requestTypeId: number;    // Идентификатор типа заявки
  comment: string;          // Содержание заявки
  room: string;             // Кабинет
  dateCreated: Date;        // Дата создания заявки
  user: User;               // Пользователь, создавший заявку

  /**
   * Конструктор
   * @param {IAhoRequest} config - Параметры инициализации
   */
  constructor(config?: IAhoRequest) {
    this.id = config ? config.id : 0;
    this.userId = config ? config.userId : 0;
    this.requestTypeId = config ? config.requestTypeId : 0;
    this.comment = config ? config.comment : '';
    this.room = config ? config.room : '';
    this.dateCreated = config ? new Date(config.dateCreated) : new Date();
    this.user = config && config.user ? new User(config.user) : new User();
  }
}
