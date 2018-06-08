/**
 * Интерфейс, описывающтй содержимое задачи заявка АХО
 */
export interface IAhoRequestTaskContent {
  id: number;                   // Идентификатор
  requestTypeId: number;        // Идентификатор типа заявки
  title: string;                // Наименование
  boxing?: string | null;       // Тара
}
