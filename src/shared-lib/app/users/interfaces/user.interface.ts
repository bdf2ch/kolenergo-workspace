/**
 * Интерфейс, описывающий пользователя
 */
import {IPermission} from "./permission.interface";

export interface IUser {
  id: number;                       // Идентификатор пользователя
  divisionId: number;               // Идентификатор структурного подразделения
  personalNumber: string;           // Табельный номер
  firstName: string;                // Имя пользователя
  secondName: string;               // Отчество пользователя
  lastName: string;                 // Фамилия пользователя
  position: string;                 // Должность пользователя
  email: string;                    // E-mail пользователя
  activeDirectoryAccount: string;   // Учетная запись Active Directory
  fio?: string;                     // ФИО пользователя
  permissions?: IPermission[];      // Набор прав пользователя
}
