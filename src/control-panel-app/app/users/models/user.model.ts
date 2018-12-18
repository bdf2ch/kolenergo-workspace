import { IUser } from '../interfaces/user.interface';
import { UserPermissionsManager } from './user-permissions-manager.model';
import { Company } from '../../companies/models/company.model';
import { ICompany } from '../../companies/interfaces/company.interface';

/**
 * Класс, реализующий интерфейс пользователя
 */
export class User implements IUser {
  id: number;                               // Идентификатор пользователя
  divisionId: number;                       // Идентификатор структурного подразделения
  personalNumber: string;                   // Табельный номер
  firstName: string;                        // Имя пользователя
  secondName: string;                       // Отчество пользователя
  lastName: string;                         // Фамилия пользователя
  position: string;                         // Должность пользователя
  email: string;                            // E-mail пользователя
  activeDirectoryAccount: string;           // Учетная запись Active Directory
  fio: string;                              // ФИО пользователя
  permissions: UserPermissionsManager;      // Права пользователя
  company: ICompany;                        // Организация

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
    this.fio = `${this.firstName} ${this.secondName ? this.secondName : ''} ${this.lastName}`.replace('  ', ' ');
    this.permissions = config && config.permissionList
      ? new UserPermissionsManager({permissions: config.permissionList, roles: config.rolesList})
      : new UserPermissionsManager();
    this.company = config && config.company ? new Company(config.company) : null;
  }
}
