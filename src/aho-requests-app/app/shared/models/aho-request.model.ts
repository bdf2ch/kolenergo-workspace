import { IAhoRequest } from '../interfaces/aho-request.interface';

/**
 * Класс, реализующий интерфейс заявки АХО
 */
export class AhoRequest implements IAhoRequest {
  id: number;               // Идентификатор заявки
  userId: number;           // Идентификатор пользователя, подавшего заявку
  requestTypeId: number;    // Идентификатор типа заявки
  comment: string;          // Содержание заявки
  dateCreated: Date;        // Дата создания заявки

  /**
   * Конструктор
   * @param {IAhoRequest} config - Параметры инициализации
   */
  constructor(config?: IAhoRequest) {
    this.id = config ? config.id : 0;
    this.userId = config ? config.userId : 0;
    this.requestTypeId = config ? config.requestTypeId : 0;
    this.comment = config ? config.comment : '';
    this.dateCreated = config ? new Date(config.dateCreated) : new Date();
  }
}
