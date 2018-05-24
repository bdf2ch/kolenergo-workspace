import { IAhoRequest } from '../interfaces/aho-request.interface';
import { User } from '@kolenergo/lib';
import { AhoRequestType } from './aho-request-type.model';
import { AhoRequestStatus } from './aho-request-status.model';
import { OfficeStuffListItem } from './office-stuff-list-item.model';
import { IOfficeStuffListItem } from '../interfaces/office-stuff-list-item.interface';

/**
 * Класс, реализующий интерфейс заявки АХО
 */
export class AhoRequest implements IAhoRequest {
  id: number;                                 // Идентификатор заявки
  userId: number;                             // Идентификатор пользователя, подавшего заявку
  type: AhoRequestType;                       // Тип заявки
  status: AhoRequestStatus;                   // Статус заявки
  comment: string;                            // Содержание заявки
  room: string;                               // Кабинет
  dateCreated: Date;                          // Дата создания заявки
  user: User;                                 // Пользователь, создавший заявку
  officeStuffList: OfficeStuffListItem[];     // Список канцелярских принадлежностей
  officeStuffListTitle: string;               // Список канцелярских принадлежностей одной строкой

  /**
   * Конструктор
   * @param {IAhoRequest} config - Параметры инициализации
   */
  constructor(config?: IAhoRequest) {
    this.id = config ? config.id : 0;
    this.userId = config ? config.userId : 0;
    this.type = config ? new AhoRequestType(config.type) : new AhoRequestType();
    this.status = config ? new AhoRequestStatus(config.status) : new AhoRequestStatus();
    this.comment = config && config.comment ? config.comment : '';
    this.room = config && config.room ? config.room : '';
    this.dateCreated = config ? new Date(config.dateCreated) : new Date();
    this.user = config && config.user ? new User(config.user) : new User();
    this.officeStuffList = [];
    this.officeStuffListTitle = '';

    if (config && config.officeStuffList) {
      config.officeStuffList.forEach((item: IOfficeStuffListItem, index: number) => {
        const officeStuffItem = new OfficeStuffListItem(item);
        this.officeStuffListTitle += `${index + 1}. ${officeStuffItem.title} - ${officeStuffItem.count} шт.`;
        this.officeStuffListTitle += index < config.officeStuffList.length - 1 ? '  ' : '';
        this.officeStuffList.push(officeStuffItem);
      });
    }
  }
}
