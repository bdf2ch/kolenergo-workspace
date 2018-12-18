import { IUser } from '@kolenergo/cpa';

/**
 * Интерфейс, описывающий комментарий к заявке АХО
 */
export interface IAhoRequestComment {
  id: number;            // Идентификатор
  requestId: number;     // Идентификатор заявки
  userId: number;        // Идентификатор пользователя
  user?: IUser;
  content: string;       // Содержание комментария
  dateCreated: Date;     // Дата размещения
}
