import { IAddUser } from './user.add.interface';

/**
 * Интерфейс редактирования пользователя
 */
export interface IEditUser extends IAddUser {
  readonly id: number;    // Идентификатор пользователя
}
