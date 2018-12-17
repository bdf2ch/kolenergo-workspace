import { IUser } from '../../../../control-panel-app/app/users/interfaces/user.interface';
import { Phone } from '../models/phone.model';

/**
 * Интерфейс, описывающий абонента
 */
export interface IContact extends IUser {
  userId: number;           // Идентификатор пользователя
  officeId: number;         // Идентификатор офиса организации
  photo: string;            // Фото абонента
  room: string;             // Кабинет абонента
  viewOrder: number;        // Порядок следования в структурном подразделении
  isInFavorites: boolean;   // Абонент является избранным
  phones: Phone[];          // Контактные телефоны абонента
}
