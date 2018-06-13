import { IAhoRequestComment } from "../interfaces/aho-request-comment.interface";

/**
 * Класс, реализующий интерфейс комментария в заявке АХО
 */
export class AhoRequestComment implements IAhoRequestComment {
  id: number;            // Идентификатор
  requestId: number;     // Идентификатор заявки
  userId: number;        // Идентфиикатор пользователя
  content: string;       // Содержание комментария
  dateCreated: Date;     // Дата размещение

  /**
   * Конструктор
   * @param {IAhoRequestComment} config - Параметры инициализации
   */
  constructor(config?: IAhoRequestComment) {
    this.id = config ? config.id : 0;
    this.requestId = config ? config.requestId : 0;
    this.userId = config ? config.userId : 0;
    this.content = config ? config.content : '';
    this.dateCreated = config ? new Date(config.dateCreated) : new Date();
  }
}
