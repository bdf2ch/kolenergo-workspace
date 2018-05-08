import { IAddContact } from './contact.add.interface';

/**
 * Интерфейс редактирования абонента
 */
export interface IEditContact extends IAddContact {
    id: number;   // Идентификатор абонента
}
