import { Backup, Company, ICompany, User } from '@kolenergo/cpa';
import { IOperativeSituationConsumption } from '../interfaces/operative-situation-consumption.interface';

/**
 * Класс, реализующий интерфейс маскимального потребления за прошедшие сутки
 */
export class OperativeSituationConsumption extends Backup implements IOperativeSituationConsumption {
  id: number;             // Идентификатор
  date: string;           // Дата
  company: ICompany;      // Организация
  user: User;             // Пользователь
  consumption: number;    // Потребление
  dateCreated: Date;      // Дата создания
  dateChanged: Date;      // Дата изменения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IOperativeSituationConsumption) {
    super();
    this.id = config ? config.id : null;
    this.date = config ? config.date : null;
    this.company = config ? new Company(config.company) : null;
    this.user = config ? new User(config.user) : null;
    this.consumption = config ? config.consumption : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? new Date(config.dateChanged) : null;
  }
}

