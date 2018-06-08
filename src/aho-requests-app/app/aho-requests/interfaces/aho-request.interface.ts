import { IUser } from '@kolenergo/lib';
import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IAhoRequestTask } from './aho-request-task.interface';

/**
 * Интерфейс, описывающий заявку АХО
 */
export interface IAhoRequest {
  id: number;                                     // Идентификатор заявки
  type: IAhoRequestType;                          // Тип заявки
  status: IAhoRequestStatus;                      // Статус заявки
  //description?: string;                           // Примечание к заявке
  room?: string;                                  // Кабинет
  dateCreated: Date;                              // Дата создания заявки
  user: IUser;                                    // Пользователь, создавший заявку
  tasks: IAhoRequestTask[];                       // Список задач
}
