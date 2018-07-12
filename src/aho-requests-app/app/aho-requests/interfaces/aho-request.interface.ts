import { IUser } from '@kolenergo/lib';
import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IAhoRequestTask } from './aho-request-task.interface';
import { IAhoRequestComment } from './aho-request-comment.interface';

/**
 * Интерфейс, описывающий заявку АХО
 */
export interface IAhoRequest {
  id: number;                                     // Идентификатор заявки
  type: IAhoRequestType;                          // Тип заявки
  status: IAhoRequestStatus;                      // Статус заявки
  room?: string;                                  // Кабинет
  dateCreated: Date;                              // Дата создания заявки
  dateExpires?: Date;                             // Дата исполнения заявки
  user: IUser;                                    // Пользователь, создавший заявку
  employee?: IUser | null;                        // Исполнитель заявки
  tasks: IAhoRequestTask[];                       // Список задач
  comments: IAhoRequestComment[];                 // Список комментариев к заявке
}
