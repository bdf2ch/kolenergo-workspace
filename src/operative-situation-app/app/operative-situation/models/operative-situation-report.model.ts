import { Backup, Company, User } from '@kolenergo/lib';
import { IOperativeSituationReport } from '../interfaces/operative-situation-report.interface';

export class OperativeSituationReport extends Backup {
  id: number;
  company: Company;
  user: User;
  periodDate: string;
  periodTime: string;
  dateCreated: Date;
  dateChanged: Date;
  equipment_35_150: {
    lep_110_150: number,
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
    lep_6_20: number;
    tp_6_20: number;
    effect: {
      population: number,
      power: number,
      szo: number
    }
  };
  weather: {
    min: number,
    max: number,
    wind: string,
    precipitations: string,
    rpg: boolean,
    orr: boolean
  };
  resources: {
    brigades: number,
    people: number,
    technics: number
  };

  /**
   * Конструктор
   * @param config - Параметры инициализаци
   */
  constructor(config?: IOperativeSituationReport) {
    super();
    this.id = config ? config.id : null;
    this.company = config ? new Company(config.company) : null;
    this.user = config ? new User(config.user) : null;
    this.periodDate = config ? config.periodDate : null;
    this.periodTime = config ? config.periodTime : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? new Date(config.dateChanged) : null;
    this.equipment_35_150 = {
      lep_110_150: config ? config.lep_110_150_count : 0,
      lep_35: config ? config.lep_35_count : 0,
      ps_110_150: config ? config.ps_110_150_count : 0,
      ps_35: config ? config.ps_35_count : 0,
      effect: {
        tp_6_20: config ? config.tp_6_20_count_effect_35_150 : 0,
        population: config ? config.population_count_effect_35_150 : 0,
        power: config ? (Math.round(config.power_effect_35_150 * 10) / 10) : 0,
        szo: config ? config.szo_count_effect_35_150 : 0
      }
    };
    this.equipment_network = {
      lep_6_20: config ? config.lep_6_20_count : 0,
      tp_6_20: config ? config.tp_6_20_count : 0,
      effect : {
        population: config ? config.population_count_effect_raspr : 0,
        power: config ? (Math.round(config.population_count_effect_raspr * 10) / 10) : 0,
        szo: config ? config.szo_count_effect_raspr : 0
      }
    };
    this.weather = {
      min: config ? config.weatherMin : null,
      max: config ? config.weatherMax : null,
      wind: config ? config.weatherWind : null,
      precipitations: config ? config.weatherPrecipitations : null,
      rpg: config ? config.weatherRPG : false,
      orr: config ? config.weatherORR : false
    };
    this.resources = {
      brigades: config ? config.resourcesBrigades : 0,
      people: config ? config.resourcesPeople : 0,
      technics: config ? config.resourcesTechnics : 0
    };
  }
}
