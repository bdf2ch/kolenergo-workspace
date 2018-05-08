/**
 * Интерфейс добавления контактного телефона абонента
 */
export interface IAddPhone {
  contactId: number;    // Идентификатор абонента
  atsId: number;        // Идентификатор АТС
  number: string;       // Номер телефона
}
