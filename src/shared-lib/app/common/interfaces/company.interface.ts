/**
 * Интерфейс, описывающий организацию
 */
export interface ICompany {
  id: number;                   // Идентификатор
  title: string;                // Наименование
  shortTitle: string;           // Короткое наименование
  activeDirectoryUid: string;   // Идентификатор в Active Directory
}
