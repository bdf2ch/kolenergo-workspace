/**
 * Интерфейс, описывающий производственное отделение организации
 */
export interface IDepartment {
  id: number;                   // Идентификатор
  companyId: number;            // Идентификатор организации
  title: string;                // Наименование
  activeDirectoryUid: string;   // Идентификатор в Active Directory
}
