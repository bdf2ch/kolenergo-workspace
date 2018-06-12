import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IUser } from '@kolenergo/lib';
import { IAhoRequestTask } from './aho-request-task.interface';

/**
 * Интерфейс добавления заявки АХО
 */
export interface IAddAhoRequest {
  user: IUser;                                // Пользователь, создавший заявку
  type: IAhoRequestType;                      // Тип заявки
  status: IAhoRequestStatus;                  // Статус заявки
  comment?: string;                           // Содержание заявки
  room?: string;                              // Кабинет
  tasks: IAhoRequestTask[];                   // Список задач
}