import { IAddPhone } from './phone.add.interface';

/**
 * Интерфейс редактирования контактного телефона абонента
 */
export interface IEditPhone extends IAddPhone {
  id: number;   // Идентификатор контактного телефона абонента
}
