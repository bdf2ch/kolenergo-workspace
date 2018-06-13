/**
 * Интерфейс, описывающий комментарий к заявке АХО
 */
export interface IAhoRequestComment {
  id: number;            // Идентификатор
  requestId: number;     // Идентификатор заявки
  userId: number;        // Идентификатор пользователя
  content: string;       // Содержание комментария
  dateCreated: Date      // Дата размещения
}
