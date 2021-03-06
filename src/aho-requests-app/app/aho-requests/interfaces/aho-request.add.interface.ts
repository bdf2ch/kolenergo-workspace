import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IUser, User} from '@kolenergo/cpa';
import { IAhoRequestTask } from './aho-request-task.interface';

/**
 * Интерфейс добавления заявки АХО
 */
export interface IAddAhoRequest {
  initiator?: string;                         // Инициатор заявки
  user: IUser;                                // Пользователь, создавший заявку
  type: IAhoRequestType;                      // Тип заявки
  status: IAhoRequestStatus;                  // Статус заявки
  comment?: string;                           // Содержание заявки
  room?: string;                              // Кабинет
  numberOfLoaders?: number;                   // Количество грузчиков
  dateExpires?: Date;                         // Срок исполнения заявки
  tasks: IAhoRequestTask[];                   // Список задач
  employees: User[];                          // Список исполнителей
  phone: string;                              // Контактный телефон
}
