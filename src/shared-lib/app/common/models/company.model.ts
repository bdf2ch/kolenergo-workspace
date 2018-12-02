import { ICompany } from '@kolenergo/lib';

/**
 * Класс, реализующий интерфейс организации
 */
export class Company implements ICompany {
  id: number;                   // Идентификатор
  title: string;                // Наименование
  activeDirectoryUid: string;   // Идентификатор в Active Directory

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ICompany) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.activeDirectoryUid = config ? config.activeDirectoryUid : null;
  }
}
