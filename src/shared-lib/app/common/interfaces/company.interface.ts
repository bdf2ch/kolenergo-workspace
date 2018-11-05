/**
 * Интерфейс, описывающий организацию
 */
export interface ICompany {
  id: number;                   // Идентификатор
  title: string;                // Наименование
  activeDirectoryUid: string;   // Идентификатор в Active Directory
}
