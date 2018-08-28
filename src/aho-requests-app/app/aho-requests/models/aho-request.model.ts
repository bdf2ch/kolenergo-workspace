import { IAhoRequest } from '../interfaces/aho-request.interface';
import { IUser, User } from '@kolenergo/lib';
import { AhoRequestType } from './aho-request-type.model';
import { AhoRequestStatus } from './aho-request-status.model';
import { IAhoRequestTask } from '../interfaces/aho-request-task.interface';
import { AhoRequestTask } from './aho-request-task.model';
import { AhoRequestComment } from './aho-request-comment.model';
import { IAhoRequestComment } from '../interfaces/aho-request-comment.interface';
import { AhoRequestRejectReason } from './aho-request-reject-reason.model';
import { Backup } from '@kolenergo/lib';
import { AhoRequestTaskContent } from './aho-request-task-content.model';

/**
 * Класс, реализующий интерфейс заявки АХО
 */
export class AhoRequest extends Backup implements IAhoRequest {
  id: number;                                     // Идентификатор заявки
  type: AhoRequestType;                           // Тип заявки
  status: AhoRequestStatus;                       // Статус заявки
  rejectReason: AhoRequestRejectReason | null;    // Причина отклоенния заявки
  room: string;                                   // Кабинет
  numberOfLoaders: number;                        // Количество грузчиков
  dateCreated: Date;                              // Дата создания заявки
  dateExpires: Date;                              // Дата исполнения заявки
  isExpired: boolean;                             // Просрочен ли срок исполнения заявки
  initiator: string;                              // Инициатор заявки
  user: User;                                     // Пользователь, создавший заявку
  employees: User[];                              // Исполнитель заявки
  tasks: IAhoRequestTask[];                       // Список задач
  comments: AhoRequestComment[];                  // Список комментариеа к заявке
  label: string;                                  // Представление списка задач одной строкой

  /**
   * Конструктор
   * @param {IAhoRequest} config - Параметры инициализации
   */
  constructor(config?: IAhoRequest) {
    super();
    this.id = config ? config.id : 0;
    this.type = config ? new AhoRequestType(config.type) : new AhoRequestType();
    this.status = config ? new AhoRequestStatus(config.status) : new AhoRequestStatus();
    this.rejectReason = config && config.rejectReason ? new AhoRequestRejectReason(config.rejectReason) : null;
    this.room = config && config.room ? config.room : '';
    this.numberOfLoaders = config && config.numberOfLoaders ? config.numberOfLoaders : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateExpires = config && config.dateExpires ? new Date(config.dateExpires) : null;
    this.isExpired = config ? config.isExpired : false;
    this.initiator = config && config.initiator ? config.initiator : null;
    this.user = config && config.user ? new User(config.user) : null;
    this.employees = [];
    this.tasks = [];
    this.comments = [];
    this.label = '';

    if (config) {
      config.employees.forEach((item: IUser) => {
        const employee = new User(item);
        this.employees.push(employee);
      });
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

  fromAnother(request: AhoRequest) {
    this.id = request.id;
    this.type = request.type;
    this.status = request.status;
    this.rejectReason = request.rejectReason;
    this.room = request.room;
    this.dateCreated = request.dateCreated;
    this.dateExpires = request.dateExpires;
    this.isExpired = request.isExpired;
    this.initiator = request.initiator;
    this.user = request.user;
    this.employees = request.employees;
    this.tasks = request.tasks;
    this.comments = request.comments;
    this.label = request.label;
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

  getTasksContent(): AhoRequestTaskContent[] {
    const result = [];
    this.tasks.forEach((task: AhoRequestTask) => {
      result.push(task.content);
    });
    return result;
  }
}
