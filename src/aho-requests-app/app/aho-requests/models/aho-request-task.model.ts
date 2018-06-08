import { IAhoRequestTask } from '../interfaces/aho-request-task.interface';
import { IAhoRequestTaskContent } from '../interfaces/aho-request-task-content.interface';
import { AhoRequestTaskContent } from './aho-request-task-content.model';

export class AhoRequestTask implements IAhoRequestTask {
  id: number;                                 // Идентификатор
  content: IAhoRequestTaskContent | null;     // Содержимое задачи
  count: number | null;                       // Количество
  done: boolean;                              // Выполнено ли задание
  timeAdded?: number;                         // Время добавления задания

  /**
   * Конструктор
   * @param {IAhoRequestTask} config - Параметры инициализации
   */
  constructor(config?: IAhoRequestTask) {
    this.id = config ? config.id : 0;
    this.content = config ? new AhoRequestTaskContent(config.content) : null;
    this.count = config && config.count ? config.count : 1;
    this.done = config ? config.done : false;
    this.timeAdded = new Date().getTime();
  }
}
