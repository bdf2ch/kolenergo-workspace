import { IUser } from '@kolenergo/lib';
import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IOfficeStuffListItem } from './office-stuff-list-item.interface';

/**
 * Интерфейс, описывающий заявку АХО
 */
export interface IAhoRequest {
  id: number;                                     // Идентификатор заявки
  userId: number;                                 // Идентификатор пользователя, подавшего заявку
  type: IAhoRequestType;                          // Тип заявки
  status: IAhoRequestStatus;                      // Статус заявки
  comment: string;                                // Содержание заявки
  room: string;                                   // Кабинет
  dateCreated: Date;                              // Дата создания заявки
  user?: IUser;                                   // Пользователь, создавший заявку
  officeStuffList: IOfficeStuffListItem[];        // Список требуемых канцелярских принадлежностей
}
