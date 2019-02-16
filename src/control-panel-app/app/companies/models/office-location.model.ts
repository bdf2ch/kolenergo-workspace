import { IOfficeLocation } from '../interfaces';
import { Backup } from '../../basic/models/backup.model';

/**
 * Класс, реализующий интерфейс помещения офиса организации
 */
export class OfficeLocation extends Backup implements IOfficeLocation {
  id: number;             // Идентификатор
  companyId: number;      // Идентификато рорганизации
  departmentId: number;   // Идентификатор подразделения
  officeId: number;       // Идентификатор офиса
  floor: number;          // Этаж
  title: string;          // Наименование
  description: string;    // Описание

  /**
   * Конструктор
   * @param config - Параметрв инициализации
   */
  constructor(config?: IOfficeLocation) {
    super();
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.departmentId = config ? config.departmentId : null;
    this.officeId = config ? config.officeId : null;
    this.floor = config ? config.floor : null;
    this.title = config ? config.title : null;
    this.description = config ? config.description : null;
  }
}

