/**
 * Интерфейс, описывающий контактный телефон абонента
 */
export interface IPhone {
  id: number;               // Идентификатор контактного телефона
  contactId: number;        // Идентификатор абонента
  atsId: number;            // Идентификатор АТС
  code: string;             // Код выхода на АТС
  number: string;           // Номер телефона
  tunneledNumber: string;   // Номер телефона с учетом маршрутизации
}
