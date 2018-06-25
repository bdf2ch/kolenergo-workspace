import { IAhoRequestTaskContent } from './aho-request-task-content.interface';

/**
 * Интерфейс, описывающий потребность в материалах
 */
export interface IAhoRequestNeed {
  content: IAhoRequestTaskContent;      // Содержание задачи заявки АХО
  total: number;                        // Количество
}
