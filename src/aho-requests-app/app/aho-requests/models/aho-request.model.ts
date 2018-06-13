import { IAhoRequest } from '../interfaces/aho-request.interface';
import { User } from '@kolenergo/lib';
import { AhoRequestType } from './aho-request-type.model';
import { AhoRequestStatus } from './aho-request-status.model';
import { IAhoRequestTask } from '../interfaces/aho-request-task.interface';
import { AhoRequestTask } from './aho-request-task.model';
import {AhoRequestComment} from "./aho-request-comment.model";
import {IAhoRequestComment} from "../interfaces/aho-request-comment.interface";

/**
 * Класс, реализующий интерфейс заявки АХО
 */
export class AhoRequest implements IAhoRequest {
  id: number;                                 // Идентификатор заявки
  type: AhoRequestType;                       // Тип заявки
  status: AhoRequestStatus;                   // Статус заявки
  //description: string;                        // Примечание к заявке
  room: string;                               // Кабинет
  dateCreated: Date;                          // Дата создания заявки
  user: User;                                 // Пользователь, создавший заявку
  employee: User | null;                      // Исполнитель заявки
  tasks: IAhoRequestTask[];                   // Список задач
  comments: AhoRequestComment[];              // Список комментариеа к заявке
  label: string;                              // Представление списка задач одной строкой

  /**
   * Конструктор
   * @param {IAhoRequest} config - Параметры инициализации
   */
  constructor(config?: IAhoRequest) {
    this.id = config ? config.id : 0;
    this.type = config ? new AhoRequestType(config.type) : new AhoRequestType();
    this.status = config ? new AhoRequestStatus(config.status) : new AhoRequestStatus();
    //this.description = config && config.description ? config.description : '';
    this.room = config && config.room ? config.room : '';
    this.dateCreated = config ? new Date(config.dateCreated) : new Date();
    this.user = config && config.user ? new User(config.user) : new User();
    this.employee = config && config.employee ? new User(config.employee) : null;
    this.tasks = [];
    this.comments = [];
    this.label = '';

    if (config) {
      config.tasks.forEach((item: IAhoRequestTask, index: number) => {
        const task = new AhoRequestTask(item);
        this.tasks.push(task);
        this.label += `${config.tasks.length > 1 ? (index + 1) + '. ' : ''} ${task.content.title} ${task.count ? ' - ' + task.count : ''}`;
        this.label += index !== config.tasks.length - 1 ? '      ' : '';
      });
      config.comments.forEach((item: IAhoRequestComment) => {
        const comment = new AhoRequestComment(item);
        this.comments.push(comment);
      });
    }
  }

  isAllTasksCompleted(): boolean {
    let result = true;
    this.tasks.forEach((task: AhoRequestTask) => {
      if (!task.done) {
        result = false;
      }
    });
    return result;
  }
}
