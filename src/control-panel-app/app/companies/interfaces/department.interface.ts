/**
 * Интерфейс, описывающий подразделения организации
 */
import {IOffice} from '@kolenergo/cpa';

export interface IDepartment {
  id: number;                   // Идентификатор
  companyId: number;            // Идентификатор организации
  title: string;                // Наименование
  activeDirectoryUid: string;   // Идентификатор в Active Directory
  offices?: IOffice[];          // Здания подразделения
}
