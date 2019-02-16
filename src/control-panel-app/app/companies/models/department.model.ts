import { IDepartment } from '../interfaces/department.interface';
import { Backup } from '../../basic/models/backup.model';
import { Office } from './office.model';
import { IOffice } from '../interfaces/office.interface';

/**
 * Класс, реализующий интерфейс подразделения орагнизации
 */
export class Department extends Backup implements IDepartment {
  id: number;                     // Идентификатор подразделения
  companyId: number;              // Идентификатор организации
  title: string;                  // Наименование подразделения
  activeDirectoryUid: string;     // Идентификатор подразделения в Active Directory
  offices: Office[];              // Здания подразделения

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
    this.offices = [];

    if (config && config.offices) {
      config.offices.forEach((item: IOffice) => {
        const office = new Office(item);
        office.backup.setup(['title', 'description', 'address', 'floors', 'isWithLoft', 'isWithBasement']);
        this.offices.push(office);
      });
    }
  }
}
