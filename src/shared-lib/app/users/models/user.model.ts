import { IUser } from '../interfaces/user.interface';
import { UserPermissions } from './user-permissions.model';

/**
 * Класс, реализующий интерфейс пользователя
 */
export class User implements IUser {
  id: number;                       // Идентификатор пользователя
  divisionId: number;               // Идентификатор структурного подразделения
  personalNumber: string;           // Табельный номер
  firstName: string;                // Имя пользователя
  secondName: string;               // Отчество пользователя
  lastName: string;                 // Фамилия пользователя
  position: string;                 // Должность пользователя
  email: string;                    // E-mail пользователя
  activeDirectoryAccount: string;   // Учетная запись Active Directory
  fio: string;                      // ФИО пользователя
  permissions: UserPermissions;     // Права пользователя

  /**
   * Конструктор класса
   * @param {IUser} config - Параметры инициализации
   */
  constructor(config?: IUser) {
    this.id = config ? config.id : 0;
    this.divisionId = config ? config.divisionId : 0;
    this.personalNumber = config ? config.personalNumber : '';
    this.firstName = config ? config.firstName : '';
    this.secondName = config ? config.secondName : '';
    this.lastName = config ? config.lastName : '';
    this.position = config ? config.position : '';
    this.email = config ? config.email : '';
    this.activeDirectoryAccount = config ? config.activeDirectoryAccount : '';
    this.fio = `${this.firstName} ${this.secondName} ${this.lastName}`.replace('  ', ' ');
    this.permissions = config && config.permissionList ? new UserPermissions(config.permissionList) : new UserPermissions();
  }
}
