import { IOffice } from './office.interface';
import { IDepartment } from './department.interface';

/**
 * Интерфейс, описывающий организацию
 */
export interface ICompany {
  id: number;                   // Идентификатор
  title: string;                // Наименование
  shortTitle: string;           // Короткое наименование
  activeDirectoryUid: string;   // Идентификатор в Active Directory
  departments?: IDepartment;     // Список производственных отделений организации
  offices?: IOffice[];          // Список офисов организации
}
