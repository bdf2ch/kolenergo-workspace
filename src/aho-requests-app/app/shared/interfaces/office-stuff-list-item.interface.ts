/**
 * Инткрфейс, описывающий элемент списка заявки на канцелярские принадлежности
 */
export interface IOfficeStuffListItem {
  id: number;           // Идентификатор элемента списка
  requestId: number;    // Идентификатор заявки
  title: string;        // Наименование канцелярских принадлежностей
  count: number;        // Количество
  isDone: boolean;      // Элемент выполнен
}
