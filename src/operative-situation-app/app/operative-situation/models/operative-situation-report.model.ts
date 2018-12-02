import { Company, User } from '@kolenergo/lib';
import { IOperativeSituationReport } from '../interfaces/operative-situation-report.interface';

export class OperativeSituationReport {
  id: number;
  company: Company;
  user: User;
  periodDate: string;
  periodTime: string;
  dateCreated: Date;
  dateChanged: Date;
  equipment_35_150: {
    lep_100_150: number,
    lep_35: number,
    ps_110_150: number,
    ps_35: number,
    effect: {
      tp_6_20: number,
      population: number,
      power: number,
      szo: number
    }
  };
  equipment_network: {
    lep_6_20: nmber;
    tp_6_20: number;
    effect: {
      population: number,
      power: number,
      szo: number
    }
  };

  /**
   * Конструктор
   * @param config - Параметры инициализаци
   */
  constructor(config?: IOperativeSituationReport) {
    this.id = config ? config.id : null;
    this.company = config ? new Company(config.company) : null;
    this.user = config ? new User(config.user) : null;
    this.periodDate = config ? config.periodDate : null;
    this.periodTime = config ? config.periodTime : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? new Date(config.dateChanged) : null;

  }
}
