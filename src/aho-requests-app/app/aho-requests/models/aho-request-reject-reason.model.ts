import { IAhoRequestRejectReason } from '../interfaces/aho-request-reject-reason.interface';

/**
 * Класс, реализующий интерфейс причины отказа зафвки АХО
 */
export class AhoRequestRejectReason implements IAhoRequestRejectReason {
  id: number;                 // Идентификатор
  requestTypeId: number;      // Идентификатор типа заявки АХО
  content: string;            // Содержание причины отказа

  /**
   * Конструктор
   * @param {IAhoRequestRejectReason} config - Параметры инициализации
   */
  constructor(config?: IAhoRequestRejectReason) {
    this.id = config ? config.id : 0;
    this.requestTypeId = config ? config.requestTypeId : 0;
    this.content = config ? config.content : null;
  }
}
