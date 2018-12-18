import { User } from '@kolenergo/cpa';
import { IOperativeSituationConsumption } from '../interfaces/operative-situation-consumption.interface';
import { Backup } from '@kolenergo/lib';

/**
 * Класс, реализующий интерфейс маскимального потребления за прошедшие сутки
 */
export class OperativeSituationConsumption extends Backup implements IOperativeSituationConsumption {
  id: number;             // Идентификатор
  companyId: number;      // Идентификатор организации
  date: string;           // Дата
  user: User;             // Пользователь
  dateCreated: Date;      // Дата создания
  dateChanged: Date;      // Дата изменения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IOperativeSituationConsumption) {
    super();
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.date = config ? config.date : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? new Date(config.dateChanged) : null;
  }
}

