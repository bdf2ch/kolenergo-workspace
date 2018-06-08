import { IAddAhoRequestType } from './aho-request-type.add.interface';

/**
 * Интерфейс редактирования типа заявки АХО
 */
export interface IEditAhoRequestType extends IAddAhoRequestType {
  id: number;   // Идентификатор типа
}
