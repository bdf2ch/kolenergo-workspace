import { IAhoRequestTaskContent } from './aho-request-task-content.interface';

/**
 * Интерфейс, описывающий задание, содержащееся в заявке
 */
export interface IAhoRequestTask {
  id: number;                                 // Идентификатор
  content: IAhoRequestTaskContent;            // Содержимое задачи
  count: number | null;                       // Количество
  done: boolean;                              // Выполнена ли задача
  timeAdded?: number;
}
