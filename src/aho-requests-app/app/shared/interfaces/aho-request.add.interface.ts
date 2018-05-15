/**
 * Интерфейс добавления заявки АХО
 */
export interface IAddAhoRequest {
  userId: number;           // Идентификатор пользователя, создавшего заявку
  requestTypeId: number;    // Идентификатор типа заявки
  comment: string;          // Содержание заявки
  room: string;             // Кабинет
}
