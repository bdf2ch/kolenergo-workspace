import { IPermission } from './permission.interface';
import { IRole } from './role.interface';
import { ICompany } from '../../companies/interfaces/company.interface';
import { IDepartment } from '../../companies/interfaces/department.interface';

/**
 * Интерфейс, описывающий пользователя
 */
export interface IUser {
  id: number;                                 // Идентификатор пользователя
  divisionId: number;                         // Идентификатор структурного подразделения
  personalNumber: string;                     // Табельный номер
  firstName: string;                          // Имя пользователя
  secondName: string;                         // Отчество пользователя
  lastName: string;                           // Фамилия пользователя
  position: string;                           // Должность пользователя
  email: string;                              // E-mail пользователя
  activeDirectoryAccount: string;             // Учетная запись Active Directory
  fio?: string;                               // ФИО пользователя
  permissionList?: IPermission[];             // Набор прав пользователя
  rolesList?: IRole[];                        // Набор ролей пользователя
  company?: ICompany;                         // Организация
  department?: IDepartment;                   // Производственное отделение
}
