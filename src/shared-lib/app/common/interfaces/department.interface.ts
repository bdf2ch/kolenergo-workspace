/**
 * Интерфейс, описывающий производственное отделение организации
 */
export interface IDepartment {
  id: number;                   // Идентификатор
  title: string;                // Наименование
  activeDirectoryUid: string;   // Идентификатор в Active Directory
}
