import { Backup } from '../../basic/models/backup.model';
import { IOffice } from '../interfaces/office.interface';

/**
 * Класс, реализующий интерфейс офиса организации
 */
export class Office extends Backup {
  id: number;                   // Идентификатор
  companyId: number;            // Идентификатор компании
  departmentId: number;         // Идентификатор производственного отделения
  title: string;                // Наименование
  address: string;              // Адрес
  floors: number;               // Количество этажей
  isWithLoft: boolean;          // Есть ли чердак в здании
  isWithBasement: boolean;      // Есть ли подвал в здании
  description: string;          // Описание

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IOffice) {
    super();
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.departmentId = config ? config.departmentId : null;
    this.title = config ? config.title : null;
    this.address = config ? config.address : null;
    this.floors = config ? config.floors : 1;
    this.isWithLoft = config ? config.isWithLoft : false;
    this.isWithBasement = config ? config.isWithBasement : false;
    this.description = config ? config.description : null;
  }
}
