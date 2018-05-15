import { IUser } from '@kolenergo/lib';

/**
 * Интерфейс, описывающий заявку АХО
 */
export interface IAhoRequest {
  id: number;               // Идентификатор заявки
  userId: number;           // Идентификатор пользователя, подавшего заявку
  requestTypeId: number;    // Идентификатор типа заявки
  comment: string;          // Содержание заявки
  room: string;             // Кабинет
  dateCreated: Date;        // Дата создания заявки
  user?: IUser;             // Пользователь, создавший заявку
}
