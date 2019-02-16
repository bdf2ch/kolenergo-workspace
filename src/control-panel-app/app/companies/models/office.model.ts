import { Backup } from '../../basic/models/backup.model';
import { OfficeLocation } from './office-location.model';
import { IOffice, IFloor, IOfficeLocation } from '../interfaces';

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
  floors_: IFloor[];
  locations: OfficeLocation[];  // Помещения в здании
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
    this.floors_ = [];
    this.locations = [];
    this.isWithLoft = config ? config.isWithLoft : false;
    this.isWithBasement = config ? config.isWithBasement : false;
    this.description = config ? config.description : null;

    if (config && config.locations) {
      config.locations.forEach((item: IOfficeLocation) => {
        const location = new OfficeLocation(item);
        location.backup.setup(['title', 'description']);
        this.locations.push(location);
      });
    }

    for (let i = 0; i < this.floors; i++) {
      this.floors_.push({
        number: i + 1,
        title: `${i + 1} этаж`
      });
    }
    if (this.isWithBasement) {
      this.floors_.push({
        number: -1,
        title: 'Подвал'
      });
    }
    if (this.isWithLoft) {
      this.floors_.push({
        number: this.floors + 1,
        title: 'Чердак'
      });
    }
  }
}
