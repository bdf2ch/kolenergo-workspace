import { IAhoRequestTaskContent } from '../interfaces/aho-request-task-content.interface';

/**
 * Класс, реализующий интерфейс содержимого задачи заявки АХО
 */
export class AhoRequestTaskContent implements IAhoRequestTaskContent {
  id: number;                 // Идентификатор
  requestTypeId: number;      // Идентификатор типа заявки
  title: string;              // Наименование
  boxing: string | null;      // Тара

  /**
   * Конструктор
   * @param {IAhoRequestTaskContent} config - Параметры инициализации
   */
  constructor(config?: IAhoRequestTaskContent) {
    this.id = config ? config.id : 0;
    this.requestTypeId = config ? config.requestTypeId : 0;
    this.title = config ? config.title : '';
    this.boxing = config ? config.boxing : null;
  }
}
