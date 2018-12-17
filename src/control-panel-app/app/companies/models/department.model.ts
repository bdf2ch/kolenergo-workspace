import { IDepartment } from '../interfaces/department.interface';
import { Backup } from '@kolenergo/lib';

/**
 * Класс, реализующий интерфейс производственного отделения орагнизации
 */
export class Department extends Backup implements IDepartment {
  id: number;                     // Идентификатор производственного отделения
  companyId: number;              // Идентификатор организации
  title: string;                  // Наименование производственного отделения
  activeDirectoryUid: string;     // Идентификатор производственного отделения в Active Directory

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IDepartment) {
    super();
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.title = config ? config.title : null;
    this.activeDirectoryUid = config ? config.activeDirectoryUid : null;
  }
}
