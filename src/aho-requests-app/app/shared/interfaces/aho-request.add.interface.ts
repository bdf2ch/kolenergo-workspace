import { IAhoRequestType } from './aho-request-type.interface';
import { IAhoRequestStatus } from './aho-request-status.interface';
import { IOfficeStuffListItem } from './office-stuff-list-item.interface';

/**
 * Интерфейс добавления заявки АХО
 */
export interface IAddAhoRequest {
  userId: number;                             // Идентификатор пользователя, создавшего заявку
  type: IAhoRequestType;                      // Тип заявки
  status: IAhoRequestStatus;                  // Статус заявки
  // requestTypeId: number;                   // Идентификатор типа заявки
  comment?: string;                           // Содержание заявки
  room?: string;                              // Кабинет
  officeStuffList: IOfficeStuffListItem[];    // Список канцелярских принадлежностей
}
