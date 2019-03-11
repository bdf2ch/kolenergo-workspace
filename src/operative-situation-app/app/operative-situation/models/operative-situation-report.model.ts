import { Backup, Company, ICompany, User } from '@kolenergo/cpa';
import { IOperativeSituationReport } from '../interfaces/operative-situation-report.interface';
import { WeatherSummary } from './weather-summary.model';
import { IOperativeSituationConsumption } from '../interfaces/operative-situation-consumption.interface';
import { IWeatherSummary } from '../interfaces/weather-summary.interface';
import { OperativeSituationConsumption } from './operative-situation-consumption.model';

export class OperativeSituationReport extends Backup {
  id: number;
  company: ICompany;
  user: User;
  periodDate: string;
  periodTime: string;
  dateCreated: Date;
  dateChanged: Date;
  // consumption: number;
  consumption: OperativeSituationConsumption;
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
    technics: number,
    rise: number,
    riseSumPower: number,
    risePeople: number
  };
  violations: {
    total_6: number,
    uapv_35: number;
    napv_35: number;
    power_off_35: number,
    lep_rs: number,
    tn_cancel: number,
    from_6_04: number,
    power_off_04: number,
    greater_3_04: number,
    population_srez_04: number,
    population_greater_3_04: number
  };
  backup?: any;
  weatherSummary: IWeatherSummary;

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
    // this.consumption = config ? config.consumption : 0;
    this.consumption = config && config.consumption ? new OperativeSituationConsumption(config.consumption) : null;
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
        power: config ? (Math.round(config.power_effect_raspr * 10) / 10) : 0,
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
      technics: config ? config.resourcesTechnics : 0,
      rise: config ? config.resourcesRiseCount : 0,
      riseSumPower: config ? config.resourcesRiseSumPower : 0,
      risePeople: config ? config.resourcesRisePeople : 0
    };
    this.violations = {
      total_6: config ? config.violations_6 : 0,
      uapv_35: config ? config.violations_35_uapv : 0,
      napv_35: config ? config.violations_35_napv : 0,
      power_off_35: config ? config.violations_35_power_off : 0,
      lep_rs: config ? config.violations_lep_rs : 0,
      tn_cancel: config ? config.violations_tn_cancel : 0,
      from_6_04: config ? config.violations_04_from_6 : 0,
      power_off_04: config ? config.violations_04_power_off : 0,
      greater_3_04: config ? config.violations_04_greater_3 : 0,
      population_srez_04: config ? config.violations_population_04_srez : 0,
      population_greater_3_04: config ? config.violations_population_04_greater_3 : 0
    };
    this.weatherSummary = config && config.weatherSummary ? new WeatherSummary(config.weatherSummary) : null;
  }

  getTotalEffect() {
    return {
      tp_6_20: this.equipment_35_150.effect.tp_6_20 + this.equipment_network.tp_6_20,
      population: this.equipment_35_150.effect.population + this.equipment_network.effect.population,
      power: Math.round((this.equipment_35_150.effect.power + this.equipment_network.effect.power) * 10) / 10,
      szo: this.equipment_35_150.effect.szo + this.equipment_network.effect.szo
    };
  }
}
