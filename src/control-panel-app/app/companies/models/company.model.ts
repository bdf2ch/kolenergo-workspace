import { ICompany } from '../interfaces/company.interface';
import { IOffice } from '../interfaces/office.interface';
import { IDepartment } from '../interfaces/department.interface';
import { Department } from './department.model';
import { Office } from './office.model';
import { Backup} from '../../basic/models/backup.model';
import { Division } from './division.model';
import {IDivision} from '../interfaces/division.interface';


/**
 * Класс, реализующий интерфейс организации
 */
export class Company extends Backup implements ICompany {
  id: number;                   // Идентификатор
  title: string;                // Наименование
  shortTitle: string;           // Короткое наименование
  activeDirectoryUid: string;   // Идентификатор в Active Directory
  departments: Department[];    // Производственные отделения организации
  offices?: Office[];           // Офисы организации
  divisions: Division[];

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ICompany) {
    super();
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.shortTitle = config ? config.shortTitle : null;
    this.activeDirectoryUid = config ? config.activeDirectoryUid : null;
    this.departments = [];
    this.offices = [];
    this.divisions = [];

    if (config && config.departments) {
      config.departments.forEach((item: IDepartment) => {
        const department = new Department(item);
        department.backup.setup(['title', 'activeDirectoryUid']);
        this.departments.push(department);
      });
    }
    if (config && config.offices) {
      config.offices.forEach((item: IOffice) => {
        const office = new Office(item);
        office.backup.setup(['title', 'address', 'floors', 'isWithLoft', 'isWithBasement', 'description']);
        this.offices.push(office);
      });
    }
    if (config && config.divisions) {
      config.divisions.forEach((item: IDivision) => {
        const division = new Division(item);
        division.backup.setup(['parentId', 'title']);
        this.divisions.push(division);
      });
    }
  }
}
