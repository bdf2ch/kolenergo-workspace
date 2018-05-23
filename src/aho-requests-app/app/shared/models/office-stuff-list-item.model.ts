import { IOfficeStuffListItem } from '../interfaces/office-stuff-list-item.interface';

/**
 * Класс, реализцющий интерфейс элемента списка канйелярских принадлежностей
 */
export class OfficeStuffListItem implements IOfficeStuffListItem {
  id: number;               // Идентификатор элемента списка
  requestId: number;        // Идентификатор заявки
  title: string;            // Наименование элемента списка
  count: number;            // Количество
  isDone: boolean;          // Элемент выполнен

  /**
   * Конструктор
   * @param {IOfficeStuffListItem} config - Параметры инициализации
   */
  constructor(config?: IOfficeStuffListItem) {
    this.id = config ? config.id : 0;
    this.requestId = config ? config.requestId : 0;
    this.title = config ? config.title : '';
    this.count = config ? config.count : 1;
    this.isDone = config ? config.isDone : false;
  }
}
