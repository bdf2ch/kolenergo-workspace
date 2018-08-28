import { IUser } from '@kolenergo/lib';
import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IAhoRequestTask } from './aho-request-task.interface';
import { IAhoRequestComment } from './aho-request-comment.interface';
import { AhoRequestRejectReason } from '../models/aho-request-reject-reason.model';

/**
 * Интерфейс, описывающий заявку АХО
 */
export interface IAhoRequest {
  id: number;                                       // Идентификатор заявки
  type: IAhoRequestType;                            // Тип заявки
  status: IAhoRequestStatus;                        // Статус заявки
  rejectReason?: AhoRequestRejectReason | null;     // Причина отклоенения заявки
  room?: string;                                    // Кабинет
  numberOfLoaders?: number;                         // Количество грузчиков
  dateCreated: Date;                                // Дата создания заявки
  dateExpires?: Date;                               // Дата исполнения заявки
  isExpired?: boolean;                              // Просрочен ли срок исполнения заявки
  initiator?: string;                               // Инициатор заявки
  user: IUser;                                      // Пользователь, создавший заявку
  employees: IUser[];                               // Исполнители заявки
  tasks: IAhoRequestTask[];                         // Список задач
  comments: IAhoRequestComment[];                   // Список комментариев к заявке
}
